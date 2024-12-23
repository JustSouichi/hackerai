document.body.addEventListener("click", function (event) {
  let target = event.target;

  while (target && target !== document.body) {
    if (target.tagName === "A" && target.href) {
      event.preventDefault();
      const link = target.href;

      showCustomModal(link, (confirmed) => {
        if (confirmed) {
          window.open(link, "_blank");
        }
        saveLog(link, confirmed ? "Opened" : "Cancelled");
      });
      return;
    }
    target = target.parentElement;
  }
});

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
    logs.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateB - dateA;
    });

    chrome.storage.local.set({ logs }, () => {
      chrome.runtime.sendMessage({ action: "updateLogs", logs });
    });
  });
}
