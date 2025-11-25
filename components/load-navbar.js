export async function loadNavbar(activePage, isAdmin = false) {
  const navbarContainer = document.getElementById("navbarContainer");
  if (!navbarContainer) return;

  // Fetch the navbar.html content
  const res = await fetch('/navbar.html');
  navbarContainer.innerHTML = await res.text();

  // Update the active page
  const pageTitle = document.getElementById("pageTitle") || document.getElementById("activePageName");
  if (pageTitle) pageTitle.textContent = activePage;

  // Show admin nav item if needed
  if (isAdmin) {
    const adminNavItem = document.getElementById("adminNavItem");
    if (adminNavItem) adminNavItem.style.display = 'block';
  }

  // Hamburger toggle
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const hamburgerMenu = document.getElementById("hamburgerMenu");
  if (hamburgerBtn && hamburgerMenu) {
    hamburgerBtn.addEventListener("click", () => {
      hamburgerMenu.style.display = hamburgerMenu.style.display === "block" ? "none" : "block";
    });
  }

  // Logout button
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn && window.auth) {
    logoutBtn.addEventListener("click", async () => {
      try { await signOut(auth); window.location.href = "/login"; }
      catch(e){ console.error(e); }
    });
  }
}
