import nltk
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import networkx as nx
from re import sub

def WordEmbeddings():
    # Loading vectors
    word_embed = {}
    file = open('glove.6B.100d.txt',encoding='utf-8')

    for word_vec in file:
        word_vec = word_vec.split()
        word = word_vec[0]
        its_vectors = np.asarray(word_vec[1:],dtype='float32')
        word_embed[word] = its_vectors
    file.close()
    return word_embed

def PreProcess(sentences):
    clean_sentences= [sub(r'[^a-zA-Z]',' ',sentence) for sentence in sentences]
    clean_sentences = [sentence.lower() for sentence in clean_sentences]
    clean_sentences = [sub(r'\s+',' ',sentence) for sentence in clean_sentences]

    return clean_sentences

def RemoveStopWords(sentence):
    stopwords = nltk.corpus.stopwords.words('english')
    new_sent =  " ".join([word for word in sentence if word not in stopwords])
    return new_sent

def GetSentenceVector(clean_sentences,word_embed):
    clean_sentences = [RemoveStopWords(sentence.split()) for sentence in clean_sentences]

    # Create Sentence Vectors
    sent_vectors = []
    for sentence in clean_sentences:
        if len(sentence)!=0:
            vec = sum([word_embed.get(w,np.zeros((100,))) for w in sentence.split()])/(len(sentence.split())+0.001)
        else:
            vec = np.zeros((100,))
        sent_vectors.append(vec)
    return sent_vectors

def Similarity(sentences,sent_vectors):
    # Get Cosine similarity
    similarity_matrix = np.zeros([len(sentences),len(sentences)])
    for i in range(len(sentences)):
        for j in range(len(sentences)):
            if i!=j:
                similarity_matrix[i][j] = cosine_similarity(sent_vectors[i].reshape(1,100),sent_vectors[j].reshape(1,100))[0,0]
    return similarity_matrix



def rank_sentences(text,words):
    sentences = nltk.sent_tokenize(text)
    word_emb = WordEmbeddings()
    clean_Sent = PreProcess(sentences)
    sent_vector = GetSentenceVector(clean_Sent,word_emb)

    similarity_matrix = Similarity(sentences,sent_vector)

    # Page Algorthm to find rank
    nx_graph = nx.from_numpy_array(similarity_matrix)
    scores = nx.pagerank(nx_graph)
    rank = sorted(((scores[i],s) for i,s in enumerate(sentences)),reverse = True)
    summary = []
    i = 0

    while words>0 and i <len(rank):
        sent = rank[i][1]
        summary.append(sent)
        words -= len(sent.split())
        i+=1

    return "".join(summary)

# print(rank_sentences(text,words))
