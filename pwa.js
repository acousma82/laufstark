(() => {
  const status = document.getElementById('offlineState');
  if (!('serviceWorker' in navigator) || !window.isSecureContext) {
    status.textContent = 'Offline-Modus benötigt HTTPS (lokal: localhost).';
    return;
  }
  navigator.serviceWorker.register('./sw.js', {scope: './', updateViaCache: 'none'})
    .then(async registration => {
      await navigator.serviceWorker.ready;
      status.textContent = 'Offline bereit · Videos benötigen Internet.';
      const showUpdate = () => {status.textContent = 'Update bereit · alle App-Fenster schließen und erneut öffnen.';};
      if (registration.waiting) showUpdate();
      registration.addEventListener('updatefound', () => {
        const worker = registration.installing;
        if (worker) worker.addEventListener('statechange', () => {
          if (worker.state === 'installed' && navigator.serviceWorker.controller) showUpdate();
        });
      });
    })
    .catch(() => {status.textContent = 'Offline-Speicherung fehlgeschlagen. Bitte mit Internet erneut öffnen.';});
})();
