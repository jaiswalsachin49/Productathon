import feedparser
from typing import List, Dict
import urllib.parse
from datetime import datetime
import time
import requests
from newspaper import Article

class NewsMonitor:
    BASE_URL = "https://news.google.com/rss/search?q={query}&hl=en-IN&gl=IN&ceid=IN:en"

    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }

    def fetch_signals(self, keywords: List[str]) -> List[Dict]:
        all_signals = []
        
        for keyword in keywords:
            encoded_query = urllib.parse.quote(keyword)
            feed_url = self.BASE_URL.format(query=encoded_query)
            print(f"Fetching: {feed_url}")
            
            try:
                response = requests.get(feed_url, headers=self.headers, timeout=10)
                response.raise_for_status()
                feed = feedparser.parse(response.content)
            except Exception as e:
                print(f"Error fetching {feed_url}: {e}")
                continue
            
            for entry in feed.entries[:5]: # Limit to 5 per keyword for now
                signal = {
                    "title": entry.title,
                    "url": entry.link,
                    "published_date": self._parse_date(entry.published),
                    "source_domain": self._extract_domain(entry.link),
                    "keyword_matched": keyword
                }
                
                # Verify content (Basic check)
                # content = self._extract_content(entry.link)
                # signal["content_summary"] = content[:500] if content else entry.summary
                
                all_signals.append(signal)
            
            time.sleep(1) # Be polite
            
        return all_signals

    def _parse_date(self, date_str: str) -> datetime:
        try:
            # RSS date format: "Mon, 07 Feb 2026 10:00:00 GMT"
            return datetime.strptime(date_str, "%a, %d %b %Y %H:%M:%S %Z")
        except:
            return datetime.utcnow()

    def _extract_domain(self, url: str) -> str:
        try:
            return urllib.parse.urlparse(url).netloc
        except:
            return "unknown"

    def _extract_content(self, url: str) -> str:
        try:
            article = Article(url)
            article.download()
            article.parse()
            return article.text
        except Exception as e:
            print(f"Failed to extract {url}: {e}")
            return None

if __name__ == "__main__":
    monitor = NewsMonitor()
    results = monitor.fetch_signals(["new manufacturing plant India", "boiler commissioning India"])
    for res in results:
        print(f"Found: {res['title']} ({res['url']})")
