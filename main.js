(function () {
    'use strict';

    const githubTxtUrl = 'https://raw.githubusercontent.com/perritoelpro32/NezBypass/main/url.txt';

    function showUI(message, duration = 3000) {
        const existing = document.getElementById("nez-ui");
        if (existing) existing.remove();

        const box = document.createElement("div");
        box.id = "nez-ui";
        box.textContent = message;

        Object.assign(box.style, {
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "12px 24px",
            background: "#444",
            color: "lightgrey",
            fontSize: "16px",
            fontWeight: "bold",
            border: "3px solid red",
            borderRadius: "16px",
            zIndex: "999999",
            animation: "rainbow 3s linear infinite"
        });

        document.body.appendChild(box);
        setTimeout(() => box.remove(), duration);
    }

    GM_addStyle(`
        @keyframes rainbow {
            0% { border-color: red; }
            16% { border-color: orange; }
            32% { border-color: yellow; }
            48% { border-color: green; }
            64% { border-color: cyan; }
            80% { border-color: blue; }
            100% { border-color: violet; }
        }
    `);

    function fetchApiUrl() {
        return fetch(githubTxtUrl)
            .then(res => res.text())
            .then(text => text.trim());
    }

    function getCachedVerification(apiKey) {
        const data = localStorage.getItem(`nez-verification-${apiKey}`);
        if (!data) return null;

        const parsed = JSON.parse(data);
        const now = Date.now();
        return now - parsed.timestamp < 10 * 60 * 1000 ? parsed.result : null;
    }

    function setCachedVerification(apiKey, result) {
        const cache = {
            timestamp: Date.now(),
            result
        };
        localStorage.setItem(`nez-verification-${apiKey}`, JSON.stringify(cache));
    }

    function verifyKey(apiUrl, apiKey, currentUrl) {
        return fetch(`${apiUrl}/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ apiKey, url: currentUrl })
        })
        .then(res => {
            if (!res.ok) throw new Error('Invalid API key');
            return res.text();
        });
    }

    async function main() {
        try {
            const { apikey } = config();
            const cached = getCachedVerification(apikey);
            if (cached) {
                showUI("✅ Cached verification found");
                if (cached.startsWith("http")) window.location.href = cached;
                return;
            }

            const apiUrl = await fetchApiUrl();
            const currentUrl = window.location.href;
            const result = await verifyKey(apiUrl, apikey, currentUrl);

            setCachedVerification(apikey, result);
            showUI("✅ Verified successfully");

            if (result.startsWith("http")) {
                showUI("🔁 Redirecting...", 1500);
                setTimeout(() => window.location.href = result, 1500);
            }

        } catch (error) {
            showUI("❌ Verification failed");
            console.error('❌ Error during verification:', error);
        }
    }

    main();
})();
