(function() {
    'use strict';

    const githubTxtUrl = 'https://raw.githubusercontent.com/perritoelpro32/NezBypass/main/url.txt';

    function fetchApiUrl() {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: 'GET',
                url: githubTxtUrl,
                onload: function(response) {
                    if (response.status === 200) {
                        resolve(response.responseText.trim());
                    } else {
                        reject(new Error('Error al obtener la URL del API'));
                    }
                },
                onerror: function(error) {
                    reject(new Error('Error en la solicitud a GitHub'));
                }
            });
        });
    }

    function verifyKey(apiUrl, apiKey) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: 'POST',
                url: apiUrl + '/verify',
                headers: { 'Content-Type': 'application/json' },
                data: JSON.stringify({ apiKey }),
                onload: function(response) {
                    if (response.status === 200) {
                        resolve(response.responseText);
                    } else {
                        reject(new Error('API key inválida'));
                    }
                },
                onerror: function(error) {
                    reject(new Error('Error al verificar la API key'));
                }
            });
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
