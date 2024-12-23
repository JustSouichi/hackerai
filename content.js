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
        window.open(link, "_blank"); // Apre il link in una nuova scheda
        return;
      }

      // Caso 4: Altri link (apertura diretta senza alert)
      saveLog(link, status, clicked); // Registra il clic diretto
      window.open(link, "_blank");
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
