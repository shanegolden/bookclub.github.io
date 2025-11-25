// navbar.js
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

async function loadNavbar(activePage = "Home") {
  // Fetch and inject navbar
  const resp = await fetch('/navbar.html');
  const navbarHtml = await resp.text();
  document.body.insertAdjacentHTML('afterbegin', navbarHtml);

  document.getElementById("pageTitle").innerText = activePage;

  const auth = getAuth();
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const hamburgerMenu = document.getElementById("hamburgerMenu");
  const logoutBtn = document.getElementById("logoutBtn");
  const adminNavItem = document.getElementById("adminNavItem");

  // Hamburger toggle
  hamburgerBtn.addEventListener("click", () => {
    hamburgerMenu.classList.toggle("show");
  });

  // Close menu if clicked outside
  document.addEventListener("click", e => {
    if (!hamburgerMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
      hamburgerMenu.classList.remove("show");
    }
  });

  // Logout
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "/login.html";
  });

  // Show admin link only for admins
  onAuthStateChanged(auth, user => {
    if (!user) return window.location.href="/login.html";
    // Replace with your real admin check
    if (user.email === "admin@example.com") {
      adminNavItem.style.display = "block";
    }
  });
}

export { loadNavbar };
