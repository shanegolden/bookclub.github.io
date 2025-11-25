import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

export async function loadNavbar(activePage, isAdmin = false) {
  const navbarContainer = document.getElementById("navbar");
  if (!navbarContainer) return;

  // Fetch navbar HTML
  const resp = await fetch("/components/navbar.html");
  const navbarHtml = await resp.text();
  navbarContainer.innerHTML = navbarHtml;

  // Highlight active page
  const pageLinks = navbarContainer.querySelectorAll("#hamburgerMenu a");
  pageLinks.forEach(a => {
    if(a.textContent.trim() === activePage) a.classList.add("active");
  });

  // Show admin link if needed
  if(isAdmin) {
    const adminLink = navbarContainer.querySelector("#adminNavItem");
    if(adminLink) adminLink.style.display = "block";
  }

  // Update page title
  const pageTitleSpan = navbarContainer.querySelector("#pageTitle");
  if(pageTitleSpan) pageTitleSpan.textContent = activePage;

  // Hamburger toggle
  const hamburgerBtn = navbarContainer.querySelector("#hamburgerBtn");
  const hamburgerMenu = navbarContainer.querySelector("#hamburgerMenu");
  hamburgerBtn.addEventListener("click", () => {
    hamburgerMenu.style.display = hamburgerMenu.style.display === "none" ? "flex" : "none";
  });

  // Logout button
  const logoutBtn = navbarContainer.querySelector("#logoutBtn");
  if(logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try {
        const auth = getAuth();
        await signOut(auth);
        window.location.href = "/login.html";
      } catch (e) {
        console.error("Logout failed:", e);
      }
    });
  }
}
