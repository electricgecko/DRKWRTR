$(document).ready(function() {

	var w = $('#wrt');
	var s = $('#saved');
	var i = $('#txtid');
	
	var speed = 400;
	
	var txtfolder = 'txt';
	var permalink = '';
	
	i.hide();
	
			
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
		permalink = localStorage.getItem('drkwrtr-perm');
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
					console.log(permalink+'---');
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
		
		// alt+enter: switch between markdown & html rendering
		if (e.keyCode == 13 && e.altKey) {
	  	e.preventDefault();
			render();
	  };
	 
	 	// alt+r: reset document 
	  if (e.keyCode == 174 && e.altKey) {
	  	console.log(e.keyCode);
			e.preventDefault();
			w.val('');
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
	
});