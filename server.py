from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import json

app = Flask(__name__)



# ROUTES

@app.route('/')
def homepage():

    return render_template('homepage.html')
 
@app.route('/learn/<id>')
def learnpage(id = None):

    return render_template('learn.html') 

@app.route('/finishtutorial')
def finish_tutorial():

    return render_template('finishtutorial.html')

@app.route('/quiz/<id>')
def quizpage(id = None):
    score = 0
    return render_template('quiz.html', ques_index = id, score = score)

# @app.route('/search_result',  methods=['POST'])
# def search():

#     return render_template('search_result.html')


# @app.route('/view<id>')
# def view_detail(id = None):

#     return render_template('view_detail.html')

if __name__ == '__main__':
   app.run(debug = True)




