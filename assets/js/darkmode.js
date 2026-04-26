document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".dark-toggle");

  // Se a página atual não tiver o botão de trocar tema, encerra o script
  if (!toggle) return;

  const icon = toggle.querySelector("i");

  // Escuta o clique no botão de troca de tema
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    // Verifica qual tema ficou ativo e salva no navegador do usuário
    if (document.body.classList.contains("dark-theme")) {
      icon.classList.replace("ri-moon-line", "ri-sun-line");
      localStorage.setItem("theme", "dark"); // Perfeito para preferências de UI
    } else {
      icon.classList.replace("ri-sun-line", "ri-moon-line");
      localStorage.setItem("theme", "light");
    }
  });

  /* ================= RESTAURAÇÃO DO TEMA ================= */
  // Quando o usuário navega entre as páginas, o navegador lembra a escolha
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    icon.classList.replace("ri-moon-line", "ri-sun-line");
  }
});