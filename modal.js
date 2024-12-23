// Carica dinamicamente il CDN di Tailwind CSS
(function loadTailwind() {
  const link = document.createElement("link");
  link.href = "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css";
  link.rel = "stylesheet";
  document.head.appendChild(link);
  console.log("Tailwind CSS loaded");
})();

function showCustomModal(link, callback) {
  const modalHtml = `
    <div id="hackerai-modal" class="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl shadow-lg p-6 w-11/12 max-w-lg">
        <!-- Icon and Title -->
        <div class="flex items-center mb-4">
          <div class="bg-red-100 text-red-500 rounded-full p-3">
            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.29 3.86l1.42-.73a1 1 0 011.58.81v14.12a1 1 0 01-1.58.81l-1.42-.73m-6.58-.42h13.38M9 16h.01M9 12h.01m0-4h.01" />
            </svg>
          </div>
          <h2 class="text-lg font-semibold text-gray-800 ml-3">Security Alert</h2>
        </div>

        <!-- Message -->
        <p class="text-sm text-gray-600 mb-4">
          You are about to open the following link. Make sure it's safe before proceeding:
        </p>
        <p class="text-sm text-blue-600 font-medium bg-gray-100 p-2 rounded mb-6 break-all">
          ${link}
        </p>

        <!-- Action Buttons -->
        <div class="flex justify-end space-x-3">
          <button id="hackerai-cancel" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition">
            Cancel
          </button>
          <button id="hackerai-accept" class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition">
            Proceed
          </button>
        </div>
      </div>
    </div>
  `;

  const modal = document.createElement("div");
  modal.innerHTML = modalHtml;
  document.body.appendChild(modal);

  // Eventi sui bottoni
  document.getElementById("hackerai-accept").onclick = () => {
    callback(true);
    modal.remove();
  };

  document.getElementById("hackerai-cancel").onclick = () => {
    callback(false);
    modal.remove();
  };
}
