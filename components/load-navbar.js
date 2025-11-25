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

  const navbarLeft = navbarContainer.querySelector(".navbar-left");
  const navbarRight = navbarContainer.querySelector(".navbar-right");
  const hamburgerMenu = navbarContainer.querySelector("#hamburgerMenu");
  const hamburgerBtn = navbarContainer.querySelector("#hamburgerBtn");

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

  // Hamburger toggle
  if (hamburgerBtn && hamburgerMenu) {
    hamburgerBtn.addEventListener("click", () => {
      hamburgerMenu.style.display = hamburgerMenu.style.display === "none" ? "flex" : "none";
    });
  }

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    navbarRight.innerHTML = ""; // clear buttons

    const isHomePage = window.location.pathname.endsWith("index.html") || window.location.pathname === "/";

    if (user) {
      // Logged in: show logout button
      const logoutBtn = document.createElement("button");
      logoutBtn.textContent = "Logout";
      logoutBtn.className = "logout-btn";
      logoutBtn.addEventListener("click", async () => {
        try { await signOut(auth); window.location.href = "./login.html"; }
        catch(e){ console.error("Logout failed", e); }
      });
      navbarRight.appendChild(logoutBtn);
      navbarLeft.style.display = "flex"; // always show left for logged-in users
    } else {
      // Logged out: show login button
      const loginBtn = document.createElement("a");
      loginBtn.href = "./login.html";
      loginBtn.textContent = "Log In";
      loginBtn.style.color = "white";
      loginBtn.style.fontWeight = "bold";
      loginBtn.style.textDecoration = "none";
      navbarRight.appendChild(loginBtn);

      if (isHomePage) {
        navbarLeft.style.display = "none"; // hide hamburger+title
      } else {
        navbarLeft.style.display = "flex"; // show normal navbar on other pages
      }
    }
  });
}
