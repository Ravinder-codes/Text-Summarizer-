"""
Web Scrapping
Getting tags from headline and title, then using to tags to get related paras
"""
import requests
from re import sub
from nltk.stem import WordNetLemmatizer
from nltk import pos_tag
from bs4 import BeautifulSoup
from nltk.corpus import stopwords
# import nltk
"""
Clean Tags and get only nouns
"""
def GetTags(keyword):
    stopwords_set = set(stopwords.words('english'))
    keyword = [word for word in keyword if word not in stopwords_set]
    keyword = [sub(r'[^a-zA-Z]','',word) for word in keyword]
    lemma  = WordNetLemmatizer()
    keyword = [lemma.lemmatize(word) for word in keyword if word!=""]   
    keyword = pos_tag(keyword)
    keyword =set([word for word,tag in keyword if tag in ['NN','NNS','NNP','NNPS']])
    return keyword

"""
Check if Tags are present in paragraphs
"""
def GetCleanSentences(soup,keyword):
    article = soup.find_all('p')
    clean = ""
    for a in article:
        a = a.text
        for word in a.split():
            if word.strip() in keyword:
                clean+=a
                break
    return clean



def GetCleanedSentences(url):
    try:
        # Getting url
        page = requests.get(url)
        soup = BeautifulSoup(page.text,'html.parser')
        res = ""
        # Get Keywords
        head = soup.find('h1')
        keyword = head.text +" " +soup.title.string

        keyword = keyword.split()
        keyword = [word.strip() for word in keyword]
        
        keyword = GetTags(keyword)
        return (GetCleanSentences(soup,keyword))
    except:
        return "Access Denied"