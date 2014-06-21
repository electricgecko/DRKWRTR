$(document).ready(function() {

	var w = $('#wrt');
	
	// get autosave from local storage
	w.focus().val(localStorage.getItem('drkwrtr-text'));
	
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
		 $('#saved').text('●');
	 } else {
		 $('#saved').text('○');
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
  
  // toggle between Markdown source and HTML
	w.keypress(function(e) {
		if (e.keyCode == 13 && e.altKey) {
	  	e.preventDefault();
			render();
	  } else {
			togglestored(false);
	  }
	});

	
	// autosave when user is idle
	w.on('idle.idleTimer', function(){
		store()
	});
	
});