/*******************************************************************************

    µMatrix - a Chromium browser extension to black/white list requests.
    Copyright (C) 2014  Raymond Hill

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see {http://www.gnu.org/licenses/}.

    Home: https://github.com/gorhill/uMatrix
*/

// Helper to deal with the i18n'ing of HTML files.
// jQuery must be present at this point.

window.addEventListener('load', function() {
    // http://en.wikipedia.org/wiki/Right-to-left
    var rtlLanguages = {
        'ar': true,
        'fa': true,
        'he': true
    };
    uDom('html').toggleClass('rtl', rtlLanguages.hasOwnProperty(navigator.language));
    uDom('html').toggleClass('ltr', rtlLanguages.hasOwnProperty(navigator.language) === false);

    var nodeList = document.querySelectorAll('[data-i18n]');
    var i = nodeList.length;
    var node;
    while ( i-- ) {
        node = nodeList[i];
        node.innerHTML = chrome.i18n.getMessage(node.getAttribute('data-i18n'));
    }
    // copy text of <h1> if any to document title
    node = document.querySelector('h1');
    if ( node !== null ) {
        document.title = node.textContent;
    }
    // Tool tips
    nodeList = document.querySelectorAll('[data-i18n-tip]');
    i = nodeList.length;
    while ( i-- ) {
        node = nodeList[i];
        node.setAttribute('data-tip', chrome.i18n.getMessage(node.getAttribute('data-i18n-tip')));
    }
});
