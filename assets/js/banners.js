const BANNERS = [
  { code: "A1", title: "Effortless.", line: "a" },
  { code: "A2", title: "Soft by nature.", line: "a" },
  { code: "A3", title: "Light as a whisper.", line: "a" },
  { code: "A4", title: "Silver, celebrated.", line: "a" },
  { code: "A5", title: "Every story.", line: "a" },
  { code: "B1", title: "Quietly yours.", line: "b" },
  { code: "B2", title: "Your pace, your privacy.", line: "b" },
  { code: "B3", title: "Handled with care.", line: "b" },
  { code: "B4", title: "Feel like yourself again.", line: "b" },
  { code: "B5", title: "Softness, when you need it most.", line: "b" },
];

const src = (b) => `/assets/banners/gayla-wigs-${b.code}.png`;

BANNERS.forEach((b, i) => {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <button class="thumb" aria-label="View ${b.code} large"><img src="${src(b)}" alt="Banner ${b.code}: ${b.title}" loading="lazy"></button>
    <div class="meta">
      <span class="label">${b.code}</span>
      <span class="links"><button class="view">View</button><a class="accent" href="${src(b)}" download>Download PNG</a></span>
    </div>
    <p class="title">${b.title}</p>`;
  card.querySelector(".thumb").addEventListener("click", () => open(i));
  card.querySelector(".view").addEventListener("click", () => open(i));
  document.getElementById(b.line === "a" ? "line-a" : "line-b").appendChild(card);
});

const lb = document.getElementById("lightbox");
const img = document.getElementById("lb-img");
const title = document.getElementById("lb-title");
const dl = document.getElementById("lb-download");
let current = 0;

function open(i) {
  current = (i + BANNERS.length) % BANNERS.length;
  const b = BANNERS[current];
  img.src = src(b);
  img.alt = `Banner ${b.code}: ${b.title}`;
  title.textContent = `${b.code} · ${b.title}`;
  dl.href = src(b);
  dl.setAttribute("download", `gayla-wigs-${b.code}.png`);
  lb.classList.add("open");
  document.body.style.overflow = "hidden";
}
function close() {
  lb.classList.remove("open");
  document.body.style.overflow = "";
}

document.getElementById("lb-close").addEventListener("click", close);
document.getElementById("lb-prev").addEventListener("click", () => open(current - 1));
document.getElementById("lb-next").addEventListener("click", () => open(current + 1));
lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
document.addEventListener("keydown", (e) => {
  if (!lb.classList.contains("open")) return;
  if (e.key === "Escape") close();
  if (e.key === "ArrowLeft") open(current - 1);
  if (e.key === "ArrowRight") open(current + 1);
});
