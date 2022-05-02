
$(function(){
	// console.log('sss')
        $('a').each(function(){
        	console.log('sss');
        	console.log($(this));
          if(tutorial_state.includes($(this).prop('id'))){
            $(this).siblings('span').addClass('visited');
          }
          if ($(this).prop('href') == window.location.href) {
              $(this).addClass('active'); 
              $(this).siblings('span').addClass('active');
              console.log($(this))
          }
        });
    });