from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import json

app = Flask(__name__)
score = 0
quiz_status = {
    # N for not anserwed, C for correct, W for wrong
    "1": "N", "2": "N", "3": "N", "4": "N", "5": "N", "6": "N", "7": "N", 
}
tutorial_state = []

# not all the questions is filled, and the Correct_answer is not changed into the correct one
quiz_question  ={
    "1": {
        "Q": "An outfield player passes the ball back to their goalkeeper who proceeds to touch the ball with their hands. What should you as the referee do in such a situation?",
        "Answers":{
            "A": "Warn the goalkeeper by giving them a yellow card",
            "B": "Award an indirect free kick to the opposing team",
            "C": "Award a penalty kick to the opposing team",
            "D": "Play on"},
        "Correct_answer": "B"   
    },
    "2": {
        "Q": "Drag the correct name to the corresponding gesturing picture.",
        "Answers":{
            "D": "Direct Free Kick",
            "C": "Indirect Free Kick",
            "B": "Red & Yellow Card",
            "A": "Advantage"},
        "Media":{
            "A": "/static/quiz2_1.jpg",
            "B": "/static/quiz2_2.jpg",
            "C": "/static/quiz2_3.jpg",
            "D": "/static/quiz2_4.jpg"
        },
        "Correct_answer": {
            "A": "Direct Free Kick",
            "B": "Indirect Free Kick",
            "C": "Red & Yellow Card",
            "D": "Advantage"
        }
    },
    "3": {
        "Q": "How many of the attacking players are offside in this sequence of play?",
        "Answers":{
            "A": "3",
            "B": "2",
            "C": "1",
            "D": "0"},
        "Correct_answer": "B",
        "media":"/static/quiz_35.gif"
    },
    "4": {
        "Q": "If the attacking player at the bottom of the screen (who is not offside) is on the receiving end of the pass and proceeds to score, will that goal be allowed considering his teammates were offside?",
        "Answers":{
            "A": "Yes",
            "B": "No",
            "C": "Upon the referee's discretion",
            "D": "No action can be taken"},
        "Correct_answer": "A",
        "media":"/static/quiz_35.gif"
    },
    "5": {
        "Q": "A player has been committing a lot of minor fouls to interrupt the flow of play while their team is defending the lead. What would be the right way to handle this situation if you were the referee of the game?",
        "Answers":{
            "A": "Warn the player that another minor foul would get them yellow carded",
            "B": "Yellow Card",
            "C": "Red Card",
            "D": "No action can be taken due to the minor nature of the fouls"},
        "Correct_answer": "A"
    },
    "6": {
        "Q": "The defender of a team has clearly used their hands to prevent a clear goalscoring opportunity. What would be the right way to handle this situation if you were the referee of the game?",
        "Answers":{
            "A": "Warn the player that another minor foul would get them yellow carded",
            "B": "Yellow Card",
            "C": "Red Card",
            "D": "No action can be taken"},
        "Correct_answer": "C",
        "media":"/static/quiz_6.gif"
    },
    "7": {
        "Q": "A player is trying to run down the clock by taking time to take the throw-ins. What should the referee do in  this situation?",
        "Answers":{
            "A": "Warn the player",
        "B": "Yellow card and keep note of the wasted time to add to extra time",
        "C": "Red Card",
        "D": "Award the throw-in to the opposite team"},
        "Correct_answer": "B",
        "media":"/static/quiz_7.jpg"
    }
}

# ROUTES

@app.route('/')
def homepage():

    return render_template('homepage.html')
 
@app.route('/learn/<id>')
def learnpage(id = None):
    print("id= ",id)
    if id == "handSignal":
        tutorial_state.append('2')
        return render_template('learnHandSignal.html', state=tutorial_state)
    elif id == "freeKick":
        tutorial_state.append('2-1')
        return render_template('learnFreeKicks.html', state=tutorial_state)
    elif id == "penaltyKick":
        tutorial_state.append('2-3')
        return render_template('learnPenalties.html', state=tutorial_state)
    elif id == "cornerKick":
        tutorial_state.append('2-4')
        return render_template('learnCornerKicks.html', state=tutorial_state)
    elif id == "advantage":
        tutorial_state.append('2-5')
        return render_template('learnAdvantage.html', state=tutorial_state)
    elif id == "indirectFreeKick":
        tutorial_state.append('2-2')
        return render_template('learnIndirectFreeKicks.html', state=tutorial_state)    
    elif id == "otherSignal":
        return render_template('learnOtherSignals.html', state=tutorial_state)
    elif id == "redCard":
        tutorial_state.append('6')
        return render_template('learnRedCard.html', state=tutorial_state)
    elif id =="yellowCard":
        tutorial_state.append('5')
        return render_template('learnYellowCard.html', state=tutorial_state)
    elif id =="offsides":
        tutorial_state.append('3')
        return render_template('learnOffsides.html', state=tutorial_state) 
    elif id =="offsides_2":
        tutorial_state.append('4')
        return render_template('learnOffsides2.html', state=tutorial_state) 
    elif id == "substitution":
        tutorial_state.append('8')
        return render_template('learnSubstitution.html', state=tutorial_state)
    elif id == "goal":
        tutorial_state.append('2-6')
        return render_template('learnGoal.html', state=tutorial_state)
    elif id=="var":
        tutorial_state.append('7')
        return render_template('learnVAR.html', state=tutorial_state)
    elif id == "throwin":
        tutorial_state.append('9')
        return render_template('learnThrowIn.html', state=tutorial_state)

@app.route('/finishtutorial')
def finish_tutorial():

    return render_template('finishtutorial.html')


@app.route('/quiz/<id>')
def quizpage(id = None):
    global score
    global quiz_status
    # print(quiz_question[id])
    print(score,type(score),type(id))
    if(id=='1'):
        score = 0
        quiz_status = {
    # N for not anserwed, C for correct, W for wrong
        "1": "N", "2": "N", "3": "N", "4": "N", "5": "N", "6": "N", "7": "N", 
        }
    return render_template('quiz.html', ques_index = id, ques_content = quiz_question[id], score = score, ques_status = quiz_status)


@app.route('/quiz_final/')
def quiz_final():
    
    if int(score) > 3:
        message = "Congratulations! You have passed the quiz!"
    else:
        message = "Sorry you have not passed the quiz. Maybe you can review the tutorial."

    return render_template('quiz_final.html', score = score, message = message,ques_status = quiz_status)


@app.route('/increment', methods=['GET', 'POST'])
def increment():
    global score

    json_data = request.get_json()   
    ans = json_data["answer"] 
    ind=json_data["index"]
    result = {"status": 'F', "choice": ans, "correct_answer": quiz_question[str(ind)]['Correct_answer'], "score": score}
    quiz_status[str(ind)] = 'W'
    print(ans,ind)
    flag = True

    if (str(ind) == '2'):
        for letter in result["correct_answer"]:
          if result["correct_answer"][letter].strip() != ans[letter].strip():
            print(result["correct_answer"][letter], ans[letter])
            flag = False
    elif(quiz_question[str(ind)]['Correct_answer'] != ans):       # correct answer
        flag = False
        
    if flag:
        score += 1
        result['status'] = 'T'
        result['score'] = score
        quiz_status[str(ind)] = 'C'

    print("score", score)
    print("result", result)
    #send back the WHOLE array of data, so the client can redisplay it
    return jsonify(result)
 

# @app.route('/quiz',  methods=['POST'])
# def search():

#     return render_template('search_result.html')


# @app.route('/view<id>')
# def view_detail(id = None):

#     return render_template('view_detail.html')

if __name__ == '__main__':
   app.run(debug = True)




