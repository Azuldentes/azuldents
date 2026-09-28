function getGreetingByHour() {
  const hour = new Date().getHours();

  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

function buildWhatsAppMessage(nome) {
  const greeting = getGreetingByHour();

  if (nome) {
    return `${greeting}, meu nome é ${nome}. Quero agendar uma consulta.`;
  }

  return `${greeting}. Quero agendar uma consulta.`;
}

function initRevealAnimations() {
  const revealItems = document.querySelectorAll(".reveal");

  if (!revealItems.length) return;

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

function initWhatsAppForm() {
  const form = document.getElementById("appointmentForm");

  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const nome = (formData.get("nome") || "").toString().trim();
    const mensagem = buildWhatsAppMessage(nome);
    const urlWhatsApp = `https://wa.me/5538991358860?text=${encodeURIComponent(mensagem)}`;

    window.open(urlWhatsApp, "_blank");
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });

  initRevealAnimations();
  initWhatsAppForm();
});
