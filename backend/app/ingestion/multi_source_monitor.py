import feedparser
from typing import List, Dict
import urllib.parse
from datetime import datetime
import time
import requests
from newspaper import Article
import logging

logger = logging.getLogger(__name__)

class MultiSourceMonitor:
    SOURCE_CONFIGS = [
        {
            "name": "Google News",
            "url_template": "https://news.google.com/rss/search?q={query}&hl=en-IN&gl=IN&ceid=IN:en",
            "type": "rss" 
        },
        {
            "name": "Bing News",
            "url_template": "https://www.bing.com/news/search?q={query}&format=rss",
            "type": "rss"
        }
    ]

    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }

    def fetch_signals(self, keywords: List[str]) -> List[Dict]:
        all_signals = []
        
        for keyword in keywords:
            encoded_query = urllib.parse.quote(keyword)
            
            for source_conf in self.SOURCE_CONFIGS:
                feed_url = source_conf["url_template"].format(query=encoded_query)
                logger.info(f"Fetching from {source_conf['name']}: {feed_url}")
                print(f"Fetching from {source_conf['name']}...") # User feedback
                
                try:
                    entries = self._fetch_rss(feed_url)
                    
                    for entry in entries[:3]: # Limit to top 3 per source per keyword
                        logger.info(f"  - Analyzing: {entry.title} ({entry.link})")
                        # Try to get key content
                        content = self._extract_content(entry.link)
                        
                        # Decision Logic
                        is_valid = False
                        final_content = ""
                        
                        # 1. Full Content Match
                        if content and len(content) > 50:
                            logger.info(f"    -> MATCH (Full Text: {len(content)})")
                            final_content = content[:500] if len(content) > 500 else content
                            is_valid = True
                        
                        # 2. Fallback to Summary/Description
                        elif hasattr(entry, 'summary') and len(entry.summary) > 20:
                            logger.info(f"    -> FALLBACK (Summary: {len(entry.summary)})")
                            # Sanitize HTML from summary if needed, but for now just use it
                            final_content = entry.summary[:500]
                            is_valid = True
                        elif hasattr(entry, 'description') and len(entry.description) > 20:
                             logger.info(f"    -> FALLBACK (Description: {len(entry.description)})")
                             final_content = entry.description[:500]
                             is_valid = True

                        if is_valid:
                            signal = {
                                "title": entry.title,
                                "url": entry.link,
                                "published_date": self._parse_date(entry.published) if hasattr(entry, 'published') else datetime.utcnow(),
                                "source_domain": self._extract_domain(entry.link),
                                "keyword_matched": keyword,
                                "content_summary": final_content + "..." 
                            }
                            all_signals.append(signal)
                        else:
                             logger.info(f"    -> SKIP (No content or summary found)")
                            
                except Exception as e:
                    logger.error(f"Failed source {source_conf['name']}: {e}")
                
                time.sleep(1) # Be polite
            
        return all_signals

    def _fetch_rss(self, url: str):
        try:
            response = requests.get(url, headers=self.headers, timeout=10)
            response.raise_for_status()
            feed = feedparser.parse(response.content)
            return feed.entries
        except Exception as e:
            logger.error(f"RSS Fetch Error: {e}")
            return []

    def _parse_date(self, date_str: str) -> datetime:
        try:
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
            # logger.warning(f"Extraction failed for {url}: {e}")
            return None

if __name__ == "__main__":
    monitor = MultiSourceMonitor()
    results = monitor.fetch_signals(["manufacturing plant expansion India"])
    for res in results:
        print(f"Found: {res['title']} \nSummary: {res['content_summary'][:100]}...\n")
