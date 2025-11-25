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

  // Auth check for login/logout
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    const navbarRight = navbarContainer.querySelector(".navbar-right");
    const navbarLeft = navbarContainer.querySelector(".navbar-left");
    navbarRight.innerHTML = ""; // clear first

    const isHomePage = window.location.pathname.endsWith("index.html") || window.location.pathname === "/";

    if (user) {
      // Logged in: show logout button
      const logoutBtn = document.createElement("button");
      logoutBtn.className = "logout-btn";
      logoutBtn.textContent = "Logout";
      logoutBtn.addEventListener("click", async () => {
        try {
          await signOut(auth);
          window.location.href = "./login.html";
        } catch (e) {
          console.error("Logout failed:", e);
        }
      });
      navbarRight.appendChild(logoutBtn);

      if (isHomePage) {
        // On homepage, show full navbar for logged-in users
        if (navbarLeft) navbarLeft.style.display = "flex";
      }
    } else {
      // Logged out: show login button
      const loginBtn = document.createElement("a");
      loginBtn.href = "./login.html";
      loginBtn.id = "loginBtn";
      loginBtn.textContent = "Log In";
      navbarRight.appendChild(loginBtn);

      if (isHomePage) {
        // Hide hamburger menu/left items on homepage if logged out
        if (navbarLeft) navbarLeft.style.display = "none";
      }
    }
  });
}
