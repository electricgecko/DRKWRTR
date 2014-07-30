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

		// define DRKWRTR message on public pages
		$msg = "<div class='msg'><p><span><a href='http://drkwrtr.co/$txtfolder/$fileid.html' title='Permanent link to this document'>ドキュメント</a></span> File #$fileid, created with <a href='http://drkwrtr.co' title='Visit drkwrtr.co'>DRKWRTR</a></p></div>";
		
		// get content text via post
		$txt = nl2br(htmlentities($_POST["txt"]));

		// detect URLS and generate links. ultimately, markdown should be complete parsed.		
		$txt = ereg_replace("[[:alpha:]]+://[^<>[:space:]]+[[:alnum:]/]","<a href=\"\\0\">\\0</a>", $txt);
		
		// join everything together and write to file
		$cnt = $hd.$wrapstart.$txt.$wrapend.$msg.$ft;
		file_put_contents("$txtfolder/$fileid.html",$cnt,LOCK_EX);
		
		// return fileid to app
		echo $fileid;
	
	}	
	
?>	