<?PHP
	// prevent direct access, at least a bit
	if (isset($_POST['txt'])) {
		
		$txtfolder = 'txt';
				
		// create or assign file id
		if (isset($_POST['uri'])) {
			$fileid = trim($_POST['uri']);
		} else {
			$fileid = uniqid('drk-', true);
		}
		
		// define html header & footer
		$hd = "<html>\n<head>\n<meta charset='UTF-8'/>\n<meta name='robots' content='noindex, noollow'>\n<meta name='apple-mobile-web-app-status-bar-style' content='black'/>\n\n<title>DRKWRTR file #$fileid</title>\n<link rel='stylesheet' type='text/css' media='all' href='../files.css'/></head>\n<body>\n";
		$ft = "\n</body>\n</html>";
		
		// define element to wrap content text in
		$wrapstart = "<div class='content'>";
		$wrapend = "</div>";
		
		// get content text via post
		$txt = nl2br(htmlentities($_POST["txt"]));
		
		// join everything together and write to file
		$cnt = $hd.$wrapstart.$txt.$wrapend.$ft;
		file_put_contents("$txtfolder/$fileid.html",$cnt,LOCK_EX);
		
		// return fileid to app
		echo $fileid;
	
	}
?>	