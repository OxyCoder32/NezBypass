(function() {
    'use strict';

    const githubTxtUrl = 'https://raw.githubusercontent.com/OxyCoder32/NezBypass/main/url.txt';

    // Function to fetch the API URL from the text file on GitHub
    function fetchApiUrl() {
        return fetch(githubTxtUrl)
            .then(res => res.text())
            .then(text => text.trim())
            .catch(err => {
                console.error('Error fetching API URL:', err);
                return '';
            });
    }

    // Function to verify API Key
    function verifyKey(apiUrl, apiKey) {
        return fetch(apiUrl + '/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ apiKey })
        })
        .then(res => {
            if (!res.ok) throw new Error('API key inválida');
            return res.text();
        })
        .catch(error => {
            console.error('Error verifying API key:', error);
            return '';
        });
    }

    // This function gets the API URL and verifies the key
    function checkApiKey(apiKey) {
        fetchApiUrl().then(apiUrl => {
            if (apiUrl) {
                verifyKey(apiUrl, apiKey).then(response => {
                    if (response === 'Valid') {
                        console.log('API key is valid.');
                        // Additional logic after successful key validation can go here
                    } else {
                        console.log('Invalid API key.');
                    }
                });
            } else {
                console.error('No API URL available');
            }
        });
    }

    // Expose the checkApiKey function to be used in the main userscript
    window.checkApiKey = checkApiKey;
})();
