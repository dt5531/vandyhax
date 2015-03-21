"""
This file builds the word-value report (which is then used to score puns)
"""

import urllib2, json, nltk, pickle
from nltk.probability import FreqDist as FD
from nltk.book import text9

# Query Reddit
def queryReddit():
	
	# HTML query
	o = urllib2.build_opener()
	html = o.open("http://www.reddit.com/r/jokes/top.json?sort=top&t=all&limit=5&count=0").read()
	js = json.loads(html)["data"]["children"]

	# Process HTML response
	total = []
	for p in js:
		total.extend(nltk.wordpunct_tokenize(p["data"]["selftext"]))

	# Return
	return total

# Tokenize English
def preproc(arg):
    freq = FD(arg)
    freq_lower = dict()
    total = 0.0

    for tup in freq:
        freq_lower[tup.lower()] = freq_lower.get(tup.lower(), 0) + freq[tup];
        total = max(freq_lower[tup.lower()], total)
    for tup in freq_lower:
	freq_lower[tup] = float(freq_lower[tup]) / total
    return freq_lower

# Compute probabilities in each text set [p(reddit) and p(english)]
def preprocEnglish():
    return preproc(text9)

def preprocReddit():
    return preproc(queryReddit())

# Compute dependent probability [p(reddit)/p(english)]
def process():

	# Get values
	english = preprocEnglish()
	reddit = preprocReddit()
	minV = min(v for v in english.values())

	# Combine
	combined = dict()
	for w in reddit:
		combined[w] = reddit[w] / english.get(w, minV)

	# Pickle
	pickle.dump(combined, open("./combined.pcl", "w+"))

#Test
if __name__ == "__main__":
	print process()
