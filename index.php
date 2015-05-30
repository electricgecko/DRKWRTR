<?php
	$req = split("/", $_SERVER['REQUEST_URI']);
	
	// Parse URL commands

	// Display manual
	if ($req[1] == 'manual') {
		$man = true;
	}
	
	// Restore from backup
	if ($req[1] == 'backup') {
		$backup = true;
	}
?>
<!DOCTYPE html>
<html class="page-index" dir="ltr" lang="en-EN">
	<head>
		<meta charset="UTF-8"/>
		<meta name="author" content="electricgecko | Malte Müller"/>
		<meta name="description" content="A writing environment for slaves on a brutalist spaceship."/>
		<meta name="keywords" content="DRKWRTR, Writing, writer, writing app, Markdown, text editor, writing tool"/>
		<meta name="robots" content="index, follow">
		
		<meta name="apple-mobile-web-app-status-bar-style" content="black"/>
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<link rel="apple-touch-icon" href="i/drkwrtr-icon-152.png">
		<link rel="apple-touch-icon" sizes="120x120" href="i/drkwrtr-icon-120.png">
		<link rel="apple-touch-icon" sizes="152x152" href="i/drkwrtr-icon-152.png">

		<link href="i/drkwrtr-start-640x1096.png" rel="apple-touch-startup-image">
		<link href="i/drkwrtr-start-750x1294.png" media="(device-width: 375px) and (device-height: 667px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image">

		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

		<script type="text/javascript" src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
		
		<title>DRKWRTR</title>
		
		<link rel="stylesheet" type="text/css" media="all" href="screen.css" />
</head>
<body>
	

<textarea id="wrt" class="wrt src <?php if ($man) { echo 'manual'; } if ($backup) { echo 'backup'; }?>"></textarea>

<span id="saved" class="saved">○</span>
<span id="txtid" class="txtid"></span>

<script src="j/wrt.min.js"></script>
</body>
</html>