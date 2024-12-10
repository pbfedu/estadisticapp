document.getElementById('validate-license').addEventListener('click', () => {
    const license = document.getElementById('license').value.trim();
    const validLicenses = ['WORKSPHERE2024', '1234-5678-91011'];
  
    if (validLicenses.includes(license)) {
      document.cookie = "access_granted=true; path=/; max-age=31536000"; // Cookie para 1 año
      window.location.href = "theory/4.html";
    } else {
      showError("El codi introduït no és vàlid. Si tens dubtes, revisa el teu correu de confirmació de compra.");
    }
  });
  
  document.getElementById('validate-email').addEventListener('click', () => {
    const email = document.getElementById('email').value.trim();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(xtec.cat|edu.gva.es|bernatelferrer.cat|ibf.cat|.+edu\..+)$/;
  
    if (emailPattern.test(email)) {
      document.cookie = "access_granted_partial=true; path=/; max-age=2592000"; // Cookie para 1 mes
      window.location.href = "theory/4.html";
    } else {
      showError("El correu no pertany a un domini educatiu autoritzat, si es tracta d'un error contacta amb nosaltres.");
    }
  });
  
  function showError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = `❌ ${message}`;
    errorMessage.classList.remove('oculto');
  }
  
