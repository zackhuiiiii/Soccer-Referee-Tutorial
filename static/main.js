$(function(){
	// console.log('sss')

        $('a').each(function(){
        	console.log('sss')

        	console.log($(this))
            if ($(this).prop('href') == window.location.href) {
                $(this).addClass('active'); $(this).parents('li').addClass('active');
                console.log($(this))
            }
        });
    });