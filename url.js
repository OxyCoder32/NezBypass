(function() {
     'use strict';

     const githubTxtUrl = 'https://raw.githubusercontent.com/perritoelpro32/NezBypass/main/url.txt';

     function fetchApiUrl() {
         return fetch(githubTxtUrl)
             .then(res => res.text())
             .then(text => text.trim());
         return new Promise((resolve, reject) => {
             GM_xmlhttpRequest({
                 method: 'GET',
                 url: githubTxtUrl,
                 onload: function(response) {
                     if (response.status === 200) {
                         resolve(response.responseText.trim());
                     } else {
                         reject(new Error('Error al obtener la URL del API'));
                     }
                 },
                 onerror: function(error) {
                     reject(new Error('Error en la solicitud a GitHub'));
                 }
             });
         });
     }

     function verifyKey(apiUrl, apiKey) {
         return fetch(apiUrl + '/verify', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ apiKey })
         })
         .then(res => {
             if (!res.ok) throw new Error('API key inválida');
             return res.text();
         return new Promise((resolve, reject) => {
             GM_xmlhttpRequest({
                 method: 'POST',
                 url: apiUrl + '/verify',
                 headers: { 'Content-Type': 'application/json' },
                 data: JSON.stringify({ apiKey }),
                 onload: function(response) {
                     if (response.status === 200) {
                         resolve(response.responseText);
                     } else {
                         reject(new Error('API key inválida'));
                     }
                 },
                 onerror: function(error) {
                     reject(new Error('Error al verificar la API key'));
                 }
             });
         });
     }
