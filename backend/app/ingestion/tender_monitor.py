import feedparser
from typing import List, Dict
import urllib.parse
from datetime import datetime
import time
import requests
import logging

logger = logging.getLogger(__name__)

class TenderMonitor:
    # Aggregating from various search feeds that look for tender keywords
    SOURCE_CONFIGS = [
        {
            "name": "Google Tenders",
            "url_template": "https://news.google.com/rss/search?q={query}+intitle:tender&hl=en-IN&gl=IN&ceid=IN:en",
            "type": "rss"
        },
        {
            "name": "Bing Tenders",
            "url_template": "https://www.bing.com/news/search?q={query}+tender&format=rss",
            "type": "rss"
        }
    ]

    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }

    def fetch_tenders(self, products: List[str]) -> List[Dict]:
        all_tenders = []
        
        for product in products:
            # Query Logic: "Boiler" -> "Boiler tender", "Bitumen" -> "Bitumen procurement"
            queries = [f"{product} tender", f"{product} procurement notice"]
            
            for query in queries:
                encoded_query = urllib.parse.quote(query)
                
                for source_conf in self.SOURCE_CONFIGS:
                    feed_url = source_conf["url_template"].format(query=encoded_query)
                    print(f"Searching Tenders for {product}: {feed_url}")
                    
                    try:
                        entries = self._fetch_rss(feed_url)
                        for entry in entries[:2]: # Limit to top 2
                            tender = {
                                "title": entry.title,
                                "url": entry.link,
                                "published_date": self._parse_date(entry.published) if hasattr(entry, 'published') else datetime.utcnow(),
                                "source_domain": "Tender Aggregator",
                                "keyword_matched": f"{product} (Tender)",
                                "content_summary": entry.summary if hasattr(entry, 'summary') else entry.title
                            }
                            all_tenders.append(tender)
                            
                    except Exception as e:
                        logger.error(f"Failed tender source {source_conf['name']}: {e}")
                    
                    time.sleep(1)
            
        return all_tenders

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
