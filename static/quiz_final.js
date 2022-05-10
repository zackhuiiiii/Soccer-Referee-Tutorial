
var status_button_class = {"N": "yellow_box", "C": "green_box", "W": "red_box"}
var answer_quiz2 = {}
var quiz_class = {1: "Free Kicks",2: "Hand Signals",3: "Offsides",4: "Offsides",5: "Cards",6: "Cards",7: "Throw-ins",}

$( document ).ready(function() {
    console.log(q_status );
    let new_list=[];
    for(let quiz in q_status){
        $("#status_div").append(`<div class="${status_button_class[q_status[quiz]]} quiz_status_box">${quiz}</div>`)
        if(q_status[quiz]=='W'){
        	new_list.push(quiz_class[quiz])
        }
    }
    console.log(new_list)
    $("#topics").prepend(`Topics you may want to revisit`)
    // $("#status_div").append(`<div class="${status_button_class[q_status[quiz]]} quiz_status_box">${quiz}</div>`)
    if(new_list.length!=0){

    	for (let ind in new_list){
    		topic=new_list[ind]
    		$("#topics_list").append('<li>'+topic+'</li>')
    	}
    }
});