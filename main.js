(function () {
    'use strict';

    const githubTxtUrl = 'https://raw.githubusercontent.com/perritoelpro32/NezBypass/main/url.txt';

    function fetchApiUrl() {
        return fetch(githubTxtUrl)
            .then(res => res.text())
            .then(text => text.trim());
    }

    function verifyKey(apiUrl, apiKey, currentUrl) {
        return fetch(apiUrl + '/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ apiKey, url: currentUrl }) // ← se envía la URL actual
        })
        .then(res => {
            if (!res.ok) throw new Error('Invalid API key');
            return res.json(); // ← ahora se espera un JSON
        });
    }

    async function main() {
        try {
            const { apikey } = config();
            const apiUrl = await fetchApiUrl();
            const currentUrl = window.location.href;

            const response = await verifyKey(apiUrl, apikey, currentUrl);

            if (response.status === 'ready' && response.redirect) {
                console.log('✅ Redirecting to:', response.redirect);
                window.location.href = response.redirect;
            } else if (response.status === 'processing') {
                console.log('⏳ Processing... Please wait or retry in a few seconds.');
            } else {
                console.warn('❓ Unknown response:', response);
            }

        } catch (error) {
            console.error('❌ Error during verification:', error);
        }
    }

    main();
})();
