var last_quesion_index = '7'
var status_button_class = {"N": "yellow_box", "C": "green_box", "W": "red_box"}

function question_content(){
    // fill in quiz question and the options
    $(".quiz_question").text(q_content["Q"]);
    //if(q_content['media']){
        ///media=q_content['media']
        ///$(".media").append(' <img src=media>');
    ///}
    let $options = $(`<form></form>`);
    for(let letter in q_content['Answers']){
        $options.append(`<input type="radio" name="question${q_index}" value="${letter}"/>
            <lable id="${q_index}_${letter}">${letter}: ${q_content['Answers'][letter]}</lable><br/>`);
    }

    // if(q_index != 1){
    //     $options.append(' <button type="button" onClick="Prev()">Prev</button>')    
    // }
    $(".choices").append($options);
};

function quiz_button(){
    // generate submit and last question button
    console.log(q_status);
    $("#submit_button").append('<button type="button" onClick="Submit()" class="btn btn-info">Submit</button>')
    // $options.append('<br>')

    $("#quiz_action_button").append(`<h4> Quiz Status</h4>`)
    for(let quiz in q_status){
        $("#quiz_action_button").append(`<div class="${status_button_class[q_status[quiz]]} quiz_status_box">${quiz}</div>`)
    }
}

$(function(){
    question_content();
    quiz_button();
});

function Submit(){
    console.log('Submit')
    let answer=$('form input[type=radio]:checked').val()   
    let data_to_save = {"answer": answer,"index": q_index}         
    console.log(data_to_save)
    $.ajax({
        type: "POST",
        url: "/increment",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(data_to_save),
        success: function(result){
            console.log("ajax result", result)

            $('#quiz_score').text(`Score: ${result.score}/7`)
            let correct_id = '#' + q_index + "_" + result.correct_answer
            console.log(correct_id)
            $(correct_id).addClass('correct_choice')
            if(result.status == 'F'){            //the answer is incorrect
                let wrong_id = '#' + q_index + "_" + result.choice
                $(wrong_id).addClass('wrong_choice')
            }
            $('input').prop( "disabled", true);

            $("#submit_button").empty();
            if(q_index != last_quesion_index){
                $("#submit_button").append(`<button type="button" onClick="window.location='/quiz/${(parseInt(q_index)+1).toString()}'" class="btn btn-info">Next</button>`)
            }else{
                $("#submit_button").append(`<button type="button" onClick="window.location='/quiz_final'" class="btn btn-info">Finish</button>`)
            }
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });

    // if(q_index!=last_quesion_index){
    //     url='/quiz/'+(q_index+1)
    //     window.location.replace(url)
    // }
    // else{
    //     url='/quiz_final'
    //     window.location.replace(url)
    // }
    
}

function Prev(){
    console.log('Prev')
    url='/quiz/'+(q_index-1)
    window.location.replace(url)
}

function increment_score(q_index,answer){
    
}
