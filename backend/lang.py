import string
import sys
import os
import re
import gc
from nltk.tokenize import RegexpTokenizer as RT
from nltk.probability import FreqDist as FD

class lang(object):
    def __init__(self, **kwargs):
        self.tok = RT(r'\w+')
        self.freq = FD()


    def FreqD(self):
        return self.freq

    def procTxt(self, text):
        tokens = self.tok.tokenize(text)
