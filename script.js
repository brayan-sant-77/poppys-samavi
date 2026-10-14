// PERSONALIZE os dados reais da Poppys antes de publicar.
const POPPYS = {
  whatsapp: "5577998201230", // Somente números: 55 + DDD + número. Ex.: 5577999999999
  phoneDisplay: "(77) 9 9820-1230", // Formato de exibição do telefone
  address: "R. Nilo Peçanha, 78 - Centro, Santa Maria da Vitória - BA",
  hours: "Segunda a sábado: 18h às 23h\nDomingo: 18h às 22h",
  mapQuery: "Poppys hamburgueria Santa Maria da Vitória Bahia"
};

const root = document.documentElement;
const themeToggle = document.querySelector("#themeToggle");
themeToggle.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  document.querySelector('meta[name="theme-color"]').content = next === "dark" ? "#160d0a" : "#fff7eb";
  themeToggle.setAttribute("aria-label", next === "dark" ? "Ativar tema claro" : "Ativar tema escuro");
});

document.querySelectorAll("[data-phone]").forEach(el => el.textContent = POPPYS.phoneDisplay);
document.querySelectorAll("[data-address]").forEach(el => el.textContent = POPPYS.address);
document.querySelectorAll("[data-hours]").forEach(el => el.innerHTML = POPPYS.hours.replace(/\n/g, "<br>"));

const query = encodeURIComponent(POPPYS.address.includes("Exemplo") ? POPPYS.mapQuery : POPPYS.address);
document.querySelector("[data-map]").src = `https://www.google.com/maps?q=${query}&output=embed`;
document.querySelector("[data-maps]").href = `https://www.google.com/maps/search/?api=1&query=${query}`;

document.querySelectorAll("[data-whatsapp]").forEach(link => {
  const order = link.dataset.order;
  const message = encodeURIComponent(order
    ? `Olá, Poppys! Gostaria de pedir: ${order}.`
    : "Olá, Poppys! Gostaria de fazer um pedido.");
  const number = POPPYS.whatsapp.replace(/\D/g, "");
  link.href = number ? `https://wa.me/${number}?text=${message}` : `https://wa.me/?text=${message}`;
});

const menuToggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#nav");
menuToggle.addEventListener("click", () => {
  const opened = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(opened));
  menuToggle.setAttribute("aria-label", opened ? "Fechar menu" : "Abrir menu");
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));
