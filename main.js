(function () {
    const config = () => ({
        apikey: 'cZIZ5jCAvoq6zEtA0AuX8cZJk3BVjo6y'
    });

    const apiKey = config().apikey;

    const API_SERVER = 'https://raw.githubusercontent.com/perritoelpro32/NezBypass/main/url.txt';

    // Cargar URL del servidor desde url.txt
    const fetchServerURL = async () => {
        try {
            const res = await fetch(API_SERVER);
            const url = await res.text();
            return url.trim();
        } catch (e) {
            console.error('❌ Failed to fetch server URL:', e);
            return null;
        }
    };


    const injectScriptToGetURL = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.textContent = `
                (function() {
                    window.postMessage({ type: 'NEZ_CURRENT_URL', url: window.location.href }, '*');
                })();
            `;
            document.documentElement.appendChild(script);
            script.remove();

            window.addEventListener('message', function handler(event) {
                if (event.data && event.data.type === 'NEZ_CURRENT_URL') {
                    window.removeEventListener('message', handler);
                    resolve(event.data.url);
                }
            });
        });
    };

    const verifyAndBypass = async () => {
        const server = await fetchServerURL();
        if (!server) return;

        const currentURL = await injectScriptToGetURL();
        console.log('🌐 Actual page URL:', currentURL);

        if (!currentURL) {
            console.error('❌ Could not get current URL');
            return;
        }

        try {
            const res = await fetch(`${server}/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ apiKey, url: currentURL })
            });

            const data = await res.json();

            if (data.status === 'ready' && data.redirect) {
                console.log('✅ Redirecting to:', data.redirect);
                window.location.href = data.redirect;
            } else if (data.status === 'ok') {
                console.log('ℹ️ No bypass required:', data.message);
            } else {
                console.warn('⚠️ Unexpected response:', data);
            }
        } catch (err) {
            console.error('❌ Failed to verify:', err);
        }
    };

    verifyAndBypass();
})();
