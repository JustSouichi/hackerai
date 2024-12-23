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
            window.open(link, "_blank"); // Apre il link in una nuova scheda
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
            window.open(link, "_blank"); // Apre il link in una nuova scheda
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

// Funzione per mostrare il modal di conferma
function showCustomModal(link, callback) {
  const modalHtml = `
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300">
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full transform transition-all duration-500 ease-in-out scale-100 hover:scale-105">
        <div class="text-xl font-semibold text-red-600 mb-4 flex items-center">
          <span class="mr-2 text-3xl">⚠️</span>
          Security Alert
        </div>
        <p class="mb-4 text-gray-800">You're about to open this link:</p>
        <p class="mb-4 text-blue-600 break-all font-medium">${link}</p>
        <div class="flex justify-center gap-4">
          <button id="accept" class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-semibold transition-colors duration-300">
            Proceed
          </button>
          <button id="cancel" class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md font-semibold transition-colors duration-300">
            Cancel
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
