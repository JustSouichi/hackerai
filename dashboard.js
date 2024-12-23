document.addEventListener("DOMContentLoaded", () => {
  updateLogTable();

  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "updateLogs" && message.logs) {
      populateLogTable(message.logs);
    }
  });
});

function updateLogTable() {
  chrome.storage.local.get({ logs: [] }, (data) => {
    populateLogTable(data.logs);
  });
}

function populateLogTable(logs) {
  const tableBody = document.getElementById("log-table");
  tableBody.innerHTML = "";

  logs.forEach((log) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="border border-gray-300 px-4 py-2">${log.date}</td>
      <td class="border border-gray-300 px-4 py-2">${log.time}</td>
      <td class="border border-gray-300 px-4 py-2 text-blue-500 underline break-all">
        <a href="${log.link}" target="_blank">${log.link}</a>
      </td>
      <td class="border border-gray-300 px-4 py-2">
        ${log.status === "Opened" ? "✅ Opened" : "❌ Cancelled"}
      </td>
    `;
    tableBody.appendChild(row);
  });
}
