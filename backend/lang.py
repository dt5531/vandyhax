from nltk.probability import FreqDist as FD
from nltk.book import text9

freq = FD(text9)
freq_lower = dict()
total = 0

for tup in freq:
    freq_lower[tup.lower()] = freq_lower.get(tup.lower(), 0 ) + freq[tup];
    total += freq[tup]

def retWord(arg):
    return freq_lower.get(arg, 0) / total
