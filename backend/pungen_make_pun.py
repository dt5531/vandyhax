"""
This file fetches puns from pungenerator.org and ranks them.
"""

import urllib2, json, nltk, pickle
from bs4 import BeautifulSoup as bs

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

# Rank puns
def rankPuns(puns, wordRanks):
	
	# Rank puns
	punRanks = dict()
	for p in puns:

		# Rank pun phrase
		rank = 0;
		words = nltk.wordpunct_tokenize(p)
		for w in words:
			rank += wordRanks.get(w, 0)
		rank = float(rank)/pow(len(words), 1.6) # The pow() is to penalize longer phrases

		# Record
		punRanks[p] = rank

	# Sort puns by rank
	return (sorted(punRanks, key=lambda x:punRanks[x], reverse=True), punRanks)

#Test
import sys
if __name__ == "__main__":

	# Check
	if len(sys.argv) == 2:

		# Get precursors
		puns = generatePuns(sys.argv[1])
		wordRanks = pickle.load(open("./combined.pcl", "r+"))
		print wordRanks

		# Rank puns
		data = rankPuns(puns, wordRanks)
		for pun in data[0]:
			print "[" + str(data[1][pun]) + "] " + pun

	else:
		print "Please specify a word to make puns on."
