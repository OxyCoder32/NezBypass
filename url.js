(function() {
    'use strict';

    const githubTxtUrl = 'https://raw.githubusercontent.com/perritoelpro32/NezBypass/main/url.txt';

    function fetchApiUrl() {
        return fetch(githubTxtUrl)
            .then(res => res.text())
            .then(text => text.trim());
    }

    async function sendBypassRequest(apiUrl, apiKey, targetUrl) {
        try {
            const res = await fetch(apiUrl + '/bypass', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ apiKey, url: targetUrl })
            });

            if (!res.ok) {
                console.error('❌ Bypass failed:', await res.text());
                return;
            }

            const data = await res.json();
            if (data.success && data.result) {
                console.log('✅ Bypass successful, redirecting...');
                window.location.href = data.result;
            } else {
                console.warn('⚠️ No redirect URL provided by server');
            }
        } catch (err) {
            console.error('❌ Error while requesting bypass:', err);
        }
    }

    function getConfigApiKey() {
        try {
            const configFunc = window.config;
            if (typeof configFunc !== 'function') throw new Error("Missing config()");
            const cfg = configFunc();
            if (!cfg.apikey) throw new Error("Missing apikey in config()");
            return cfg.apikey;
        } catch (e) {
            console.error('❌ Could not extract API key from config():', e.message);
            return null;
        }
    }

    async function initBypass() {
        const apiKey = getConfigApiKey();
        if (!apiKey) return;

        const currentUrl = window.location.href;
        const apiUrl = await fetchApiUrl();
        if (!apiUrl) {
            console.error('❌ Could not retrieve API URL');
            return;
        }

        console.log('🔁 Sending URL to bypass server...');
        await sendBypassRequest(apiUrl, apiKey, currentUrl);
    }

    initBypass();
})();
