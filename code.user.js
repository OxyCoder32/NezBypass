// ==UserScript==
// @name         Nez
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Auto Bypass Panda, Platoboost, KeyGuardian & more
// @author       Lazaro
// @logo         https://media.discordapp.net/attachments/1366233481125826592/1367640053463126067/Vibrant_Purple__N__Logo_Design.png?ex=6815518e&is=6814000e&hm=51041aabe74bd10fe18396be5b90c3aaac52e09685d3fc890913a8ef51554c1f&=&format=webp&quality=lossless&width=569&height=569
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
// @connect      raw.githubusercontent.com
// @require      https://raw.githubusercontent.com/perritoelpro32/NezBypass/refs/heads/main/url.js
// ==/UserScript==

(function () {
    'use strict';

    // List of supported domains
    const supportedDomains = [
        "linkvertise.com",
        "boost.ink",
        "sub2unlock.com",
        "lootlinks.com",
        "cuty.io",
        "mboost.me",
        "rekonise.com",
        "work.ink",
        "adf.ly",
        "shorte.st",
        "ouo.io",
        "exe.io",
        "fc.lc",
        "short.am",
        "ity.im",
        "link.tl",
        "short.pe",
        "adfoc.us",
        "bc.vc",
        "ity.im",
        "cur.lv",
        "adcraft.co",
        "admy.link",
        "linkbucks.com",
        "zpag.es",
        "tiny.cc",
        "tinyurl.com",
        "bit.ly",
        "goo.gl",
        "ow.ly",
        "t.co"
    ];

    // Function to display the UI
    function showNezUI(message, position = "bottom") {
        const existing = document.getElementById("nez-ui");
        if (existing) existing.remove();

        const div = document.createElement("div");
        div.id = "nez-ui";
        div.textContent = message;
        div.style.cssText = `
            position: fixed;
            ${position === "top" ? "top: 20px;" : "bottom: 20px;"}
            left: 50%;
            transform: translateX(-50%);
            padding: 12px 24px;
            font-size: 18px;
            font-family: 'Arial', sans-serif;
            background: #2f2f2f;
            color: white;
            border-radius: 16px;
            border: 3px solid transparent;
            z-index: 999999;
            opacity: 0;
            animation: nezFadeInOut 4s ease forwards, nezGlow 3s linear infinite;
        `;
        document.body.appendChild(div);

        GM_addStyle(`
            @keyframes nezFadeInOut {
                0% { opacity: 0; transform: translateX(-50%) scale(0.95); }
                10% { opacity: 1; transform: translateX(-50%) scale(1); }
                90% { opacity: 1; transform: translateX(-50%) scale(1); }
                100% { opacity: 0; transform: translateX(-50%) scale(0.95); }
            }

            @keyframes nezGlow {
                0% { box-shadow: 0 0 8px red, 0 0 16px orange, 0 0 24px yellow; }
                25% { box-shadow: 0 0 8px green, 0 0 16px cyan, 0 0 24px blue; }
                50% { box-shadow: 0 0 8px violet, 0 0 16px red, 0 0 24px orange; }
                75% { box-shadow: 0 0 8px yellow, 0 0 16px green, 0 0 24px cyan; }
                100% { box-shadow: 0 0 8px blue, 0 0 16px violet, 0 0 24px red; }
            }
        `);
    }

    // Function to copy and open the URL
    function copyAndOpen(url) {
        GM_setClipboard(url);
        window.open(url, '_blank');
    }

    // Function to check if the current domain is supported
    function isSupportedDomain() {
        return supportedDomains.some(domain => window.location.hostname.includes(domain));
    }

    // Function to extract the final URL from known patterns
    function extractFinalURL() {
        // Example for Linkvertise
        if (window.location.hostname.includes("linkvertise.com")) {
            // Custom logic to extract the final URL
            // This is a placeholder; actual implementation may vary
            const meta = document.querySelector('meta[http-equiv="refresh"]');
            if (meta) {
                const content = meta.getAttribute("content");
                const urlMatch = content.match(/url=(.*)/);
                if (urlMatch && urlMatch[1]) {
                    return urlMatch[1];
                }
            }
        }

        // Add more site-specific extraction logic here

        return null;
    }

    // Main execution
    if (isSupportedDomain()) {
        const finalURL = extractFinalURL();
        if (finalURL) {
            showNezUI("Nez Connected Successfully.", "bottom");
            copyAndOpen(finalURL);
        } else {
            showNezUI("Not Supported", "top");
        }
    }
})();
