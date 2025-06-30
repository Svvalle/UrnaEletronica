document.addEventListener("DOMContentLoaded", function(){
    const toggleBtn = document.getElementById("themeToggle");
    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        if (document.body.classList.contains("dark-theme")) {
            toggleBtn.textContent = "☀️ Alterar Tema";
        } else {
            toggleBtn.textContent = "🌙 Alterar Tema";
        }
    });
})