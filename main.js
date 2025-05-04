// ==UserScript==
// @name         Nez
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Auto Bypass Panda, Platoboost, KeyGuardian & more
// @author       Lazaro
// @logo
// @match        :///*
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict';

  // Rainbow border animation
  GM_addStyle(
    @keyframes rainbow {
      0% { border-color: red; }
      16% { border-color: orange; }
      32% { border-color: yellow; }
      48% { border-color: green; }
      64% { border-color: cyan; }
      80% { border-color: blue; }
      100% { border-color: violet; }
    }
  );

  function showUI(message) {
    if (document.getElementById("nez-ui")) return; // prevent duplicates

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
    setTimeout(() => box.remove(), 3000);
  }

  function tryShowUI() {
    if (document.readyState === "complete" || document.body) {
      showUI("Nez connected successfully!");
    } else {
      // Retry shortly if body isn't ready yet
      setTimeout(tryShowUI, 100);
    }
  }

  // Ensure it's run even for slow/dynamic pages
  window.addEventListener("load", tryShowUI, { once: true });
  tryShowUI();
})();
