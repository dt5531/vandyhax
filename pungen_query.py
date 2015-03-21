import urllib2
from bs4 import BeautifulSoup as bs

# Query punGenerator
def generatePuns(word):
	
	# HTML query
	o = urllib2.build_opener()
	o.addheaders = [("User-agent", "Mozilla/5.0 (X11; U; Linux i686) Gecko/20071127 Firefox/2.0.0.11")]
	html = o.open("http://www.pungenerator.org/puns?q=" + word)

	# Process HTML response
	soup = bs(html)
	puns = [s for s in soup.find_all("td")]

	for p in puns:
		pw = p.contents[-1].strip()
		if pw:
			print pw

# Test
if __name__ == "__main__":
	generatePuns("muck")
