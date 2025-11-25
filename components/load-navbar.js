// load-navbar.js
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

export async function loadNavbar(activePage, isAdmin = false) {
  const navbarContainer = document.getElementById("navbar");
  if (!navbarContainer) return;

  // Load navbar HTML
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

  // Highlight active page link
  navbarContainer.querySelectorAll("#hamburgerMenu a").forEach(a => {
    if (a.textContent.trim() === activePage) a.classList.add("active");
  });

  // Show admin link if needed
  if (isAdmin) {
    const adminLink = navbarContainer.querySelector("#adminNavItem");
    if (adminLink) adminLink.style.display = "block";
  }

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

  // Firebase auth handling
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    const navbarLeft = navbarContainer.querySelector(".navbar-left");
    const existingLoginBtn = navbarLeft.querySelector("#loginBtn");
    const logoutBtn = navbarLeft.querySelector("#logoutBtn");

    if (user) {
      // Logged in: show logout, remove login
      if (logoutBtn) logoutBtn.style.display = "flex";
      if (existingLoginBtn) existingLoginBtn.remove();
    } else {
      // Logged out: hide logout, add login
      if (logoutBtn) logoutBtn.style.display = "none";

      if (!existingLoginBtn) {
        const loginBtn = document.createElement("a");
        loginBtn.href = "./login.html";
        loginBtn.id = "loginBtn";
        loginBtn.textContent = "Log In";

        // Styling
        loginBtn.style.marginLeft = "auto";
        loginBtn.style.color = "white";
        loginBtn.style.fontWeight = "bold";
        loginBtn.style.textDecoration = "none";
        loginBtn.style.display = "flex";
        loginBtn.style.alignItems = "center";

        navbarLeft.appendChild(loginBtn);
      }
    }
  });

  // Logout button click
  const logoutBtn = navbarContainer.querySelector("#logoutBtn");
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
