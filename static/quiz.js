var last_quesion_index = '7'
var status_button_class = {"N": "yellow_btn", "C": "green_btn", "W": "red_btn"}

function question_content(){
    // fill in quiz question and the options
    $(".quiz_question").text(q_content["Q"]);
    if(q_content['media']){
        media=q_content['media']
        $(".media").append(' <img src=media>');
    }
    let $options = $(`<form action="/quiz" method="post"></form>`);
    for(let letter in q_content['Answers']){
        $options.append(`<input type="radio" name="question${q_index}" value="${letter}" />${letter}: ${q_content['Answers'][letter]}<br/>`);
    }

    if(q_index != 1){
    $options.append(' <button type="button" onClick="Prev()">Prev</button>')    
}
    $options.append(' <button type="button" onClick="Next()">Next</button>')

    $options.append('<br>')
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

function Next(){
    console.log('Next')
    let answer=$('form input[type=radio]:checked').val()   
    let data_to_save = {"answer": answer,"index":q_index}         
    console.log(data_to_save)
    $.ajax({
        type: "POST",
        url: "/increment",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(data_to_save),
        success: function(result){
            let all_data = result["data"]
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });

    if(q_index!=last_quesion_index){
    url='/quiz/'+(q_index+1)
    window.location.replace(url)
}
    else{
        url='/quiz_final'
        window.location.replace(url)
    }
    
}

function Prev(){
    console.log('Prev')
    url='/quiz/'+(q_index-1)
    window.location.replace(url)
}

function increment_score(q_index,answer){
    
}
