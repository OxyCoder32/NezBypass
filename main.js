(async function() {
    const config = () => ({
        apikey: 'lZC7t7ATegHOgaclMIVGnip9oWRgLNM' // Tu API key aquí
    });

    const apiKey = config().apikey;
    const currentURL = window.location.href;

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

    const verifyAndBypass = async () => {
        const server = await fetchServerURL();
        if (!server) return;

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
