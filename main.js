(function () {
  if (window.nezBypassRunning) return;
  window.nezBypassRunning = true;

  const waitForDOM = () => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", startBypass);
    } else {
      startBypass();
    }
  };

  function startBypass() {
    try {
      // API key desde config() o fallback
      const apiKey = typeof config === "function" && config()?.apikey
        ? config().apikey
        : "default-fallback-key";

      const targetUrl = window.location.href;

      if (!apiKey || apiKey === "default-fallback-key") {
        showLog("❌ API Key missing or fallback in use.");
        return;
      }

      if (!targetUrl || typeof targetUrl !== "string" || targetUrl === "undefined") {
        showLog("❌ Invalid or missing URL.");
        return;
      }

      showLog(`🔑 API Key: ${apiKey}`);
      showLog(`🌐 Requested URL: ${targetUrl}`);

      fetch(`http://localhost:3000/bypass?key=${apiKey}&url=${encodeURIComponent(targetUrl)}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.redirect) {
            showLog("✅ Access granted. Redirecting...");
            setTimeout(() => {
              window.location.href = data.redirect;
            }, 2000);
          } else {
            showLog("❌ Access denied or no redirect provided.");
          }
        })
        .catch(err => {
          console.error(err);
          showLog("❌ Error connecting to API.");
        });

    } catch (err) {
      console.error(err);
      showLog("❌ Critical error occurred.");
    }
  }

  function showLog(message) {
    const panel = getOrCreatePanel();
    const p = document.createElement("p");
    p.textContent = message;
    panel.appendChild(p);
  }

  function getOrCreatePanel() {
    let panel = document.getElementById("nez-bypass-log");
    if (!panel) {
      panel = document.createElement("div");
      panel.id = "nez-bypass-log";
      panel.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: black;
        color: white;
        padding: 10px;
        border: 3px solid;
        border-image: linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet) 1;
        font-family: monospace;
        z-index: 9999;
        max-width: 400px;
        word-wrap: break-word;
      `;
      document.body.appendChild(panel);
    }
    return panel;
  }

  waitForDOM();
})();
