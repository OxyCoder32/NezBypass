// ==UserScript==
// @name         Nez Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Nez Userscript
// @author       OxyCoder/Zero
// @match        *://linkvertise.com/*
// @match        *://loot-link.com/*
// @match        *://loot-links.com/*
// @match        *://lootlink.org/*
// @match        *://lootlinks.co/*
// @match        *://lootdest.info/*
// @match        *://lootdest.org/*
// @match        *://lootdest.com/*
// @match        *://links-loot.com/*
// @match        *://linksloot.net/*
// @match        *://*.onsultingco.com/*
// @match        *://sub2unlock.com/*
// @match        *://sub2unlock.io/*
// @match        *://sub2unlock.net/*
// @match        *://sub2unlock.me/*
// @match        *://sub2unlock.online/*
// @match        *://sub2unlock.top/*
// @match        *://sub4unlock.pro/*
// @match        *://sub4unlock.com/*
// @match        *://sub4unlock.io/*
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
// @icon         https://logospng.org/download/c-plus-plus/c-plus-plus-1024.png
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    const apiKey = 'PASTE_YOUR_LINK_HERE';
    const serverUrl = 'https://raw.githubusercontent.com/perritoelpro32/NezBypass/refs/heads/main/url.txt';

    function getApiUrlFromGitHub() {
        GM_xmlhttpRequest({
            method: 'GET',
            url: serverUrl,
            onload: function(response) {
                if (response.status === 200) {
                    const apiUrl = response.responseText.trim();
                    verifyApiKey(apiUrl);
                } else {
                    console.log('❌');
                }
            },
            onerror: function(error) {
                console.error(error);
            }
        });
    }

    function verifyApiKey(apiUrl) {
        GM_xmlhttpRequest({
            method: 'POST',
            url: apiUrl + '/verify',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({ apiKey: apiKey }),
            onload: function(response) {
                if (response.status === 200) {
                    const script = response.responseText;
                    console.log('✅ Script received from server:', script);
                    injectScript(script);
                } else {
                    console.log('❌ Invalid API Key');
                }
            },
            onerror: function(error) {
                console.error('❌ Error verifying API key:', error);
            }
        });
    }

    function injectScript(scriptContent) {
        const script = `
            (function() {
                'use strict';
                ${scriptContent}
            })();
        `;
        const scriptElement = document.createElement('script');
        scriptElement.textContent = script;
        document.body.appendChild(scriptElement);
    }

    getApiUrlFromGitHub();

})();
