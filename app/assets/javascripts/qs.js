function SetCookie(cookieName,cookieValue) {
	document.cookie = cookieName+"="+escape(cookieValue)
	+ ";expires=Sun, 17 Jan 2038 19:14:07 GMT; path=/";
}

var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
var is_safari = navigator.userAgent.indexOf("Safari") > -1;
var is_Opera = navigator.userAgent.indexOf("Presto") > -1;

var supports = (function() {
   var div = document.createElement('div'),
      vendors = 'Khtml Ms O Moz Webkit'.split(' '),
      len = vendors.length;

   return function(prop) {
      if ( prop in div.style ) return true;

      prop = prop.replace(/^[a-z]/, function(val) {
         return val.toUpperCase();
      });

      while(len--) {
         if ( vendors[len] + prop in div.style ) {
            // browser supports box-shadow. Do what you need.
            // Or use a bang (!) to test if the browser doesn't.
            return true;
         } 
      }
      return false;
   };
})();

if ( !supports('filter') ) {
   document.documentElement.className += ' no-filter';
}

$(function(){

	var $vote = $('#vote');
	var $yes = $('#yes');
	var $vote_yes = $('#q_votes');
	var $vote_yes_total = parseInt($vote_yes.val());
	var $no = $('#no');
	var $vote_no = $('#q_votes_no');
	var $vote_no_total = parseInt($vote_no.val());
	var $q_votes_totes = $('#q_votes_totes');
	var $votable = $('.votable');
	var $form = $('.edit_q');
	var $form_url = $form.attr('action');
	var $h1 = $('h1');
	var $h1_title = $h1.data('unique-id');
	var $voted = $('#voted');

	var $header_link = $('header h2 a');
	//var $header_link_yes = $header_link.find('[data-vote=yes]');
	var $header_link_yes = $('#yes-img');
	//var $header_link_no = $header_link.find('[data-vote=no]');
	var $header_link_no = $('#no-img');

	// find file inputs
	var $files = $('input[type=file]').addClass('file');
	var $file_labels = $files.prev('label').addClass('file');

	var $remove_params = $('#remove-params');

	var $info_show = $('#info-show');
	var $info = $('#info');
	var $popular = $('#popular');
	var $popular_rmv = $('#popular-rmv');

	var $rmv_vote_thx = $voted.find('h2');

	var $welcome = $('#welcome');

	var $srch = $('#srch');
	var $search_form = $('#search-form');
	var $rvm_srch = $('#rvm-srch');

	var $share = $('#share');
	var $sharing = $('#sharing');
	var $cls = $('#cls');

	var $rld = $('#rld');
	var $load = $('#load');
	var $featured = $('#featured');

	var $data_zero = 0;
	var $data_count = $('.count');
	var $data_count_total = $data_count.data('count');
	//alert($data_count.data('count'));

	/*var $next_page = $('.next_page');
	var $previous_page = $('.previous_page');
	//var $listings = $('#listings');
	var $load = $('#load');*/

	/*$next_page.on('click',function(e){
		e.preventDefault();
		var $this = $(this);
		var $this_url = $this.attr('href');
		//$.getScript('/assets/application.js');
		$load.load($this_url+' #load');
		//document.location.replace($this_url);
		//history.pushState('', '', $this_url);
		//return false;
	});
	$previous_page.on('click',function(e){
		e.preventDefault();
		var $this = $(this);
		var $this_url = $this.attr('href');
		//$.getScript('/assets/qs.js');
		$load.load($this_url+' #load');
		//return false;
	});*/

	if($data_count){
		var count = {
	    digit: 0,
		    increment: function() {
		        var interval = setInterval(function() {
		            if (++count.digit == $data_count_total)
		                clearInterval(interval);
		            	$data_count.text(count.digit);
		        }, 10);
		    }
		};
		count.increment();
	}

	$('#rld').on('click',function(){
		//var $this = $(this);
		//var $this_url = $this.attr('href');
		//$featured.css('background-image','none');
		//$featured.find('h1').html('Loading&hellip;');
		//setTimeout(function(){
			//$load.load('/qr'+' #load');
		//},250);
		//$(this).addClass('load');
		$('#load').load('/qr'+' #load');
		$.getScript('/assets/application.js');
	});

	//console.log($.cookie($h1_title));

	$header_link_yes.on('click',function(e){
		e.preventDefault();
		location.href = '/?yes=yesss';
	});
	$header_link_no.on('click',function(e){
		e.preventDefault();
		location.href = '/?no=noooo';
	});
	$popular.on('click',function(){
		location.href = '/?pop=ular';
	});
	$popular_rmv.on('click',function(){
		location.href = '/';
	});

	$remove_params.on('click',function(){
		var $this = $(this);
		location.href = $this.data('url');
	});

	$info_show.on('click',function(){
		$info.toggleClass('show');
	});
	$info.on('click',function(){
		$info.removeClass('show');
	});

	$yes.on('click',function(){
		if($yes.hasClass('ivoted')){
			return;
		}
		var $this = $(this);
		$vote_yes_total = $vote_yes_total + 1;
		$vote_yes.val($vote_yes_total);
		$q_votes_totes.val($vote_yes_total + $vote_no_total);
		$.post($form_url, $form.serialize());
		$this.addClass('votering');
		SetCookie($h1_title,'yes');
		setTimeout(function(){
			window.location.href = window.location;
		},250);
	});

	$no.on('click',function(){
		if($no.hasClass('ivoted')){
			return;
		}
		var $this = $(this);
		$vote_no_total = $vote_no_total + 1;
		$vote_no.val($vote_no_total);
		$q_votes_totes.val($vote_yes_total + $vote_no_total);
		$.post($form_url, $form.serialize());
		$this.addClass('votering');
		SetCookie($h1_title,'no');
		setTimeout(function(){
			window.location.href = window.location;
		},250);
	});

	$rmv_vote_thx.on('click',function(){
		var $this = $(this);
		$voted.fadeOut(500);
		SetCookie($h1_title+'-rmv-vote',1);
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
		if(is_safari){
			// need to semi-show field for safari security
			$('#'+$this_id).addClass('semi-visible').focus().click();
		}else{
			$('#'+$this_id).focus().click();
		}
	});
	$files.on('change',function(){
		var $this = $(this);
		if($this.val()!=''){
			$this.next('.faux-file').find('.label').addClass('file');
			$this.next('.faux-file').append('<span class="chosen-file">'+$this.val()+'</span>');
			//$this.next('.faux-file').append('<span class="icon-remove rmv" id="remove"></span>');
		}
	});
	$('#remove').on('click',function(){
		//var $this = $(this);
		$(this).parent().find('span.chosen-file').remove();
		$(this).parent().find('.label').removeClass('file');
	});

	$srch.on('click',function(){
		$search_form.addClass('show');
		$search_form.find('input[type=search]').focus();
	});

	$rvm_srch.on('click',function(){
		$search_form.removeClass('show');
		$search_form.find('input[type=search]').blur();
	});

	$welcome.on('click',function(){
		setTimeout(function(){
			$welcome.fadeOut(200).removeClass('show');
		}, 100);
	});

	$info_show.on('click',function(){
		setTimeout(function(){
			$welcome.fadeIn(200).css('display','table').addClass('show');
		}, 250);
	});

	$share.on('click',function(){
		$sharing.addClass('show');
		return false;
	});

	$cls.on('click',function(){
		$sharing.removeClass('show');
	});

});