(function () {
    const getApiKeyFromUserScript = () => {
        try {
            if (typeof config === 'function') {
                const result = config();
                if (result && result.apikey) {
                    return result.apikey;
                }
            }
        } catch (e) {
            console.error('❌ Could not retrieve API key from userscript:', e);
        }
        return null;
    };

    const apiKey = getApiKeyFromUserScript();

    if (!apiKey) {
        console.error('❌ No API key configured. Edit the userscript config().');
        return;
    }

    const API_SERVER = 'https://raw.githubusercontent.com/perritoelpro32/NezBypass/main/url.txt';

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

    // Función para detectar Cloudflare típico en la página
const isCloudflareChallenge = () => {
    const bodyText = document.body.innerText?.toLowerCase() || '';

    const indicators = [
        // Inglés
        'checking your browser before accessing',
        'attention required! | cloudflare',
        // Español
        'verificando tu navegador antes de acceder',
        '¡atención requerida! | cloudflare'
    ];

    const challengeDetected = indicators.some(ind => bodyText.includes(ind)) ||
        !!document.querySelector('div#cf-wrapper') ||
        !!document.querySelector('div.cf-browser-verification') ||
        !!document.querySelector('iframe[src*="turnstile"]') ||
        !!document.querySelector('iframe[src*="challenges.cloudflare.com"]');

    if (challengeDetected) {
        console.log('☁️ Cloudflare o Turnstile detectado en la página.');
    } else {
        console.log('✅ No se detectó desafío de Cloudflare en esta página.');
    }

    return challengeDetected;
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

    if (isCloudflareChallenge()) {
        console.log('☁️ Cloudflare challenge detected, consulting API for bypass...');
        try {
            const res = await fetch(`${server}/bypass`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ apiKey, url: currentURL })
            });

            const data = await res.json();

            if (data.bypassed_url) {
                console.log('✅ Cloudflare bypass ready, redirecting to:', data.bypassed_url);
                console.log('ℹ️ Message:', data.message || '(no message)');
                if (data.cookies) {
                    console.log('🍪 Cookies received:', data.cookies);
                    // Optionally, you could set cookies here if needed
                }
                window.location.href = data.bypassed_url;

            } else if (data.status === 'ready' && data.redirect) {
                // Backwards compatibility
                console.log('✅ Cloudflare bypass ready, redirecting to:', data.redirect);
                window.location.href = data.redirect;

            } else if (data.status === 'error' || data.status === 'failed') {
                console.warn('⚠️ Error in Cloudflare bypass:', data.message || data.error || '(no message)');
            } else {
                console.warn('⚠️ Unexpected response from CF bypass:', data);
            }
        } catch (err) {
            console.error('❌ Cloudflare bypass failed:', err);
        }
    } else {
        // Normal verify endpoint
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
    }
};


    verifyAndBypass();
})();
