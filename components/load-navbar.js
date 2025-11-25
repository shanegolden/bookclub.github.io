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

  // Highlight the active page link
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

  // Firebase auth check
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    const logoutBtn = navbarContainer.querySelector("#logoutBtn");

    if (user) {
      // Logged in: show logout, hide log in
      if (logoutBtn) logoutBtn.style.display = "block";

      const loginBtn = navbarContainer.querySelector("#loginBtn");
      if (loginBtn) loginBtn.remove();
    } else {
      // Logged out: hide logout, show login
      if (logoutBtn) logoutBtn.style.display = "none";

      // Only add login button if it doesn't exist
      if (!navbarContainer.querySelector("#loginBtn")) {
        const loginBtn = document.createElement("a");
        loginBtn.href = "./login.html";
        loginBtn.id = "loginBtn";
        loginBtn.textContent = "Log In";
        loginBtn.style.marginLeft = "auto";
        loginBtn.style.color = "white";
        loginBtn.style.fontWeight = "bold";
        loginBtn.style.textDecoration = "none";
        navbarContainer.querySelector(".navbar").appendChild(loginBtn);
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
