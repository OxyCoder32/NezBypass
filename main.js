(function () {
const getApiKeyFromUserScript = () => {
try {
if (typeof config === 'function') {
const result = config();
if (result && result.apikey) {
return result.apikey;
}
}
} catch (e) {
console.error('❌ Could not retrieve API key from userscript:', e);
}
return null;
};

const apiKey = getApiKeyFromUserScript();

if (!apiKey) {
console.error('❌ No API key configured. Edit the userscript config().');
return;
}

const API_SERVER = 'https://raw.githubusercontent.com/OxyCoder32/NezBypass/main/url.txt';

const fetchServerURL = async () => {
try {
const res = await fetch(API_SERVER);
const url = await res.text();
return url.trim();
} catch (e) {
console.error('❌ Failed to fetch server URL:', e);
return null;
}
};

const injectScriptToGetURL = () => {
return new Promise((resolve) => {
const script = document.createElement('script');
script.textContent = `
               (function() {
                   window.postMessage({ type: 'NEZ_CURRENT_URL', url: window.location.href }, '*');
               })();
           `;
document.documentElement.appendChild(script);
script.remove();

window.addEventListener('message', function handler(event) {
if (event.data && event.data.type === 'NEZ_CURRENT_URL') {
window.removeEventListener('message', handler);
resolve(event.data.url);
}
});
});
};

// Función para detectar Cloudflare típico en la página (inglés y español)
const isCloudflareChallenge = () => {
const bodyText = document.body.innerText?.toLowerCase() || '';

const indicators = [
// Inglés
'checking your browser before accessing',
'attention required! | cloudflare',
// Español
'verificando tu navegador antes de acceder',
'¡atención requerida! | cloudflare'
];

const challengeDetected = indicators.some(ind => bodyText.includes(ind)) ||
!!document.querySelector('div#cf-wrapper') ||
!!document.querySelector('div.cf-browser-verification') ||
!!document.querySelector('iframe[src*="turnstile"]') ||
            !!document.title.includes("Un momento") ||
!!document.querySelector('iframe[src*="challenges.cloudflare.com"]');

if (challengeDetected) {
console.log('☁️ Cloudflare o Turnstile detectado en la página.');
} else {
console.log('✅ No se detectó desafío de Cloudflare en esta página.');
}

return challengeDetected;
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const verifyAndBypass = async () => {
console.log('⏳ Esperando 5 segundos antes de verificar captcha...');
await delay(5000);

const server = await fetchServerURL();
if (!server) return;

const currentURL = await injectScriptToGetURL();
console.log('🌐 Actual page URL:', currentURL);

if (!currentURL) {
console.error('❌ No se pudo obtener la URL actual');
return;
}

if (isCloudflareChallenge()) {
console.log('☁️ Se detectó desafío de Cloudflare, consultando API para bypass...');
try {
const res = await fetch(`${server}/bypass`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ apiKey, url: currentURL })
});

const data = await res.json();

if (data.bypassed_url) {
console.log('✅ Bypass de Cloudflare listo, redirigiendo a:', data.bypassed_url);
console.log('ℹ️ Mensaje:', data.message || '(sin mensaje)');
if (data.cookies) {
console.log('🍪 Cookies recibidas:', data.cookies);
// Aquí opcionalmente puedes setear cookies si quieres
}
window.location.href = data.bypassed_url;

} else if (data.status === 'ready' && data.redirect) {
// Compatibilidad anterior
console.log('✅ Bypass de Cloudflare listo, redirigiendo a:', data.redirect);
window.location.href = data.redirect;

} else if (data.status === 'error' || data.status === 'failed') {
console.warn('⚠️ Error en el bypass de Cloudflare:', data.message || data.error || '(sin mensaje)');
} else {
console.warn('⚠️ Respuesta inesperada del bypass:', data);
}
} catch (err) {
console.error('❌ Falló el bypass de Cloudflare:', err);
}
} else {
// Endpoint verify normal
try {
const res = await fetch(`${server}/verify`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ apiKey, url: currentURL })
});

const data = await res.json();

if (data.status === 'ready' && data.redirect) {
console.log('✅ Redirigiendo a:', data.redirect);
window.location.href = data.redirect;
} else if (data.status === 'ok') {
console.log('ℹ️ No se requiere bypass:', data.message);
} else {
console.warn('⚠️ Respuesta inesperada:', data);
}
} catch (err) {
console.error('❌ Falló la verificación:', err);
}
}
};

verifyAndBypass();
})();
