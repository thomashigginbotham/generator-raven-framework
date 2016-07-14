/* jshint browser: true */
/* jshint devel: true */

// Just some sample JavaScript. Replace with your own.
(function () {
	'use strict';

	// Add GitHub link to bottom of page.
	function addGitHubLink() {
		var p = document.createElement('p');
		var a = document.createElement('a');
		var text = 'View project on GitHub';
		var url = 'https://github.com/thomashigginbotham/raven-framework';

		a.setAttribute('href', url);
		a.setAttribute('title', 'This link was added from app/js/scripts.js');
		a.appendChild(document.createTextNode(text));

		p.appendChild(a);

		document.querySelector('.page-footer').appendChild(p);
	}

	if (document.readyState !== 'loading') {
		addGitHubLink();
	} else {
		document.addEventListener('DOMContentLoaded', addGitHubLink);
	}
})();
