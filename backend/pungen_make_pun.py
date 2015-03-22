"""
This file fetches puns from pungenerator.org and ranks them.
"""

badwords = ["bong", "dope", "spliff", "dank", "blow", "fuck", "shit", "dick", "piss", "ass", "cunt", "breast", "blow", "dank", "tit", "nipple", "penis", "vagina", "blumpkin", "creampie", "nigga", "nigger", "porn", "chink", "anal", "arse", "arsehole", "asshole", "byatch", "cock", "dickhead", "fag", "faggot", "fagot", "gay", "homo", "homosexual", "jizz", "masterbate", "motherfucker", "prick", "pussy", "racist", "skank", "slut", "suck", "transexual", "xxx", "whore"]

import urllib2, json, nltk, pickle
from bs4 import BeautifulSoup as bs
from nltk.corpus import cmudict
import os

# Rhyme ranking
cmudict = cmudict.dict()

# Forward/backward rhyming
def forwardRhyme(a,b):
	da = cmudict.get(a,[["A"]])[0]
	db = cmudict.get(b,[["B"]])[0]
	m = min(len(da), len(db))

	rank = 0.0
	for i in range(0,m):
		if da[i] == db[i]:
			rank += pow(0.99, i) # The closer to the front, the better

	return rank

def backwardRhyme(a,b):
	da = cmudict.get(a,[["A"]])[0]
	db = cmudict.get(b,[["B"]])[0]
	m = min(len(da), len(db))

	rank = 0.0
	for i in range(0,m):
		if da[len(da) - i - 1] == db[len(db) - i - 1]:
			rank += pow(0.99, i) # The closer to the back, the better

	return rank

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
def rankPuns(puns, wordRanks, allowProfanity):

	# Rank puns
	maxR = float(max(w for w in wordRanks.values()))
	punRanks = dict()
	for p in puns:

		# Profanity filter
		punOk = True
		if not allowProfanity:
			pl = p.lower()
			for bad in badwords:
				if (" " + bad) in pl or (bad + " ") in pl:
					punOk = False
		if not punOk:
			continue

		# Variables
		rank1 = 1.0
		rank2 = 1.0

		# Rank by words
		words = nltk.wordpunct_tokenize(p)
		for w in words:
			rank1 += (wordRanks[w.lower()]/maxR) if w.lower() in wordRanks else -0.2

		# Rank by rhymes
		for i in range(1,len(words)-1):
			rank2 += forwardRhyme(words[i], words[i+1]) + backwardRhyme(words[i-1], words[i])

		# Record (if not profane)
		rank = float(rank1 + rank2/10.0)
		punRanks[p] = rank

	# Sort puns by rank
	return (sorted(punRanks, key=lambda x:punRanks[x], reverse=True), punRanks)

#Test
import sys
if __name__ == "__main__":

	# Check
	if len(sys.argv) in (2,3):

		# Determine profanity
		allowProfanity = (len(sys.argv) == 3)
		if allowProfanity:
			print "\033[91m\033[1mWARNING: Profanity filter is OFF!\033[0m"

		# Get precursors
		puns = generatePuns(sys.argv[1])
		wordRanks = pickle.load(open(os.path.dirname(os.path.realpath(__file__))+"/combined.pcl", "r+"))

		# Rank puns
		data = rankPuns(puns, wordRanks, allowProfanity)
		for i in range(0,min(25,len(data[0]))):
			pun = data[0][i]
			print "[" + str(data[1][pun]) + "] " + pun

	else:
		print "Please specify a word to make puns on."
