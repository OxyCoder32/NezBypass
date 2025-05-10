window.nezBypass = {
    verifyAndBypass: async function(apiKey, url) {
        const API_SERVER = 'https://raw.githubusercontent.com/perritoelpro32/NezBypass/main/url.txt';

        try {
            const res = await fetch(API_SERVER);
            const server = (await res.text()).trim();

            const response = await fetch(`${server}/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ apiKey, url })
            });

            const data = await response.json();

            if (data.status === 'ready' && data.redirect) {
                console.log('✅ Redirecting to:', data.redirect);
                window.location.href = data.redirect;
            } else if (data.status === 'ok') {
                console.log('ℹ️ No bypass required:', data.message);
            } else {
                console.warn('⚠️ Unexpected response:', data);
            }

        } catch (err) {
            console.error('❌ Failed to verify or connect:', err);
        }
    }
};
