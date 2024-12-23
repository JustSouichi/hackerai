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

// Aggiungi un listener per i click sui link
document.body.addEventListener("click", function (event) {
  let target = event.target;

  while (target && target !== document.body) {
    if (target.tagName === "A" && target.href) {
      event.preventDefault(); // Blocca il comportamento predefinito
      const link = target.href;

      // Registra il link cliccato in ogni caso
      let status = "Direct Opened";

      // Caso 1: Link HTTP (alert sempre richiesto)
      if (link.startsWith("http:")) {
        showCustomModal(link, (confirmed) => {
          status = confirmed ? "Opened" : "Cancelled";
          saveLog(link, status);
          if (confirmed) {
            window.open(link, "_blank"); // Apre il link in una nuova scheda
          }
        });
        return;
      }

      // Caso 2: Link HTTPS (alert solo su siti email)
      if (link.startsWith("https:") && isEmailDomain()) {
        showCustomModal(link, (confirmed) => {
          status = confirmed ? "Opened" : "Cancelled";
          saveLog(link, status);
          if (confirmed) {
            window.open(link, "_blank"); // Apre il link in una nuova scheda
          }
        });
        return;
      }

      // Caso 3: Altri link (apertura diretta senza alert)
      saveLog(link, status); // Registra il clic diretto
      window.open(link, "_blank");
      return;
    }
    target = target.parentElement;
  }
});

// Funzione per salvare i log
function saveLog(link, status) {
  const now = new Date();
  const logEntry = {
    link,
    date: now.toISOString().split("T")[0],
    time: now.toTimeString().split(" ")[0],
    status
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
