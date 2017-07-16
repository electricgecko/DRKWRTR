DRKWRTR
=======

DRKWRTR is a very simple writing app I created for myself, mostly to write entries for my blog. While I use the excellent [IA Writer](http://www.iawriter.com/mac/) for most writing tasks, I wanted something with a more austere feel and just the right amount of formatting features to work with my custom and weird blog format.

DRKWRTR uses **Markdown** for formatting sanity. Press **ALT+e** to toggle your text between Markdown source and HTML output. Press **ALT+r** to wipe your document.

For now, DRKWRTR supports just a single document. It uses local storage on a per-browser basis to save and retrieve your data. It does so automatically once you stop writing. A filled dot in the bottom left corner (desktop)/upper right corner (mobile) indicates a saved document.

Documents can be converted into a publicly visible document with permalink URL by pressing **ALT+w**. This works for both the Markdown source and rendered HTML. For now, this feature remains in an experimental stage, though

DRKWRTR provides two special URLs to trigger advanced features: [/manual](http://drkwrtr.co/manual) resets the document to the manual shown when its run the first time. This overwrites any document content entered at this point. [/backup](http://drkwrtr.co/backup) restores the content of a document that was previously wiped by pressing **ALT+r**.

An instance of the app is ~~publicly running at [drkwrtr.co](http://drkwrtr.co). Simple about page with mission statement [drkwrtr.co/about](http://drkwrtr.co/about).~~ currently offline as I lost the domain to a moment of being inattentive. 

### Plugins & dependencies
* **MarkItUp** by Jay Salvat – https://github.com/markitup/1.x
* **PHP Markdown** by Michel Fortin – http://michelf.com/projects/php-markdown/
* **Autosize V2** by Jack Moore – http://www.jacklmoore.com/autosize
* **Idle Timer** by Paul Irish — https://github.com/thorst/jquery-idletimer

I'll happily answer any questions. Feedback is always appreciated, naturally.

