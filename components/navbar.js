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

  hamburgerMenu.innerHTML = menuItems.map(item => `<a href="/${item.toLowerCase()}">${item}</a>`).join('');

  // Toggle hamburger menu
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  hamburgerBtn.addEventListener('click', () => {
    if(hamburgerMenu.style.display === 'block') hamburgerMenu.style.display = 'none';
    else hamburgerMenu.style.display = 'block';
  });

  // Add padding to body so content isn't hidden under navbar
  document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    if(header) document.body.style.paddingTop = `${header.offsetHeight}px`;
  });

  // Logout button
  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.addEventListener('click', () => {
    // Replace with your logout logic
    window.location.href = "/login";
  });
}
