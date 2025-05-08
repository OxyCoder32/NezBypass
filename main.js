(function () {
    'use strict';

    const githubTxtUrl = 'https://raw.githubusercontent.com/perritoelpro32/NezBypass/main/url.txt';

    function fetchApiUrl() {
        return fetch(githubTxtUrl)
            .then(res => res.text())
            .then(text => text.trim());
    }

    function verifyKey(apiUrl, apiKey) {
        return fetch(apiUrl + '/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ apiKey })
        })
        .then(res => {
            if (!res.ok) throw new Error('Invalid API key');
            return res.text();
        });
    }

    async function main() {
        try {
            const { apikey } = config();
            const apiUrl = await fetchApiUrl();
            const result = await verifyKey(apiUrl, apikey);
            console.log('✅ API verified:', result);

            // Redirigir si el resultado es una URL
            if (result.startsWith('http')) {
                window.location.href = result;
            }
        } catch (error) {
            console.error('❌ Error during verification:', error);
        }
    }

    main();
})();
