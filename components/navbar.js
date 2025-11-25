// /js/navbar.js
export function loadNavbar(activePage, isAdmin = false) {
  const navbarContainer = document.getElementById("navbarContainer");
  if (!navbarContainer) return;

  const pages = ["Home", "Dashboard", "Charter"];
  if (isAdmin) pages.push("Admin");

  const pageLinks = pages.map(page => {
    const activeClass = page === activePage ? "active" : "";
    return `<a href="/${page.toLowerCase()}" class="${activeClass}">${page}</a>`;
  }).join("");

  navbarContainer.innerHTML = `
    <header style="display:flex; justify-content:space-between; align-items:center; padding:1rem; background:#1e1e2f; color:white;">
      <div style="display:flex; align-items:center; gap:1rem;">
        <button id="hamburgerBtn" style="font-size:1.2rem;">☰</button>
        <span style="font-size:1.5rem;">📚</span>
        <span id="activePageName">${activePage}</span>
      </div>
      <button id="logoutBtn" style="background:#e94b3c;color:white;padding:0.5rem 1rem;border:none;border-radius:5px;cursor:pointer;">Logout</button>
    </header>

    <nav id="hamburgerMenu" style="display:none; background:#2b2b3f; padding:1rem;">
      ${pageLinks}
    </nav>
  `;

  // Hamburger toggle
  document.getElementById("hamburgerBtn").addEventListener("click", () => {
    const menu = document.getElementById("hamburgerMenu");
    menu.style.display = menu.style.display === "none" ? "block" : "none";
  });

  // Logout button
  document.getElementById("logoutBtn").addEventListener("click", () => {
    window.location.href = "/login"; // or call Firebase signOut here if needed
  });
}
