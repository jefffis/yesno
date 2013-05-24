function SetCookie(cookieName,cookieValue) {
	document.cookie = cookieName+"="+escape(cookieValue)
	+ ";expires=Sun, 17 Jan 2038 19:14:07 GMT; path=/";
}

$(function(){

	var $vote = $('#vote');
	var $yes = $('#yes');
	var $vote_yes = $('#q_votes');
	var $vote_yes_total = parseInt($vote_yes.val());
	var $no = $('#no');
	var $vote_no = $('#q_votes_no');
	var $vote_no_total = parseInt($vote_no.val());
	var $votable = $('.votable');
	var $form = $('.edit_q');
	var $form_url = $form.attr('action');
	var $h1 = $('h1');
	var $h1_title = $h1.data('title');
	var $voted = $('#voted');

	if($.cookie($h1_title)){
		//$voted.addClass('show');
	}

	//console.log($.cookie($h1_title));

	$yes.on('click',function(){
		if($.cookie($h1_title)){
			//return;
		}
		var $this = $(this);
		$vote_yes_total = $vote_yes_total + 1;
		$vote_yes.val($vote_yes_total);
		$.post($form_url, $form.serialize());
		SetCookie($h1_title,'yes');
		location.reload();
	});

	$no.on('click',function(){
		if($.cookie($h1_title)){
			//return;
		}
		var $this = $(this);
		$vote_no_total = $vote_no_total + 1;
		$vote_no.val($vote_no_total);
		$.post($form_url, $form.serialize());
		SetCookie($h1_title,'no');
		location.reload();
	});

});