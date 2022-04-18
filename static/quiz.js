var last_quesion_index = '8'
var status_button_class = {"N": "yellow_btn", "C": "green_btn", "W": "red_btn"}

function question_content(){
    // fill in quiz question and the options
    $(".quiz_question").text(q_content["Q"]);

    let $options = $(`<form action="/quiz" method="post"></form>`);
    for(let letter in q_content['Answers']){
        $options.append(`<input type="radio" name="question${q_index}" value="${letter}" />${letter}: ${q_content['Answers'][letter]}<br/>`);
    }
    $options.append(` <button type="submit">Submit</button>`)
    $(".choices").append($options);
};

function quiz_button(){
    // generate submit and last question button
    console.log(q_status);
    for(let quiz in q_status){
        $("#quiz_action_button").append(`<button class="${status_button_class[q_status[quiz]]}">${quiz}</button>`)
    }
}

$(function(){
    question_content();
    quiz_button();
});