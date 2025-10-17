// script.js
// Einfache Logik für Kiste + zufällige Gegenstände

// TODO: Ersetze diese Liste später mit deinen Gegenständen (Namen, Icons oder Objekten).
const ITEMS = [
  "Unbekannter Gegenstand A",
  "Geheimnisvolles Stück B",
  "Leuchtender Kristall",
  "Alte Münze",
  "Mysterioser Schlüssel"
];

const boxWrap = document.getElementById("box");
const itemsLayer = document.getElementById("items-layer");
const openBtn = document.getElementById("open-btn");
const resetBtn = document.getElementById("reset-btn");

let isOpen = false;
let activeItems = [];

// Hilfsfunktionen
function rand(min, max){ return Math.random()*(max-min)+min; }
function pickRandom(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

// Erstellt ein DOM-Element für einen Gegenstand
function createItemElement(text){
  const el = document.createElement("div");
  el.className = "item";
  el.textContent = text;
  // Startposition: Mitte der Box (relativ zur Stage)
  const rect = boxWrap.getBoundingClientRect();
  const parentRect = document.body.getBoundingClientRect();
  const startX = rect.left + rect.width/2;
  const startY = rect.top + rect.height*0.2;
  el.style.left = `${startX}px`;
  el.style.top = `${startY}px`;
  el.style.transform = `translate(-50%,-50%) scale(0.9)`;
  el.style.opacity = "0";
  itemsLayer.appendChild(el);
  return el;
}

// Lässt n Gegenstände aus der Kiste fliegen
function spawnItems(n = 6){
  for(let i=0;i<n;i++){
    const name = pickRandom(ITEMS);
    const el = createItemElement(name);
    activeItems.push(el);

    // kleine Verzögerung für besseres "Spray"-Gefühl
    setTimeout(() => {
      // Zufällige Flugrichtung und Drehung
      const vx = rand(-220, 220);
      const vy = rand(-380, -120);
      const rot = rand(-720, 720);
      const duration = rand(1200, 2200);

      // Animieren via transition
      el.style.transition = `transform ${duration}ms cubic-bezier(.14,.9,.2,1), opacity ${duration}ms linear`;
      el.style.opacity = "1";

      const translate = `translate(${vx}px, ${vy}px) rotate(${rot}deg)`;
      el.style.transform = `translate(-50%,-50%) ${translate} scale(1)`;

      // nach Animation ausblenden und entfernen
      setTimeout(()=>{
        el.style.transition = `opacity 600ms linear`;
        el.style.opacity = "0";
        setTimeout(()=>{ el.remove(); }, 700);
      }, duration + 350);

    }, i*90);
  }
}

// Öffnen der Kiste
function openBox(){
  if(isOpen) return;
  isOpen = true;
  boxWrap.classList.add("open");
  boxWrap.setAttribute("aria-pressed","true");
  spawnItems(8);
}

// Schließen / Reset
function resetBox(){
  isOpen = false;
  boxWrap.classList.remove("open");
  boxWrap.setAttribute("aria-pressed","false");
  // entferne noch vorhandene Items
  activeItems.forEach(e=>e.remove());
  activeItems = [];
}

// Event-Handler
boxWrap.addEventListener("click", ()=>{
  if(isOpen) resetBox();
  else openBox();
});
boxWrap.addEventListener("keydown", (e)=>{
  if(e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    if(isOpen) resetBox(); else openBox();
  }
});
openBtn.addEventListener("click", openBox);
resetBtn.addEventListener("click", resetBox);

// Optional: Tip für mobile / erste Interaktion
window.addEventListener("load", ()=>{
  // kleine Hilfstexte oder initiale Animationen könnten hier kommen
});
