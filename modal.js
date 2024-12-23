function showCustomModal(link, callback) {
  // Carica Tailwind CSS
  const linkElement = document.createElement("link");
  linkElement.href = "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css";
  linkElement.rel = "stylesheet";
  document.head.appendChild(linkElement);

  // Crea l'HTML del modale
  const modalHtml = `
    <div id="hackerai-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
        <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center">
          <span class="text-red-500 text-2xl mr-2">🚨</span> Security Check
        </h2>
        <p class="text-gray-600 text-sm mb-4">Do you really want to open this link?</p>
        <p class="text-blue-500 font-medium break-words mb-6">${link}</p>
        <div class="flex space-x-4">
          <button id="hackerai-accept" class="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded">
            Yes
          </button>
          <button id="hackerai-cancel" class="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded">
            No
          </button>
        </div>
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
