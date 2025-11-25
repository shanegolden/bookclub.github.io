export function loadNavbar(activePage, isAdmin = false) {
  // Set page title
  const pageTitle = document.getElementById("pageTitle");
  if (pageTitle) pageTitle.textContent = activePage;

  // Show/hide Admin menu item
  const adminNavItem = document.getElementById("adminNavItem");
  if (adminNavItem) adminNavItem.style.display = isAdmin ? "block" : "none";

  // Highlight active menu link
  const links = document.querySelectorAll("#hamburgerMenu a");
  links.forEach(link => {
    link.classList.toggle("active", link.textContent === activePage);
  });

  // Hamburger toggle
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const hamburgerMenu = document.getElementById("hamburgerMenu");
  if (hamburgerBtn && hamburgerMenu) {
    hamburgerBtn.addEventListener("click", () => {
      hamburgerMenu.classList.toggle("show");
    });
  }

  // Logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try {
        await signOut(auth);
        window.location.href = "/login";
      } catch (e) {
        console.error(e);
      }
    });
  }
}
