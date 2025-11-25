export function loadNavbar(activePage, isAdmin = false) {
  const navbarContainer = document.getElementById("navbarContainer") || document.getElementById("navbar");
  if (!navbarContainer) return;

  const pages = ["Home", "Dashboard", "Charter"];
  if (isAdmin) pages.push("Admin");

  const pageLinks = pages.map(page => {
    const activeClass = page === activePage ? "active" : "";
    return `<a href="/${page.toLowerCase()}" class="${activeClass}">${page}</a>`;
  }).join("");

  navbarContainer.innerHTML = `
    <header>
      <div class="navbar-left">
        <button id="hamburgerBtn">☰</button>
        <span id="logo">📚</span>
        <span id="activePageName">${activePage}</span>
      </div>
      <div class="navbar-right">
        <button id="logoutBtn">Logout</button>
      </div>
    </header>
    <nav id="hamburgerMenu">
      ${pageLinks}
    </nav>
  `;

  document.getElementById("hamburgerBtn").addEventListener("click", () => {
    const menu = document.getElementById("hamburgerMenu");
    menu.style.display = menu.style.display === "none" ? "block" : "none";
  });

  document.getElementById("logoutBtn").addEventListener("click", async () => {
    try { await signOut(auth); window.location.href = "/login"; }
    catch(e){ console.error(e); }
  });
}
