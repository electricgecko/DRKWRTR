<?php
	
	@include('markdown.php');
	$text = $_GET['data'];
	echo Markdown($text);

?>