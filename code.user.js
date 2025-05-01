// ==UserScript==
// @name         Nez API Key Verification & Script Execution
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Verify API Key and execute Main.js script if valid
// @author       OxyCoder
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    const apiKey = '';
    const serverUrl = 'https://raw.githubusercontent.com/perritoelpro32/NezBypass/refs/heads/main/url.txt';

    function getApiUrlFromGitHub() {
        GM_xmlhttpRequest({
            method: 'GET',
            url: serverUrl,
            onload: function(response) {
                if (response.status === 200) {
                    const apiUrl = response.responseText.trim();
                    console.log('✅ Server URL retrieved:', apiUrl);
                    verifyApiKey(apiUrl);
                } else {
                    console.log('❌ Failed to retrieve API URL from GitHub');
                }
            },
            onerror: function(error) {
                console.error('❌ Error retrieving API URL from GitHub:', error);
            }
        });
    }

    function verifyApiKey(apiUrl) {
        GM_xmlhttpRequest({
            method: 'POST',
            url: apiUrl + '/verify',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({ apiKey: apiKey }),
            onload: function(response) {
                if (response.status === 200) {
                    const script = response.responseText;
                    console.log('✅ Script received from server:', script);
                    injectScript(script);
                } else {
                    console.log('❌ Invalid API Key');
                }
            },
            onerror: function(error) {
                console.error('❌ Error verifying API key:', error);
            }
        });
    }

    function injectScript(scriptContent) {
        const script = `
            (function() {
                'use strict';
                ${scriptContent}
            })();
        `;
        const scriptElement = document.createElement('script');
        scriptElement.textContent = script;
        document.body.appendChild(scriptElement);
        console.log('✅ Script injected into page');
    }

    getApiUrlFromGitHub();

})();
