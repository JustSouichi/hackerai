document.addEventListener(
  'click',
  function (event) {
   
    if (
      event.target.closest('.custom-alert') ||
      event.target.classList.contains('custom-overlay')
    ) {
      return;
    }


    if (event.target.dataset.confirmed === 'true') {

      event.target.dataset.confirmed = 'false';
      return;
    }

   
    const style = window.getComputedStyle(event.target);
    if (style.cursor === 'pointer') {
      
      event.preventDefault();
      event.stopPropagation();

     
      let link = '';
      const anchor = event.target.closest('a');
      if (anchor && anchor.href) {
        link = anchor.href;
      }

      
      if (link.startsWith('http://')) {
        showCustomConfirm(() => {
          
          event.target.dataset.confirmed = 'true';

          
          const newEvent = new MouseEvent(event.type, event);
          event.target.dispatchEvent(newEvent);
        }, link);
      } else {
       
        window.location.href = link;
      }
    }
  },
  true
);

function showCustomConfirm(onConfirm, link) {
  const overlay = document.createElement('div');
  overlay.classList.add('custom-overlay');


  const alertBox = document.createElement('div');
  alertBox.classList.add('custom-alert');

 
  const message = link
    ? `Are you sure you want to open this link?<br><small>${link}</small>`
    : 'Are you sure you want to proceed?';


  alertBox.innerHTML = `
    <div class="hackerai-overlay">
<div class="hackerai-modal">
  <div class="hackerai-header">
    <div class="hackerai-icon-wrapper">
      <span class="hackerai-icon">⚠️</span>
    </div>
    <h2 class="hackerai-title">Security Alert</h2>
  </div>
  <p class="hackerai-subtitle">You are about to access the following link:</p>
  <p class="hackerai-link">${message}</p>
  <p class="hackerai-powered">
    Powered by <span>HackerAI</span>
  </p>
  <div class="hackerai-footer">
    <button id="cancel" class="hackerai-button">Cancel</button>
    <button id="accept" class="hackerai-button">Proceed</button>
  </div>
</div>
</div>

  `;


  document.body.appendChild(overlay);
  document.body.appendChild(alertBox);


  document.getElementById('accept').addEventListener('click', () => {
    closeCustomConfirm(overlay, alertBox);
    onConfirm();
  });


  document.getElementById('cancel').addEventListener('click', () => {
    closeCustomConfirm(overlay, alertBox);
    
  });
}


function closeCustomConfirm(overlay, alertBox) {
  if (overlay && overlay.parentNode) {
    overlay.parentNode.removeChild(overlay);
  }
  if (alertBox && alertBox.parentNode) {
    alertBox.parentNode.removeChild(alertBox);
  }
}
