// Lista dei principali siti di email
const emailDomains = [
  "mail.google.com", // Gmail
  "outlook.live.com", // Outlook
  "mail.yahoo.com", // Yahoo Mail
  "mail.aol.com", // AOL Mail
  "icloud.com", // iCloud Mail
  "zoho.com", // Zoho Mail
  "protonmail.com", // ProtonMail
  "gmx.com", // GMX Mail
  "mail.com", // Mail.com
];

// Funzione per verificare se il tab corrente appartiene a un dominio email
function isEmailDomain() {
  const hostname = window.location.hostname;
  return emailDomains.some((domain) => hostname.includes(domain));
}

// Funzione per estrarre il link effettivo dal parametro "q" di Google
function extractRealLink(url) {
  const urlParams = new URLSearchParams(new URL(url).search);
  return urlParams.get('q');
}

// Funzione per mostrare il modal di conferma
function showCustomModal(link, callback) {
  // Inietta il CDN di Tailwind CSS nel caso non sia stato ancora aggiunto
  const tailwindCDN = document.querySelector('link[href="https://cdn.tailwindcss.com"]');
  if (!tailwindCDN) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.tailwindcss.com';
    document.head.appendChild(link);
  }

  const modalHtml = `
<div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-95 z-50">
  <div class="bg-white p-10 rounded-xl shadow-xl max-w-lg w-full transform transition-transform duration-300 ease-in-out">
    <div class="flex flex-col items-center mb-8">
      <div class="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
        <span class="text-4xl text-red-600">⚠️</span>
      </div>
      <h2 class="text-xl font-bold text-gray-900 text-center">Security Alert</h2>
    </div>
    <p class="text-gray-700 text-center text-sm mb-6">You are about to access the following link:</p>
    <p class="text-blue-600 font-medium text-center bg-gray-50 border border-blue-200 p-3 rounded-lg shadow-sm break-words">https://example.com</p>
    <p class="text-gray-500 text-xs text-center mt-6">Powered by <span class="font-semibold text-gray-700">HackerAI</span></p>
    <div class="flex justify-between items-center mt-8 gap-4">
      <button id="cancel" class="flex-1 px-5 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
        Cancel
      </button>
      <button id="accept" class="flex-1 px-5 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
        Proceed
      </button>
    </div>
  </div>
</div>




  `;
  
  const modal = document.createElement("div");
  modal.innerHTML = modalHtml;
  document.body.appendChild(modal);

  // Gestisci il clic sul tasto "Proceed"
  document.getElementById("accept").addEventListener("click", () => {
    callback(true); // Link confermato, apri in nuovo tab
    modal.remove(); // Rimuovi il modal
  });

  // Gestisci il clic sul tasto "Cancel"
  document.getElementById("cancel").addEventListener("click", () => {
    callback(false); // Link non confermato, non aprire il link
    modal.remove(); // Rimuovi il modal
  });
}

// Ascolta i clic sui link
document.body.addEventListener("click", function (event) {
  let target = event.target;

  while (target && target !== document.body) {
    if (target.tagName === "A" && target.href) {
      event.preventDefault(); // Blocca il comportamento predefinito
      let link = target.href;

      // Estrai il link effettivo se è un link di reindirizzamento (ad esempio da Gmail)
      if (link.includes("https://www.google.com/url?q=")) {
        link = extractRealLink(link);
      }

      // Imposta il valore di "clicked" per i link HTTPS come True di default solo se non sono da email
      let status = "Direct Opened";
      let clicked = false;

      // Caso 1: Link HTTP (alert sempre richiesto)
      if (link.startsWith("http:")) {
        showCustomModal(link, (confirmed) => {
          status = confirmed ? "Opened" : "Cancelled";
          saveLog(link, status, confirmed); // Salva anche lo stato di apertura
          if (confirmed) {
            window.location.href = link; // Apre il link nella stessa finestra
          }
        });
        return;
      }

      // Caso 2: Link HTTPS da email (mostra l'alert)
      else if (link.startsWith("https:") && isEmailDomain()) {
        showCustomModal(link, (confirmed) => {
          status = confirmed ? "Opened" : "Cancelled";
          saveLog(link, status, confirmed); // Salva anche lo stato di apertura
          if (confirmed) {
            window.location.href = link; // Apre il link nella stessa finestra
          }
        });
        return;
      }

      // Caso 3: Link HTTPS (cliccato di default senza alert se non da email)
      else if (link.startsWith("https:")) {
        clicked = true; // Segna come cliccato di default
        saveLog(link, status, clicked); // Salva come cliccato senza bisogno di conferma
        window.location.href = link; // Apre il link nella stessa finestra
        return;
      }

      // Caso 4: Altri link (apertura diretta senza alert)
      saveLog(link, status, clicked); // Registra il clic diretto
      window.location.href = link; // Apre il link nella stessa finestra
      return;
    }
    target = target.parentElement;
  }
});

// Funzione per salvare i log
function saveLog(link, status, clicked) {
  const now = new Date();
  const logEntry = {
    link,
    date: now.toISOString().split("T")[0],
    time: now.toTimeString().split(" ")[0],
    status,
    clicked, // Imposta il campo clicked
  };

  chrome.storage.local.get({ logs: [] }, (data) => {
    const logs = data.logs || [];
    logs.push(logEntry);

    // Ordina i log per data e ora (il più recente per primo)
    logs.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateB - dateA;
    });

    // Salva i log aggiornati
    chrome.storage.local.set({ logs }, () => {
      chrome.runtime.sendMessage({ action: "updateLogs", logs });
    });
  });
}
