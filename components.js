// components.js

class AppHeader extends HTMLElement {
    connectedCallback() {
        let currentPath = window.location.pathname.split('/').pop();
        let isHome = currentPath === 'index.html' || currentPath === '';
        let isBooking = currentPath === 'booking.html';
        let isConfirmation = currentPath === 'confirmation.html';

        let headerClass = isHome ? 'hero-top' : 'mini-header';

        let innerContent = `
            <div class="${headerClass}">
                <div class="logo-container">
                    <a href="index.html"><img src="logo.jpg" alt="FlyEasy Logo" style="width:60px; height:60px; border-radius:50%; object-fit:cover;"></a>
                </div>
                
                <div class="hamburger" onclick="toggleMenu()" aria-label="Toggle menu" tabindex="0">☰</div>

                <nav class="main-nav" id="mainNav">
                    <a href="index.html" class="${isHome ? 'active' : ''}">Home</a>
                    <a href="booking.html" class="${isBooking ? 'active' : ''}">Booking</a>
                    <a href="confirmation.html" class="${isConfirmation ? 'active' : ''}">Confirmation</a>
                </nav>

                <div style="display: flex; align-items: center; gap: 15px;">
                    <select id="langToggle" onchange="window.setLanguage(this.value)" style="padding: 6px; border-radius: 6px; background: rgba(255,255,255,0.1); color: inherit; border: 1px solid #ccc; font-weight: bold; cursor:pointer;" aria-label="Select Language">
                        <option value="EN" style="color:#333;">🇬🇧 EN</option>
                        <option value="ES" style="color:#333;">🇪🇸 ES</option>
                        <option value="HI" style="color:#333;">🇮🇳 HI</option>
                    </select>

                    <select id="currencyToggle" onchange="window.setCurrency(this.value)" style="padding: 6px; border-radius: 6px; background: rgba(255,255,255,0.1); color: inherit; border: 1px solid #ccc; font-weight: bold; cursor:pointer;" aria-label="Select Currency">
                        <option value="INR" style="color:#333;">₹ INR</option>
                        <option value="USD" style="color:#333;">$ USD</option>
                        <option value="EUR" style="color:#333;">€ EUR</option>
                    </select>
                    
                    <div class="auth-links" id="authArea" style="margin-left: 0;">
                        <!-- Auth links here -->
                    </div>
                    
                    <button onclick="toggleDarkMode()" class="dark-mode-toggle" aria-label="Toggle Dark Mode" title="Toggle Dark Mode">🌙</button>
                </div>
            </div>
        `;
        
        if (!isHome) {
            this.innerHTML = `<div class="mini-hero">${innerContent}</div>`;
        } else {
            this.innerHTML = innerContent;
        }
        
        authCheck();
        
        let langParam = localStorage.getItem("globalLanguage") || "EN";
        let lToggle = this.querySelector("#langToggle");
        if(lToggle) lToggle.value = langParam;

        let curr = localStorage.getItem("globalCurrency") || "INR";
        let cToggle = this.querySelector("#currencyToggle");
        if(cToggle) cToggle.value = curr;
        
        let isDark = localStorage.getItem("darkMode") === "true";
        let btn = this.querySelector('.dark-mode-toggle');
        if(btn) btn.innerText = isDark ? "☀️" : "🌙";
    }
}

class AppFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer style="padding: 20px 0;">
                <div style="display:flex; justify-content:space-between; align-items:center; max-width:1200px; margin:0 auto; padding:0 20px; width:100%; box-sizing:border-box;">
                    <p style="margin:0;">© 2026 Fly Easy Global</p>
                    <a href="admin.html" style="color:#888; text-decoration:none; font-size:12px; font-weight:bold; letter-spacing:1px; transition:color 0.3s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#888'">ADMIN PORTAL 🔒</a>
                </div>
            </footer>
        `;
    }
}

// --- Phase 6: Global Support Bot ---
class SupportBot extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <style>
            .chat-widget { position:fixed; bottom:20px; right:20px; z-index:99999; font-family:sans-serif; }
            .chat-btn { background:#001B94; color:white; border-radius:50%; width:60px; height:60px; display:flex; justify-content:center; align-items:center; font-size:30px; cursor:pointer; box-shadow:0 10px 20px rgba(0,0,0,0.2); transition:transform 0.2s;}
            .chat-btn:hover { transform:scale(1.1); }
            .chat-window { display:none; width:320px; height:450px; background:white; position:absolute; bottom:80px; right:0; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.15); flex-direction:column; overflow:hidden; border:1px solid #ddd;}
            .chat-header { background:#001B94; color:white; padding:15px; font-weight:bold; display:flex; justify-content:space-between; align-items:center; }
            .chat-body { flex:1; padding:15px; overflow-y:auto; background:#f4f6f9; display:flex; flex-direction:column; gap:10px; font-size:14px; }
            .chat-input { display:flex; border-top:1px solid #eee; }
            .chat-input input { flex:1; padding:15px; border:none; outline:none; }
            .chat-input button { padding:15px 20px; background:#4da6ff; color:white; border:none; cursor:pointer; font-weight:bold; }
            .msg-bot { background:#e1f0ff; padding:10px 14px; border-radius:15px 15px 15px 4px; align-self:flex-start; max-width:85%; color:#001B94; line-height:1.4;}
            .msg-user { background:#fff; padding:10px 14px; border-radius:15px 15px 4px 15px; align-self:flex-end; max-width:85%; border:1px solid #ccc; color:#333; line-height:1.4;}
            body.dark-mode .chat-window { background:#1e1e1e; border-color:#333; }
            body.dark-mode .chat-body { background:#121212; }
            body.dark-mode .msg-user { background:#2a2a2a; border-color:#444; color:#eee;}
            body.dark-mode .chat-input input { background:#1e1e1e; color:#eee; border-top-color:#333;}
        </style>
        <div class="chat-widget">
            <div class="chat-window" id="cwin">
                <div class="chat-header"><span>FlyEasy Support ✈️</span> <span style="cursor:pointer;" onclick="document.getElementById('cwin').style.display='none'">✕</span></div>
                <div class="chat-body" id="cbody">
                    <div class="msg-bot">Hello! I'm the automated FlyEasy Assistant. How can I help you today?</div>
                </div>
                <div class="chat-input">
                    <input type="text" id="cinput" placeholder="Type a message..." onkeypress="if(event.key==='Enter') window.sendChat()">
                    <button onclick="window.sendChat()">Send</button>
                </div>
            </div>
            <div class="chat-btn" onclick="document.getElementById('cwin').style.display = document.getElementById('cwin').style.display==='flex'?'none':'flex'">💬</div>
        </div>
        `;
    }
}

window.sendChat = function() {
    let input = document.getElementById("cinput"); let txt = input.value.trim(); if(!txt) return;
    let body = document.getElementById("cbody");
    body.innerHTML += `<div class="msg-user">${txt}</div>`; input.value = "";
    
    setTimeout(() => {
        let reply = "I'm sorry, I don't understand that. You can view your bookings in the Profile Dashboard, or email support@flyeasy.com for human assistance.";
        let low = txt.toLowerCase();
        if(low.includes("baggage") || low.includes("luggage") || low.includes("weight")) reply = "Passengers are allowed 15kg of checked baggage and 7kg of cabin baggage per ticket on FlyEasy.";
        else if(low.includes("cancel") || low.includes("refund")) reply = "Cancellations made 24 hours prior to departure are fully refundable. Visit 'My Bookings' on your profile to initiate.";
        else if(low.includes("book") || low.includes("ticket") || low.includes("flight")) reply = "You can book a ticket rapidly on our 'Home' or 'Booking' tabs!";
        else if(low.includes("hello") || low.includes("hi") || low.includes("hey")) reply = "Hi there! Looking for flight information or support policies?";
        
        body.innerHTML += `<div class="msg-bot">${reply}</div>`;
        body.scrollTop = body.scrollHeight;
    }, 600);
};

customElements.define('app-header', AppHeader);
customElements.define('app-footer', AppFooter);
customElements.define('support-bot', SupportBot);

function toggleMenu() {
    let nav = document.getElementById("mainNav");
    let auth = document.getElementById("authArea");
    if(nav) nav.classList.toggle("show");
    if(auth) auth.classList.toggle("show");
}

