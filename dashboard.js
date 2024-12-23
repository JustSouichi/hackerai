document.addEventListener("DOMContentLoaded", () => {
  updateLogTable();

  // Ascolta i messaggi inviati da content.js
  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "updateLogs" && message.logs) {
      populateLogTable(message.logs);
    }
  });
});

// Funzione per aggiornare la tabella
function updateLogTable() {
  chrome.storage.local.get({ logs: [] }, (data) => {
    populateLogTable(data.logs);
  });
}

// Funzione per popolare la tabella
function populateLogTable(logs) {
  const tableBody = document.getElementById("log-table");
  tableBody.innerHTML = ""; // Pulisce la tabella

  logs.forEach(async (log, index) => {
    const row = document.createElement("tr");

    // Controlla se il link è segnalato
    const reported = await checkLinkForSpam(log.link);

    row.innerHTML = `
      <td class="border border-gray-300 px-4 py-2">${log.date}</td>
      <td class="border border-gray-300 px-4 py-2">${log.time}</td>
      <td class="border border-gray-300 px-4 py-2 text-blue-500 underline break-all">
        <a href="${log.link}" target="_blank" data-index="${index}" class="link-click">${log.link}</a>
      </td>
      <td class="border border-gray-300 px-4 py-2 text-center">
        ${log.clicked ? "✅ True" : "❌ False"}
      </td>
      <td class="border border-gray-300 px-4 py-2 text-center">
        ${reported ? "⚠️ Reported" : "✔️ Safe"}
      </td>
      <td class="border border-gray-300 px-4 py-2">${log.status}</td>
    `;
    tableBody.appendChild(row);
  });

  // Aggiungi evento click ai link
  document.querySelectorAll(".link-click").forEach((linkElement) => {
    linkElement.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      markLinkAsClicked(index);
    });
  });
}

// Funzione per marcare un link come cliccato
function markLinkAsClicked(index) {
  chrome.storage.local.get({ logs: [] }, (data) => {
    const logs = data.logs || [];
    if (logs[index]) {
      logs[index].clicked = true; // Segna il link come cliccato
      chrome.storage.local.set({ logs }, () => {
        updateLogTable(); // Aggiorna la tabella
      });
    }
  });
}

// Funzione per controllare se il link è segnalato
async function checkLinkForSpam(link) {
  // Simulazione di verifica: sostituire con un'API reale
  const flaggedLinks = ["http://example.com", "http://spam.com"];
  return flaggedLinks.includes(link);
}
