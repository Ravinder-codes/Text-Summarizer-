"""
Using spacy library to convert words to vector
We will use this model to summerize text for our website
"""
import spacy
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity



def preprocess(data,nlp):
    
    text = nlp(data)
    sentences = [a.text.strip() for a in text.sents]
    return sentences, text

def sentence_embedding(x, nlp):
    tokens = nlp(x)
    list = [word.vector for word in tokens if word.has_vector]
    return np.mean(list, axis = 0) if list else np.zeros(nlp.vocab.vectors_length,)

def text_embedding(sentence, nlp):
    return np.array([sentence_embedding(x, nlp) for x in sentence])

def rank_sentences(text, words):
    nlp = spacy.load("en_core_web_lg")
    sentences, doc = preprocess(text,nlp)
    sentence_embeddings = text_embedding(sentences, nlp)

    # Compute document embedding (mean of sentence embeddings)
    document_embedding = np.mean(sentence_embeddings, axis=0).reshape(1, -1)

    # Compute similarity scores
    similarities = cosine_similarity(sentence_embeddings, document_embedding).flatten()

    # Get top-ranked sentences
    top_sentence_indices = similarities.argsort()[::-1]  # Sort in descending order
    
    #Getting required words
    summary = []
    i = 0
    while words>0 and i <len(top_sentence_indices):
        sent = sentences[top_sentence_indices[i]]
        summary.append(sent)
        words -= len(sent.split())
        i+=1
    return "".join(summary)

# text = """
# Technology has become an inseparable part of modern life, influencing nearly every aspect of how we live, work, and interact with the world. From the invention of the telephone and the internet to the rise of artificial intelligence and blockchain technology, human civilization has continuously evolved through innovation. Today, smartphones enable instant global communication, smart homes automate daily tasks, and businesses rely on data analytics and machine learning to make informed decisions. The education sector has also seen significant changes, with online learning platforms providing access to knowledge regardless of geographical location. Meanwhile, the medical field has benefited from advancements in telemedicine, robotic surgeries, and personalized treatments driven by artificial intelligence. However, despite these remarkable improvements, technology brings its own set of challenges. Cybersecurity threats, data privacy issues, and the ethical dilemmas surrounding AI and automation raise concerns about the future of digital dependence. Additionally, the increasing use of social media has reshaped the way people communicate, often blurring the lines between virtual and real-world interactions, sometimes leading to negative psychological effects. As automation continues to replace traditional jobs, the workforce must adapt to new skills and industries to remain relevant in the evolving job market. While technology has the power to solve complex problems and improve quality of life, it is essential to use it responsibly, ensuring that progress does not come at the cost of security, ethics, and human well-being. Striking a balance between innovation and responsibility will determine how technology shapes the future, making it crucial for governments, organizations, and individuals to work together to harness its potential while mitigating its risks
# """
# print(rank_sentences(text,20))