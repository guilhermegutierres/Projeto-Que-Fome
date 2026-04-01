document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.dark-toggle');

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
  });
});