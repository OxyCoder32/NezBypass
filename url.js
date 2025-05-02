(function() {
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
            if (!res.ok) throw new Error('API key inválida');
            return res.text();
        });
    }

    function injectScript(code) {
        const script = document.createElement('script');
        script.textContent = `(function() { 'use strict'; ${code} })();`;
        document.body.appendChild(script);
    }

    try {
        const apiKey = config().apikey;
        if (!apiKey) throw new Error('API Key no definida');

        fetchApiUrl()
            .then(apiUrl => verifyKey(apiUrl, apiKey))
            .then(script => injectScript(script))
            .catch(err => console.error('❌ Error al verificar la API key:', err));
    } catch (err) {
        console.error('❌ Error de ejecución:', err);
    }

})();
