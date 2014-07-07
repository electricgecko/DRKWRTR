$(document).ready(function() {

	var w = $('#wrt');
	var s = $('#saved');
	
			
	// focus textarea and get autosave from local storage
	
	/*
		using a hacky way to determine if we're on mobile,
		as the saved/unsaved indicator has to react to the
		iOS keyboard.
	*/
	
	if (s.css('top') != 'auto') {
		w.val(localStorage.getItem('drkwrtr-text'));
		
		w.focus(function(){
			s.fadeOut();
		})

		w.blur(function(){
			s.fadeIn();
		})
	} else {
		w.focus().val(localStorage.getItem('drkwrtr-text'));
	}

	// automatically adjust textarea size
	w.autosize();
	
	// setup autosave timer
	w.idleTimer(800);
  
  // render HTML from Markdown source
  function render() {
				
  	if (w.hasClass('src')) {
	    txt = w.val();
	    md = markdown.toHTML(txt);
	
			/* 
				ugly regex hack to remove paragraphs
				as i don't use them when writing
				texts for my blog.
			*/
			
	    w.val(md.replace(/<p>|<\/p>/g,''));
	
		} else {
			w.val(txt);
		}	
			w.toggleClass('src');
  };
  
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
    togglestored(true);
  }
  
  // catch key combinations
	w.keypress(function(e) {
		
		// alt+enter: switch between markdown & html rendering
		if (e.keyCode == 13 && e.altKey) {
	  	e.preventDefault();
			render();
	  } else {
				// alt+r: clear textarea
				if (e.keyCode == 174 && e.altKey) {
				e.preventDefault();
				w.val('');
				$(window).scrollTop(0);
			}
			togglestored(false);
	  }
	});
	
	// autosave when user is idle
	w.on('idle.idleTimer', function(){
		store()
	});
	

	
});