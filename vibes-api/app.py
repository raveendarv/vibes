from __future__ import unicode_literals

from flask import Flask, jsonify, abort, request
from flask_cors import CORS
import tweepy
from textblob import TextBlob
from spacy_summarization import text_summarizer
from gensim.summarization import summarize
from nltk_summarization import nltk_summarizer
import time
import spacy
nlp = spacy.load('en_core_web_sm')

# Web Scraping Pkg
from bs4 import BeautifulSoup
from urllib.request import urlopen
#from urllib import urlopen

# Sumy Pkg
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lex_rank import LexRankSummarizer

# Twitter OAuth Tokens and Keys
consumer_key = "b6CVvKiowcFTu3TYximMlbfgD"  # os.environ['CONSUMER_KEY']
consumer_secret = "ngWNhy6tC3XoFljUY0TMea4P3kohqRsdqeYLci8HzaXjEl8S3b"  # os.environ['CONSUMER_SECRET']
access_token = "837694848-0OuRr2kurjaArV5uRABJSgeSzjWNNSLDbZW4SiP1"  # os.environ['ACCESS_TOKEN']
access_token_secret = "LVbguuSGUpZnVIUXefAwjekWVjHqyswSM8webYD0hPVUz"  # os.environ['ACCESS_TOKEN_SECRET']

# Setting OAuth 
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

# Create Tweepy API
api = tweepy.API(auth)

# Create Flask App
app = Flask(__name__)

CORS(app, resources={r"*": {"origins": "*"}})


# Sumy
def sumy_summary(docx):
	parser = PlaintextParser.from_string(docx,Tokenizer("english"))
	lex_summarizer = LexRankSummarizer()
	summary = lex_summarizer(parser.document,3)
	summary_list = [str(sentence) for sentence in summary]
	result = ' '.join(summary_list)
	return result


# Reading Time
def readingTime(mytext):
	total_words = len([ token.text for token in nlp(mytext)])
	estimatedTime = total_words/200.0
	return estimatedTime

# Fetch Text From Url
def get_text(url):
	page = urlopen(url)
	soup = BeautifulSoup(page, features="lxml")
	fetched_text = ' '.join(map(lambda p:p.text,soup.find_all('p')))
	return fetched_text


@app.route('/', methods=['GET'])
def home():
    return 'Twitter Sentiment Analyser REST API.'



@app.route('/analyse', methods=['GET'])
def analyse():
    if request.args.get('hashtag') == 'true':
        tweets = api.search('#{}'.format(request.args.get('search')), lang='en', count=100)
    else:
        tweets = api.search(q=request.args.get('search'), lang='en', count=100)
    res = []
    for tweet in tweets:
        sentiment = TextBlob(tweet.text).sentiment
        res.append({'text': tweet.text, 'subjectivity': sentiment.subjectivity, 'polarity': sentiment.polarity, 'author': tweet.user.screen_name})
    return jsonify(res)

@app.route('/signin', methods=['GET','POST'])
def signin():
	if request.method == 'POST':
		data = request.get_json()
		email = data["email"]
		password = data["password"]
		a = []
	a.append({'email':email,
			  'password':password})
	return jsonify(a)


@app.route('/analyze',methods=['GET','POST'])
def analyze():
	start = time.time()
	if request.method == 'POST':
		data = request.get_json()
		rawtext = data['text']
		final_reading_time = readingTime(rawtext)
		final_summary = text_summarizer(rawtext)
		summary_reading_time = readingTime(final_summary)
		end = time.time()
		final_time = end-start
		res = []
		res.append({'ctext': rawtext,
			   'final_summary': final_summary,
			   'final_time': final_time,
			   'final_reading_time': final_reading_time,
			   'summary_reading_time': summary_reading_time
			   })
	return jsonify(res)

@app.route('/analyze_url',methods=['GET','POST'])
def analyze_url():
	start = time.time()
	if request.method == 'POST':
		data = request.get_json()
		raw_url = data['url']
		rawtext = get_text(raw_url)
		final_reading_time = readingTime(rawtext)
		final_summary = text_summarizer(rawtext)
		summary_reading_time = readingTime(final_summary)
		end = time.time()
		final_time = end-start
		res = []
		res.append({'ctext': rawtext,
				'final_summary': final_summary,
				'final_time': final_time,
				'final_reading_time': final_reading_time,
				'summary_reading_time': summary_reading_time
				})
	return jsonify(res)




# port = int(os.environ.get('PORT', 5000))


if __name__ =="__main__":
    app.run(host="localhost", port=5000, debug=True)