/******************************************************
 * 1) Imposta variabile tmp PRIMA di creare l'EventListener
 ******************************************************/
const currentDomain = window.location.hostname;  // Esempio: "www.miodominio.com"
let tmp = false;

// Se il dominio corrente include "miodominio.com", saltiamo la logica di conferma
if (currentDomain.includes('miodominio.com')) {
  tmp = true;
  console.log('[HackerAI] Stesso dominio, disabilito i controlli (tmp = true)');
} else {
  console.log('[HackerAI] Dominio diverso, controlli attivi (tmp = false)');
}

/******************************************************
 * 2) Se tmp è FALSE, aggancio l'EventListener
 ******************************************************/
if (!tmp) {
  document.addEventListener(
    'click',
    function (event) {
      // a) Ignora i click all'interno del popup
      if (
        event.target.closest('.hackerai-modal') ||
        event.target.classList.contains('hackerai-overlay')
      ) {
        return;
      }

      // b) Verifica se l'elemento cliccato è un link o un elemento interattivo
      const anchor = event.target.closest('a'); // Recupera il link <a>
      if (!anchor || !anchor.href) {
        // Se non è un link, lascia che il click funzioni normalmente
        return;
      }

      // c) Blocca il comportamento predefinito solo per i link
      event.preventDefault();
      event.stopPropagation();

      const link = anchor.href;

      // d) Se il link inizia con http:// => mostra popup di conferma
      if (link.startsWith('http://')) {
        showHackerAiConfirm(() => {
          // Se l'utente conferma, apri il link
          window.location.href = link;
        }, link);
      } else {
        // Altrimenti, apri direttamente
        window.location.href = link;
      }
    },
    true
  );
} else {
  // Se tmp === true, NON aggancia l'ascoltatore
  console.log('[HackerAI] EventListener DISABILITATO');
}

/******************************************************
 * 3) Mostra la finestra di conferma HackerAI (popup)
 ******************************************************/
function showHackerAiConfirm(onConfirm, link) {
  // Crea overlay
  const overlay = document.createElement('div');
  overlay.classList.add('hackerai-overlay');

  // Componi l'HTML del popup
  const modalHtml = `
    <div class="hackerai-modal">
      <div class="hackerai-header">
        <div class="hackerai-icon-wrapper">
          <span class="hackerai-icon">⚠️</span>
        </div>
        <h2 class="hackerai-title">Security Alert</h2>
      </div>
      <p class="hackerai-subtitle">You are about to access the following link:</p>
      <p class="hackerai-link"><small>${link}</small></p>
      <p class="hackerai-powered">Powered by <span>HackerAI</span></p>
      <div class="hackerai-footer">
        <button id="cancel" class="hackerai-button">Cancel</button>
        <button id="accept" class="hackerai-button">Proceed</button>
      </div>
    </div>
  `;

  overlay.innerHTML = modalHtml;
  document.body.appendChild(overlay);

  // Bottoni
  const acceptBtn = document.getElementById('accept');
  const cancelBtn = document.getElementById('cancel');

  // Se l'utente clicca "Proceed"
  acceptBtn.addEventListener('click', () => {
    closeHackerAiConfirm(overlay);
    onConfirm();
  });

  // Se l'utente clicca "Cancel"
  cancelBtn.addEventListener('click', () => {
    closeHackerAiConfirm(overlay);
  });
}

/******************************************************
 * 4) Funzione di chiusura popup
 ******************************************************/
function closeHackerAiConfirm(overlay) {
  if (overlay && overlay.parentNode) {
    overlay.parentNode.removeChild(overlay);
  }
}
