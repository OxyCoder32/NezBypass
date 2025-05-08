(function () {
  // Prevent multiple executions
  if (window.nezBypassRunning) return;
  window.nezBypassRunning = true;

  if (!apiKey) return showLog("❌ API key missing");

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startBypass);
  } else {
    startBypass();
  }

  async function startBypass() {
    const url = window.location.href;

    showLog(`🔑 API Key: ${apiKey}`);
    showLog(`🌐 Target URL: ${url}`);

    try {
      const res = await fetch("http://localhost:3000/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey, url }),
      });

      const data = await res.json();

      if (res.ok && data.redirect) {
        showLog("✅ Access granted. Redirecting...");
        setTimeout(() => {
          window.location.href = data.redirect;
        }, 2000);
      } else if (res.ok) {
        showLog("⚠️ No redirection required.");
      } else {
        showLog(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      showLog("❌ Error during verification: " + err.message);
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
})();
