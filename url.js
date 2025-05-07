(function () {
    'use strict';

    const githubTxtUrl = 'https://raw.githubusercontent.com/perritoelpro32/NezBypass/main/url.txt';

    function fetchApiUrl() {
        return fetch(githubTxtUrl)
            .then(res => res.text())
            .then(text => text.trim());
    }

    function verifyKey(apiUrl) {
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

    function bypassLink(apiUrl, originalUrl) {
        return fetch(apiUrl + '/bypass', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ apiKey, url: originalUrl })
        })
            .then(res => {
                if (!res.ok) throw new Error('Error al bypassear el enlace');
                return res.json();
            });
    }

    async function autoBypassExample(link) {
        try {
            const apiUrl = await fetchApiUrl();
            await verifyKey(apiUrl);
            const result = await bypassLink(apiUrl, link);
            console.log('✅ Enlace bypassed:', result.destination);
            alert(`✅ Enlace bypassed:\n${result.destination}`);
        } catch (err) {
            console.error('❌ Error:', err.message);
            alert('❌ Error: ' + err.message);
        }
    }

    setTimeout(() => {
        const linkEjemplo = prompt("Ingresa el enlace a bypassear:");
        if (linkEjemplo) autoBypassExample(linkEjemplo);
    }, 2000);

})();
