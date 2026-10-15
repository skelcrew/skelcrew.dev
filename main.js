// Product preview tabs: click to switch, auto-advance until the visitor interacts.
const tabs = [...document.querySelectorAll(".tabs [role=tab]")];
const panels = [...document.querySelectorAll(".panel")];
let auto = !matchMedia("(prefers-reduced-motion: reduce)").matches;

function show(name) {
  for (const t of tabs) t.setAttribute("aria-selected", String(t.dataset.tab === name));
  for (const p of panels) p.classList.toggle("is-active", p.dataset.panel === name);
}

for (const t of tabs) {
  t.addEventListener("click", () => {
    auto = false;
    show(t.dataset.tab);
  });
}

setInterval(() => {
  if (!auto) return;
  const i = tabs.findIndex((t) => t.getAttribute("aria-selected") === "true");
  show(tabs[(i + 1) % tabs.length].dataset.tab);
}, 6000);

// Signup: Buttondown doesn't send CORS headers, so post blind and fall back to a
// normal form submit if the request can't be made at all.
const form = document.querySelector(".form");
const note = document.querySelector(".form-note");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = form.querySelector("button");
  const email = form.email.value;
  button.disabled = true;
  button.textContent = "Subscribing…";
  try {
    await fetch(form.action, {
      method: "POST",
      mode: "no-cors",
      body: new URLSearchParams(new FormData(form)),
    });
    note.textContent = `Almost there. Check ${email} for a link to confirm your subscription.`;
    note.classList.add("is-ok");
    form.hidden = true;
  } catch {
    form.submit();
  }
});
