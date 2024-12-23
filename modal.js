function showCustomModal(link, callback) {
  // Crea l'HTML del modale
  const modalHtml = `
    <div id="hackerai-modal" style="position: fixed; inset: 0; background: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; z-index: 10000;">
      <div style="background: white; padding: 20px; border-radius: 8px; width: 300px; text-align: center;">
        <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 15px;">🚨 Security Check</h2>
        <p style="margin-bottom: 15px;">Do you really want to open this link?</p>
        <p style="word-break: break-word; color: blue; font-weight: bold; margin-bottom: 20px;">${link}</p>
        <button id="hackerai-accept" style="margin-right: 10px; padding: 8px 15px; background: green; color: white; border: none; border-radius: 4px; cursor: pointer;">Yes</button>
        <button id="hackerai-cancel" style="padding: 8px 15px; background: red; color: white; border: none; border-radius: 4px; cursor: pointer;">No</button>
      </div>
    </div>
  `;

  // Aggiungi il modale al DOM
  const modal = document.createElement("div");
  modal.innerHTML = modalHtml;
  document.body.appendChild(modal);

  // Eventi per i bottoni
  document.getElementById("hackerai-accept").onclick = () => {
    callback(true);
    modal.remove();
  };

  document.getElementById("hackerai-cancel").onclick = () => {
    callback(false);
    modal.remove();
  };
}
