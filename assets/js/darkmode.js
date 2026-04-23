document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".dark-toggle");

  if (!toggle) return;

  const icon = toggle.querySelector("i");

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
      icon.classList.replace("ri-moon-line", "ri-sun-line");
      localStorage.setItem("theme", "dark");
    } else {
      icon.classList.replace("ri-sun-line", "ri-moon-line");
      localStorage.setItem("theme", "light");
    }
  });

  // 🔥 mantém o tema salvo
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    icon.classList.replace("ri-moon-line", "ri-sun-line");
  }
});
