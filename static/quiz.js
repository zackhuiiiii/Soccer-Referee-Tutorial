var last_quesion_index = '7'
var drag_question_index = '2'
var status_button_class = {"N": "yellow_box", "C": "green_box", "W": "red_box"}
var answer_quiz2 = "T"
var flag = 0

$(function(){
    question_content();
    quiz_button();
    $( ".drag_option" ).draggable({
        revert: "invalid",
        stack: ".drag_option"
    });
    $( ".drop_div" ).droppable({
        accept: ".drag_option",
        classes: {
            "ui-droppable-active": "droppable_active",
            "ui-droppable-hover": "droppable_hover"
        },
        drop: function( event, ui ) {
            let choice = ui.draggable.text();
            let option= $(this).attr('data-name');
            ui.draggable.position({
              my: "center",
              at: "center",
              of: $(this),
              using: function(pos) {
                $(this).animate(pos, 200, "linear");
              }
            });
            // ui.draggable.css('top','366px');
            ui.draggable.css('z-index', '1');
            console.log(choice, option);
            flag++;
            if(choice != option){
                answer_quiz2 = "F";
            }
            console.log(answer_quiz2)
        }
    });
});

function question_content(){
    // fill in quiz question and the options
    if(q_index == drag_question_index){             //drag quiz question 2
        // change layout ratio
        $('#choice_row').after(`<div class="row pl-5 pr-5" id="media"></div>`)
        $('#choice_row').after(`<div class="row pl-5 pr-5 mb-3 drag_choice" id="choices"></div>`)
        $('#choice_row').remove();

        // add question content and media
        $(".quiz_question").text(q_content["Q"]);
        // let $options = $(`<div></div>`)
        // let $medias = $(`<div class="row"></div>`)
        for(let letter in q_content['Answers']){
            $('#choices').append(`<div class="col-md-3">
                                    <div class="drag_option page_btn"> ${q_content['Answers'][letter]} </div>
                                  </div>`)
            $('#media').append(`<div class="col-md-3">
                                    <img class="drag_img" src="${q_content['Media'][letter]}" alt="choice${letter}" id="${letter}">
                                    <div class="drop_div" data-name="${q_content['Correct_answer'][letter]}"></div>
                                </div>`)
        }
        // $('#media').append($medias)
        // $('#choices').append($options)

    }else{
        $(".quiz_question").text(q_content["Q"]);
        let $options = $(`<form></form>`);
        for(let letter in q_content['Answers']){
            $options.append(`<input type="radio" name="question${q_index}" value="${letter}"/>
                <lable id="${q_index}_${letter}">${letter}: ${q_content['Answers'][letter]}</lable><br/>`);
        }
        $("#choices").append($options);
        // add media
        if(q_content['media']){
            media=q_content['media']
            $("#media").append(`<img src = ${media} id="quiz_media">`);
        }
    }
    

    // if(q_index != 1){
    //     $options.append(' <button type="button" onClick="Prev()">Prev</button>')    
    // }
    
};

function quiz_button(){
    // generate submit and answer status
    console.log(q_status);
    $("#submit_button").append('<button type="button" onClick="Submit()" class="page_btn">Submit</button>')

    $("#status_div").append(`<h4> Quiz Status</h4>`)
    for(let quiz in q_status){
        $("#status_div").append(`<div class="${status_button_class[q_status[quiz]]} quiz_status_box">${quiz}</div>`)
    }
}

function Submit(){
    console.log('Submit')
    let data_to_save = {}
    if(q_index == drag_question_index){     // quiz question 2
        if(flag < 4){
            console.log("not answered")
            $('.warning_message').remove();
            $('#submit_button').append(`<p class="warning_message">Please finish the question</p>`);
            return
        }
        data_to_save = {"answer": answer_quiz2, "index": q_index}
        console.log(data_to_save)
    }else{
        let answer=$('form input[type=radio]:checked').val()
        if(!answer){
            console.log("not answered")
            $('.warning_message').remove();
            $('#submit_button').append(`<p class="warning_message">Please choose one option</p>`)
            return
        }
        data_to_save = {"answer": answer,"index": q_index}         
        console.log(data_to_save)
    }
    
    $.ajax({
        type: "POST",
        url: "/increment",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(data_to_save),
        success: function(result){
            console.log("ajax result", result)
            // change the score number
            $('#quiz_score').text(`Score: ${result.score}/7`)
            
            if(q_index == drag_question_index){     //quiz 2
                for(let letter in result.correct_answer){
                    $('#'+letter).after(`<div class="correct_drag_answer">${result.correct_answer[letter]}</div>`)
                }
            }else{                                  // normal quesions
                let correct_id = '#' + q_index + "_" + result.correct_answer
                $(correct_id).addClass('correct_choice')
                if(result.status == 'F'){            //the answer is incorrect
                    let wrong_id = '#' + q_index + "_" + result.choice
                    $(wrong_id).addClass('wrong_choice')
                }
                $('input').prop( "disabled", true);
            }
            

            // change the button to next or finish
            $("#submit_button").empty();
            if(q_index != last_quesion_index){
                $("#submit_button").append(`<button type="button" onClick="window.location='/quiz/${(parseInt(q_index)+1).toString()}'" class="page_btn">Next</button>`)
            }else{
                $("#submit_button").append(`<button type="button" onClick="window.location='/quiz_final'" class="page_btn">Finish</button>`)
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

// function Prev(){
//     console.log('Prev')
//     url='/quiz/'+(q_index-1)
//     window.location.replace(url)
// }

// function increment_score(q_index,answer){
    
// }
