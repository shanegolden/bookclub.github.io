// load-navbar.js
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

export async function loadNavbar(activePage, isAdmin = false) {
  const navbarContainer = document.getElementById("navbar");
  if (!navbarContainer) return;

  // Fetch navbar.html
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

  // Show admin link if needed
  if (isAdmin) {
    const adminLink = navbarContainer.querySelector("#adminNavItem");
    if (adminLink) adminLink.style.display = "block";
  }

  // Update page title in navbar
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

  const auth = getAuth();

  // --- Logout / Log In logic ---
  const logoutBtn = navbarContainer.querySelector("#logoutBtn");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User logged in
      if (logoutBtn) logoutBtn.style.display = "block";

      // Remove any previous login button if it exists
      const existingLoginBtn = navbarContainer.querySelector("#loginBtn");
      if (existingLoginBtn) existingLoginBtn.remove();
    } else {
      // User not logged in
      if (logoutBtn) logoutBtn.style.display = "none";

      // Only show "Log In" button on index.html
      if (window.location.pathname.endsWith("/index.html") || window.location.pathname === "/") {
        let loginBtn = navbarContainer.querySelector("#loginBtn");
        if (!loginBtn) {
          loginBtn = document.createElement("button");
          loginBtn.id = "loginBtn";
          loginBtn.textContent = "Log In";
          loginBtn.className = "btn logout-btn"; // can reuse logout styling
          navbarContainer.querySelector(".navbar-left").appendChild(loginBtn);

          loginBtn.addEventListener("click", () => {
            window.location.href = "./login.html";
          });
        }
      }
    }
  });

  // Logout click
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try {
        await signOut(auth);
        window.location.href = "./login.html";
      } catch (e) {
        console.error("Logout failed:", e);
      }
    });
  }
}
