async function checkLinkForSpam(link) {
    const url = `https://checkurl.phishtank.com/checkurl/`;
  
    try {
      const response = await fetch(`${url}?format=json&url=${encodeURIComponent(link)}`, {
        method: "GET"
      });
  
      const data = await response.json();
  
      // Controlla se l'URL è segnalato come phishing
      return data.results.in_database && data.results.valid;
    } catch (error) {
      console.error("Errore durante il controllo del link:", error);
      return false;
    }
  }
  
  export { checkLinkForSpam };
  