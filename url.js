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
    return GM_xmlhttpRequest({
        method: "POST",
        url: apiUrl + '/verify',
        data: JSON.stringify({ apiKey }),
        headers: { 'Content-Type': 'application/json' },
        onload: function(response) {
            if (response.status === 200) {
                const scriptContent = response.responseText;  // This is your obfuscated JS
                injectScript(scriptContent);  // Inject the obfuscated code
            } else {
                console.error('API key invalid');
            }
        },
        onerror: function(error) {
            console.error('❌ Error al verificar la API key:', error);
        }
    });
}


function injectScript(code) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.textContent = code; // Inject the raw JavaScript code
    document.body.appendChild(script); // Add it to the DOM to execute it
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
