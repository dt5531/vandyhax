import urllib2
from bs4 import BeautifulSoup as bs
import json
from nltk.probability import FreqDist as FD
from nltk.book import text9

# Query punGenerator
def generatePuns(word):
	
	# HTML query
	o = urllib2.build_opener()
	o.addheaders = [("User-agent", "Mozilla/5.0 (X11; U; Linux i686) Gecko/20071127 Firefox/2.0.0.11")]
	html = o.open("http://www.pungenerator.org/puns?q=" + word)

	# Process HTML response
	soup = bs(html)
	temp = [s for s in soup.find_all("td")]

        # Extract puns
        puns = []
	for p in temp:
		pw = p.contents[-1].strip()
		if pw:
			puns.append(pw)
        return puns

# Query Reddit
def queryReddit():
	
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

# Tokenize English
def preproc(arg):
    freq = FD(arg)
    freq_lower = dict()
    total = 0

    for tup in freq:
        freq_lower[tup.lower()] = freq_lower.get(tup.lower(), 0 ) + freq[tup];
        total += freq[tup]

    return dict((k, v/total) for (k,v) in freq_lower)

def preprocEnglish():
    return preproc(text9)

def preprocReddit():
    return preproc(queryReddit())

# Test
if __name__ == "__main__":
	print preprocReddit()
