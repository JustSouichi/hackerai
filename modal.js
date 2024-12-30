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
    <div id="hackerai-modal" class="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl shadow-lg p-8 w-10/12 max-w-lg transform transition-all duration-300">
        <!-- Header -->
        <div class="flex items-center mb-6">
          <div class="bg-blue-100 text-blue-500 rounded-full p-3 flex items-center justify-center">
            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M3 10h1m3-3h2m4 0h2m4 0h1m-3 3h2m-6 0h.01m-7 0h.01m3 3h.01m4 0h.01m4 0h.01m-4 3h.01m-7 0h.01m3-6h2m4 0h2m3 0h1m-7 9h.01M3 17h1m4-3h2m4 0h2m4 0h1m-3 3h2m-6 0h.01" />
            </svg>
          </div>
          <div class="ml-3">
            <h2 class="text-lg font-bold text-gray-800">Security Alert</h2>
            <p class="text-xs text-gray-500">Powered by HackerAI Extension</p>
          </div>
        </div>

        <!-- Message -->
        <div class="mb-6">
          <p class="text-sm text-gray-600">
            You're about to open the following link. Please make sure you trust the source before proceeding:
          </p>
          <p class="text-sm text-blue-600 font-medium bg-gray-100 p-3 rounded mt-4 break-all">
            ${link}
          </p>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end space-x-3">
          <button id="hackerai-cancel" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-all">
            Cancel
          </button>
          <button id="hackerai-accept" class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all">
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