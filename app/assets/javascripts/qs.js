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

	var $header_link = $('header h2 a');
	var $header_link_yes = $header_link.find('[data-vote=yes]');
	var $header_link_no = $header_link.find('[data-vote=no]');

	// find file inputs
	var $files = $('input[type=file]').addClass('file');
	var $file_labels = $files.prev('label').addClass('file');

	//console.log($.cookie($h1_title));

	$header_link_yes.on('click',function(e){
		e.preventDefault();
		location.href = '/?v=yes';
	});
	$header_link_no.on('click',function(e){
		e.preventDefault();
		location.href = '/?v=no';
	});

	$yes.on('click',function(){
		if($yes.hasClass('ivoted')){
			return;
		}
		var $this = $(this);
		$vote_yes_total = $vote_yes_total + 1;
		$vote_yes.val($vote_yes_total);
		$.post($form_url, $form.serialize());
		SetCookie($h1_title,'yes');
		location.reload();
	});

	$no.on('click',function(){
		if($no.hasClass('ivoted')){
			return;
		}
		var $this = $(this);
		$vote_no_total = $vote_no_total + 1;
		$vote_no.val($vote_no_total);
		$.post($form_url, $form.serialize());
		SetCookie($h1_title,'no');
		location.reload();
	});

	// wrap file inputs in clickable div with label text
	$files.each(function(){
		var $this = $(this);
		var $this_text = $this.prev('label').text();
		var $this_id = $this.attr('id');
		$this.after('<div class="faux-file"><span class="label" data-id="'+$this_id+'">'+$this_text+'</span></div>');
	});
	$('.label').on('click',function(){
		var $this = $(this);
		var $this_id = $this.data('id');
		$('#'+$this_id).click();
	});
	$files.on('change',function(){
		var $this = $(this);
		if($this.val()!=''){
			$this.next('.faux-file').find('.label').addClass('file');
			$this.next('.faux-file').append('<span class="chosen-file">'+$this.val()+'</span>');
		}
	});

});