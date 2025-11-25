// Function to load the navbar
export function loadNavbar(activePage = "Home", isAdmin = false) {
  // Create header if it doesn't exist
  let header = document.querySelector('header');
  if(!header) {
    header = document.createElement('header');
    document.body.prepend(header);
  }
  header.innerHTML = `
    <button id="hamburgerBtn">☰</button>
    <span id="logo">📚</span>
    <span id="pageTitle">${activePage}</span>
    <button id="logoutBtn" class="btn-danger">Logout</button>
  `;

  // Create hamburger menu if it doesn't exist
  let hamburgerMenu = document.getElementById('hamburgerMenu');
  if(!hamburgerMenu) {
    hamburgerMenu = document.createElement('div');
    hamburgerMenu.id = 'hamburgerMenu';
    document.body.appendChild(hamburgerMenu);
  }

  // Populate menu items
  const menuItems = ["Home", "Dashboard", "Charter"];
  if(isAdmin) menuItems.push("Admin");

  hamburgerMenu.innerHTML = menuItems.map(item => {
    const isActive = item.toLowerCase() === activePage.toLowerCase() ? "active" : "";
    return `<a href="/${item.toLowerCase()}" class="${isActive}">${item}</a>`;
  }).join('');

  // Toggle hamburger menu
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if(hamburgerMenu.style.display === 'block') hamburgerMenu.style.display = 'none';
    else hamburgerMenu.style.display = 'block';
  });

  // Auto-hide menu when clicking outside
  document.addEventListener('click', (e) => {
    if(!hamburgerMenu.contains(e.target) && e.target !== hamburgerBtn) {
      hamburgerMenu.style.display = 'none';
    }
  });

  // Highlight active page
  document.querySelectorAll('#hamburgerMenu a').forEach(a => {
    if(a.textContent.toLowerCase() === activePage.toLowerCase()) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });

  // Add padding to body so content isn't hidden under navbar
  const adjustPadding = () => {
    const header = document.querySelector('header');
    if(header) document.body.style.paddingTop = `${header.offsetHeight}px`;
  };
  window.addEventListener('resize', adjustPadding);
  adjustPadding();

  // Logout button
  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.addEventListener('click', () => {
    // Replace with your logout logic
    window.location.href = "/login";
  });
}