function authCheck() {
    let user = localStorage.getItem("userData") || localStorage.getItem("loggedUser");
    let authArea = document.getElementById("authArea");
    if (!authArea) return;

    if (user) {
        let userName = "";
        try {
            let parsed = JSON.parse(user);
            userName = parsed.name || user;
        } catch(e) {
            userName = user;
        }
        
        authArea.innerHTML =
            "<a href='profile.html' style='color:inherit;font-weight:bold;margin-right:15px;text-decoration:none;' title='My Profile'>" + userName + " 👤</a>" +
            "<button onclick='logout()' class='signup-btn' aria-label='Logout' style='cursor:pointer;'>Logout</button>";
    } else {
        authArea.innerHTML = `
            <a href="login.html" class="login-link">Login</a>
            <a href="signup.html" class="signup-btn">Sign Up</a>
        `;
    }
}

function logout() {
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("userData");
    showToast("Logged out successfully", "success");
    setTimeout(() => {
        window.location = "index.html";
    }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
    if (!document.getElementById("toastContainer")) {
        let tc = document.createElement("div");
        tc.id = "toastContainer";
        document.body.appendChild(tc);
    }
    
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }
});

window.showToast = function(message, type = 'error') {
    let container = document.getElementById('toastContainer');
    if(!container) return;
    let toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerText = message;
    container.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

window.toggleDarkMode = function() {
    document.body.classList.toggle('dark-mode');
    let isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    
    let btn = document.querySelector('.dark-mode-toggle');
    if(btn) btn.innerText = isDark ? "☀️" : "🌙";
}

window.formatPrice = function(priceINR) {
    let curr = localStorage.getItem("globalCurrency") || "INR";
    if(curr === "USD") return "$" + Math.round(priceINR / 83);
    if(curr === "EUR") return "€" + Math.round(priceINR / 90);
    return "₹" + priceINR;
};

window.setCurrency = function(code) {
    localStorage.setItem("globalCurrency", code);
    location.reload();
};

// --- Phase 6: i18n ---
window.setLanguage = function(code) {
    localStorage.setItem("globalLanguage", code);
    location.reload();
}

function translateApp() {
    let lang = localStorage.getItem("globalLanguage") || "EN";
    if(lang === "EN") return;

    const dict = {
        "Home": { "ES": "Inicio", "HI": "मुख्य पृष्ठ" },
        "Booking": { "ES": "Reservas", "HI": "बुकिंग" },
        "Confirmation": { "ES": "Confirmación", "HI": "पुष्टीकरण" },
        "Login": { "ES": "Acceso", "HI": "लॉग इन" },
        "Sign Up": { "ES": "Registrarse", "HI": "साइन अप" },
        "Logout": { "ES": "Cerrar sesión", "HI": "लॉग आउट" },
        "Search Flights": { "ES": "Buscar Vuelos", "HI": "उड़ानें खोजें" },
        "Flight Status": { "ES": "Estado del Vuelo", "HI": "उड़ान की स्थिति" },
        "Book Now": { "ES": "Reservar Ahora", "HI": "अभी बुक करें" },
        "Total Price": { "ES": "Precio Total", "HI": "कुल मूल्य" },
        "Pay Now": { "ES": "Pagar Ahora", "HI": "अब भुगतान करें" },
        "Print Pass": { "ES": "Imprimir Pase", "HI": "पास प्रिंट करें" }
    };

    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let n;
    while (n = walk.nextNode()) {
        let txt = n.nodeValue.trim();
        if (dict[txt] && dict[txt][lang]) {
            n.nodeValue = n.nodeValue.replace(txt, dict[txt][lang]);
        }
    }
}

// --- Execution Bindings ---
document.addEventListener("DOMContentLoaded", () => {
    // Load Translator
    setTimeout(translateApp, 100);
    
    // Inject Globals
    if(!document.querySelector('support-bot')) {
        document.body.appendChild(document.createElement('support-bot'));
    }
    
    if (!document.querySelector("link[rel='manifest']")) {
        let manifest = document.createElement("link");
        manifest.rel = "manifest";
        manifest.href = "manifest.json";
        document.head.appendChild(manifest);
    }
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW Reg failed:', err));
    });
}
