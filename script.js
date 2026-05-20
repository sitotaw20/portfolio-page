// Drawer Element Interactivities
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menuItems = document.querySelectorAll('.menu-item');

function toggleMenu() {
  menuBtn.classList.toggle('active');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('active');
}

menuBtn.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

// Auto-close menu drawer when a navigation link item is selected
menuItems.forEach(item => {
  item.addEventListener('click', () => {
    if (sidebar.classList.contains('open')) {
      toggleMenu();
    }
  });
});
