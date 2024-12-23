document.body.addEventListener("click", function (event) {
  let target = event.target;

  // Trova il link cliccato
  while (target && target !== document.body) {
    if (target.tagName === "A" && target.href) {
      event.preventDefault(); // Blocca il comportamento predefinito
      const link = target.href;

      // Mostra il modale
      showCustomModal(link, (confirmed) => {
        if (confirmed) {
          // Apre il link in una nuova scheda
          window.open(link, "_blank");
        }

        // Salva il log
        saveLog(link, confirmed ? "Opened" : "Cancelled");
      });
      return;
    }
    target = target.parentElement;
  }
});

// Salva i log in `chrome.storage.local`
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
    chrome.storage.local.set({ logs }, () => {
      console.log("Log saved:", logEntry);
    });
  });
}
