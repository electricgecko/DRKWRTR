$(document).ready(function() {

	var w = $('#wrt');
	var s = $('#saved');
	var i = $('#txtid');
	
	var speed = 400;
	
	var txtfolder = 'txt';
	var permalink = '';
	
	var mobile = false;
	
	i.hide();
	
	// check if we're on a touch-based device
	if (s.css('top') == 'auto') {
		mobile = true;
	}
			
	// focus textarea and get autosave from local storage
	
	/*
		using a hacky way to determine if we're on mobile,
		as the saved/unsaved indicator has to react to the
		iOS keyboard.
	*/
	
	if (!mobile) {
		w.val(localStorage.getItem('drkwrtr-text'));
		
		w.focus(function(){
			s.fadeOut();
		})

		w.blur(function(){
			s.fadeIn();
		})
	} else {
		w.focus().val(localStorage.getItem('drkwrtr-text'));
		permalink = localStorage.getItem('drkwrtr-perm');
	}

	// automatically adjust textarea size
	w.autosize();
	
	// setup autosave timer
	w.idleTimer(800);
	
	// add render button for mobile devices
	if (mobile) {
		$('body').append("<div>YOOOOO</div>");
	}
 
  
  // render HTML from Markdown source
  // rendering HTML is now handled by the MarkItUp parser
  
  /*
	  
  function render() {

  };
  
  */ 
  
  // toggle saved indicator
  function togglestored(state) {
		if (state) {
		 s.text('●');
	 } else {
		 s.text('○'); 
	 }
  }
	
  // save current Markdown source to local storage
  function store() {
  	if (w.hasClass('src')) {
	  	storetxt = w.val()
  	} else {
	  	storetxt = txt
  	}
    localStorage.setItem('drkwrtr-text', storetxt);
    localStorage.setItem('drkwrtr-perm', permalink);
    togglestored(true);
  }
  
  // create permalink
  function createPermalink() {
			$.post( "cp.php", {txt: w.val()}).done(function(data) {
				permalink = data;
    			i.html('<a href="'+txtfolder+'/'+data+'.html" target="_blank">'+data+'</a>');
			},function(){
					i.fadeIn(speed);
			});
  }
  
  // update existing permalink
  function updatePermalink() {
			$.post( "cp.php", {txt: w.val(), uri: permalink}).done(function(data) {
				console.log("● stored: "+permalink);
    			i.html('<a href="'+txtfolder+'/'+permalink+'.html" target="_blank">'+permalink+'</a>');
			},function(){
				if (!i.is(':visible')) {
					i.fadeIn(speed);
				} else {
					i.fadeOut(speed*0.7).fadeIn(speed*0.7);
				}
			});
  }
  
  // catch key combinations
	w.keypress(function(e) {
		
	 // alt+r: reset document 
	  if (e.keyCode == 174 && e.altKey) {
			e.preventDefault();
			w.val('');
			localStorage.setItem('drkwrtr-perm', '');
			permalink = '';
			$(window).scrollTop(0);
		} 

	// alt+w: create or update permalink for current text
	  if (e.keyCode == 8721) {
	  	e.preventDefault();
	  	store();
			if (permalink == '') {
				createPermalink();
			} else {
				updatePermalink();
			}
		}

		togglestored(false);
	  
	});
	
	// autosave when user is idle
	w.on('idle.idleTimer', function(){
		store()
	});
	
	// make the textarea a MarkItUp field
	$('#wrt').markItUp(mySettings);
	w.focus();
	
});