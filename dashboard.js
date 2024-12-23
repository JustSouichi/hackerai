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

function populateLogTable(logs) {
  const tableBody = document.getElementById("log-table");
  tableBody.innerHTML = ""; // Pulisce la tabella

  logs.forEach((log, index) => {
    // Se il link è https e non è un link email, setta automaticamente lo status come "Opened"
    if (log.link.startsWith("https://") && !log.link.includes("mailto:")) {
      log.status = "Opened"; // Impostiamo lo status a "Opened"
    }

    const row = document.createElement("tr");

    row.classList.add("hover:bg-gray-100", "transition-all", "duration-200"); // Aggiungi effetto hover

    row.innerHTML = `
      <td class="py-3 px-4">${log.date}</td>
      <td class="py-3 px-4">${log.time}</td>
      <td class="py-3 px-4 text-blue-600 break-all">
        <a href="${log.link}" target="_blank" data-index="${index}" class="underline">${log.link}</a>
      </td>
      <td class="py-3 px-4 text-center">
        ${log.clicked ? "✅ True" : "❌ False"}
      </td>
      <td class="py-3 px-4 text-center ${log.status === 'Opened' ? 'text-green-500' : 'text-red-500'}">
        ${log.status === 'Opened' ? "✔️ Opened" : "❌ Cancelled"}
      </td>
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
      logs[index].status = 'Opened'; // Impostiamo lo status come "Opened" quando il link è cliccato
      chrome.storage.local.set({ logs }, () => {
        updateLogTable(); // Aggiorna la tabella
      });
    }
  });
}
