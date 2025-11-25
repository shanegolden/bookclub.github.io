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
    <header style="display:flex; align-items:center; justify-content:space-between; background:#1e1e2f; color:white; padding:0.5rem 1rem;">
      <div style="display:flex; align-items:center; gap:0.5rem;">
        <button id="hamburgerBtn" style="font-size:1.2rem; background:none; border:none; color:white; cursor:pointer;">☰</button>
        <img src="https://via.placeholder.com/40x40?text=📚" alt="Book Icon" style="width:40px; height:40px; object-fit:cover;">
        <span id="activePageName" style="font-size:1.2rem;">${activePage}</span>
      </div>
      <div>
        <button id="logoutBtn" style="background:#e94b3c; color:white; border:none; padding:0.3rem 0.6rem; border-radius:5px; cursor:pointer;">Logout</button>
      </div>
    </header>
    <nav id="hamburgerMenu" style="display:none; background:#2b2b3f; padding:1rem;">
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
