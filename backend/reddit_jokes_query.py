import urllib2
from bs4 import BeautifulSoup as bs
import json

# Query Reddit
def tokenizeReddit():
	
	# HTML query
	o = urllib2.build_opener()
	html = o.open("http://www.reddit.com/r/jokes/top.json?sort=top&t=all&limit=100&count=0").read()
	js = json.loads(html)["data"]["children"]

	# Process HTML response
	total = ""
	for p in js:
		total += p["data"]["selftext"]

	# Return
	return total

# Test
if __name__ == "__main__":
	print tokenizeReddit()
