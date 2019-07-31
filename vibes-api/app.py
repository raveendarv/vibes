from flask import Flask, jsonify, abort, request
from flask_cors import CORS
import tweepy
from textblob import TextBlob

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
# port = int(os.environ.get('PORT', 5000))
app.run(host="localhost", port=5000, debug=True)