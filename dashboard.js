document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("log-table");

  chrome.storage.local.get({ logs: [] }, (data) => {
    const logs = data.logs || [];
    logs.forEach((log) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="border border-gray-300 px-4 py-2">${log.date}</td>
        <td class="border border-gray-300 px-4 py-2">${log.time}</td>
        <td class="border border-gray-300 px-4 py-2">${log.link}</td>
        <td class="border border-gray-300 px-4 py-2">${log.status}</td>
      `;
      tableBody.appendChild(row);
    });
  });
});
