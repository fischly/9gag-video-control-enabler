// ==UserScript==
// @name         9GAG video control enabler
// @version      0.1
// @description  Enables the video controls to all video elements on 9GAG.
// @author       fischly
// @match        https://9gag.com/*
// @grant        none
// @run-at       document-idle
// @namespace    https://greasyfork.org/users/662249
// ==/UserScript==

// entry point
(function() {
    'use strict';

	// first, enable controls to all elements that are already loaded on the 9GAG site
	enableVideoControls();
	
	// next, add the observer that will enable controls on all video elements that are dynamically loaded on scrolling
	addObserver();
})();


/**
 * Enables all video controls of all elements that are already loaded.
 */
function enableVideoControls() {
	// get all post containers that are loaded already on site load
	const postContainers = document.querySelectorAll('.list-stream');
	
	for (const container of postContainers) {
		enableControlsOnPostContainer(container);
	}
	
}

/**
 * Adds the observer to the site element, where all the postContainers are loaded to.
 */
function addObserver() {
	// the element that all new postContainers are loaded to is called 'list-view-2' for some reason
	const targetNode = document.getElementById('list-view-2');
	const config = { attributes: false, childList: true, subtree: true };

	const callback = function(mutationsList, observer) {
		for(const mutation of mutationsList) {
			// loop over all added elements
			for (const addedElement of mutation.addedNodes) {
				// check if the added element is the one we are looking for
				// i.e. a "post-container" (which contains 5 individual articles/posts)
				if (addedElement.className && addedElement.className.includes('list-stream')) {
					// enable controls on all videos of this container
					enableControlsOnPostContainer(addedElement);
				}
			}
		}
	};

	// create the observer and observe the target
	const observer = new MutationObserver(callback);
	observer.observe(targetNode, config);
}


/**
 * Enables controls on video elements contained in all articles (= posts) of the given container.
 */
function enableControlsOnPostContainer(container) {
	const videos = container.querySelectorAll('article video');
	
	for (const video of videos) {
		video.controls = true;
	}
}