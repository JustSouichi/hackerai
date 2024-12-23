document.body.addEventListener('click', function (event) {
    // Identify the clicked element
    let target = event.target;

    // Look for the closest link (handles buttons, divs, etc.)
    while (target && target !== document.body) {
      if (target.tagName === 'A' && target.href) {
        // Standard HTML link (<a>)
        event.preventDefault();
        const confirmed = confirm(`Do you really want to open this link?\n${target.href}`);
        if (confirmed) {
          window.location.href = target.href;
        }
        return;
      } else if (target.getAttribute && target.getAttribute('data-link')) {
        // Custom link (e.g., <div data-link="url">)
        event.preventDefault();
        const link = target.getAttribute('data-link');
        const confirmed = confirm(`Do you really want to open this link?\n${link}`);
        if (confirmed) {
          window.location.href = link;
        }
        return;
      }
      target = target.parentElement;
    }
});
