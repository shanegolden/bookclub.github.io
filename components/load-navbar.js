import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

export async function loadNavbar(activePage, isAdmin = false) {
  const navbarContainer = document.getElementById("navbar");
  if (!navbarContainer) return;

  try {
    const resp = await fetch("./components/navbar.html");
    if (!resp.ok) throw new Error(`Failed to fetch navbar.html: ${resp.status}`);
    const navbarHtml = await resp.text();
    navbarContainer.innerHTML = navbarHtml;
  } catch (err) {
    console.error(err);
    navbarContainer.innerHTML = "<p>Navbar failed to load</p>";
    return;
  }

  // Highlight active page
  const pageLinks = navbarContainer.querySelectorAll("#hamburgerMenu a");
  pageLinks.forEach(a => {
    if (a.textContent.trim() === activePage) a.classList.add("active");
  });

  // Update page title
  const pageTitleSpan = navbarContainer.querySelector("#pageTitle");
  if (pageTitleSpan) pageTitleSpan.textContent = activePage;

  // Hamburger menu toggle
  const hamburgerBtn = navbarContainer.querySelector("#hamburgerBtn");
  const hamburgerMenu = navbarContainer.querySelector("#hamburgerMenu");
  if (hamburgerBtn && hamburgerMenu) {
    hamburgerBtn.addEventListener("click", () => {
      hamburgerMenu.style.display = hamburgerMenu.style.display === "none" ? "flex" : "none";
    });
  }

  // Logout button click
  const logoutBtn = navbarContainer.querySelector("#logoutBtn");
  const adminLink = navbarContainer.querySelector("#adminNavItem");
  const auth = getAuth();

  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try {
        await signOut(auth);
        window.location.href = "./index.html";
      } catch (e) {
        console.error("Logout failed:", e);
      }
    });
  }

  // Show/hide logout button and admin link based on login state
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (logoutBtn) logoutBtn.style.display = "block";
      if (isAdmin && adminLink) adminLink.style.display = "block";
    } else {
      if (logoutBtn) logoutBtn.style.display = "none";
      if (adminLink) adminLink.style.display = "none";
    }
  });
}
