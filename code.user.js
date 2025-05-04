// ==UserScript==
// @name         Nez
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Auto Bypass Panda, Platoboost, KeyGuardian & more
// @author       Lazaro
// @icon         https://media.discordapp.net/attachments/1366233481125826592/1367640053463126067/Vibrant_Purple__N__Logo_Design.png?ex=6815518e&is=6814000e&hm=51041aabe74bd10fe18396be5b90c3aaac52e09685d3fc890913a8ef51554c1f&=&format=webp&quality=lossless&width=569&height=569
// @match        *://linkvertise.com/*
// @match        *://loot-link.com/*
// @match        *://loot-links.com/*
// @match        *://lootlink.org/*
// @match        *://lootlinks.co/*
// @match        *://lootdest.info/*
// @match        *://lootdest.org/*
// @match        *://lootdest.com/*
// @match        *://links-loot.com/*
// @match        *://links.spacebin.in/*
// @match        *://adfoc.us/*
// @match        *://boost.ink/*
// @match        *://cuty.io/*
// @match        *://www.cuty.io/*
// @match        *://cutyion.com/*
// @match        *://cety.app/*
// @match        *://www.cety.app/*
// @match        *://mboost.me/*
// @match        *://bst.gg/*
// @match        *://booo.st/*
// @match        *://bstlar.com/*
// @match        *://mendationforc.info/*
// @match        *://paster.so/*
// @match        *://paster.gg/*
// @match        *://rekonise.com/*
// @match        *://social-unlock.com/*
// @match        *://www.social-unlock.com/*
// @match        *://socialwolvez.com/*
// @match        *://sub2get.com/*
// @match        *://www.sub2get.com/*
// @match        *://work.ink/*
// @match        *://workink.net/*
// @match        *://paste.work.ink/view.html*
// @match        *://outgoing.work.ink/*
// @match        *://auth.platoboost.com/*
// @match        *://auth.platoboost.net/*
// @match        *://auth.platorelay.com/*
// @match        *://auth.platorelay.net/*
// @match        *://spdmteam.com/*
// @match        *://mobile.codex.lol/*
// @match        *://flux.li/*
// @match        *://keyguardian.org/a/*
// @match        *://keyrblx.com/getkey/*
// @match        *://pandadevelopment.net/*
// @match        *://krnl.cat/*
// @match        *://www.nixius.xyz/*
// @match        *://trigonevo.fun/*
// @match        *://arc-hub.xyz/*
// @match        *://alchemyhub.xyz/key*
// @match        *://ads.luarmor.net/get_key?*
// @match        *://hehehub-acsu123.pythonanywhere.com/api/getkeyv4*
// @match        *://hohocomunity.xyz/api/getkeyv4*
// @match        *://hohocomunity.xyz/api/getkeyv2*
// @match        *://ldnesfspublic.org/https*
// @match        *://thebasement.ink/*
// @match        *://apixerohub.x10.mx/api/getkey?*
// @match        *://getkey.farrghii.com/*
// @match        *://overdrivehub.xyz/*
// @match        *://auth.btteam.net/*
// @match        *://stfly.biz/*
// @match        *://shrtlk.click/*
// @match        *://airevue.net/*
// @match        *://atravan.net/*
// @match        *://*/recaptcha/*
// @match        *://pastebin.com/*
// @match        *://paste-drop.com/*
// @match        *://pastefy.app/*
// @match        *://esohasl.net/*
// @match        *://linkunlocker.com/*
// @match        *://*.youtube.com/*
// @match        *://*.discord.com/*
// @match        *://nicuse.xyz/*
// @match        *://404063.xyz/*
// @match        *://link4m.com/go/*
// @match        *://zks1.blogspot.com/?post=*
// @match        *://zks2.blogspot.com/?post=*
// @match        *://tutwuri.id/*
// @match        *://sfl.gl/ready/go?u=*
// @match        *://pastesio.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict';

  // Rainbow border animation
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

(function () {
  'use strict';
 
  // Rainbow border animation
  GM_addStyle(`
    @keyframes rainbow {`
      0% { border-color: red; }
      16% { border-color: orange; }
      32% { border-color: yellow; }
      48% { border-color: green; }
      64% { border-color: cyan; }
      80% { border-color: blue; }
      100% { border-color: violet; }
    }
  `);
 
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
