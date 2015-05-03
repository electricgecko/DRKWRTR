// -------------------------------------------------------------------
// markItUp!
// -------------------------------------------------------------------
// Copyright (C) 2008 Jay Salvat
// http://markitup.jaysalvat.com/
// -------------------------------------------------------------------
// MarkMin tags example
// http://web2py.com/examples/static/markmin.html
//
// file created by Massimo Di Pierro
// -------------------------------------------------------------------
// Feel free to add more tags
// -------------------------------------------------------------------
mySettings = {
	previewParserPath:	'~/miu/parsers/markdown/parser.php',
	markupSet: [
		{name:'Preview', call:'preview', className:"preview", key:"E"}
	]
}

// mIu nameSpace to avoid conflict.
miu = {
    markminTitle: function(markItUp, char) {
	heading = '';
	n = $.trim(markItUp.selection||markItUp.placeHolder).length;
	for(i = 0; i < n; i++) {
	    heading += char;
	}
	return '\n'+heading;
    }
}