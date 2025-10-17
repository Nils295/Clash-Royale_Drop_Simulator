/* script.js - spawn a single image item per chest open from 10 possible items */
document.addEventListener('DOMContentLoaded', () => {
  const items = [
    { name: 'Ritter', img: 'https://picsum.photos/seed/knight/120' },
    { name: 'Bogenschütze', img: 'https://picsum.photos/seed/archer/120' },
    { name: 'Magier', img: 'https://picsum.photos/seed/mage/120' },
    { name: 'Riese', img: 'https://picsum.photos/seed/giant/120' },
    { name: 'Hexe', img: 'https://picsum.photos/seed/witch/120' },
    { name: 'Kobold', img: 'https://picsum.photos/seed/goblin/120' },
    { name: 'Drache', img: 'https://picsum.photos/seed/dragon/120' },
    { name: 'Skelett', img: 'https://picsum.photos/seed/skeleton/120' },
    { name: 'Kanonenkutsche', img: 'https://picsum.photos/seed/cannon/120' },
    { name: 'Schläger', img: 'https://picsum.photos/seed/pekka/120' }
  ];

  const box = document.getElementById('box');
  const openBtn = document.getElementById('open-btn');
  const resetBtn = document.getElementById('reset-btn');
  const itemsLayer = document.getElementById('items-layer');
  let isAnimating = false;

  function spawnItem() {
    if (isAnimating) return; // nur ein Item gleichzeitig
    isAnimating = true;

    const item = items[Math.floor(Math.random() * items.length)];
    const img = document.createElement('img');
    img.className = 'flying-item';
    img.src = item.img;
    img.alt = item.name;
    img.setAttribute('aria-hidden', 'false');

    // append asap so getBoundingClientRect() works
    itemsLayer.appendChild(img);

    // calculate start position (Mitte der Kiste)
    const boxRect = box.getBoundingClientRect();
    const layerRect = itemsLayer.getBoundingClientRect();
    const startX = boxRect.left + boxRect.width / 2 - layerRect.left;
    const startY = boxRect.top + boxRect.height / 2 - layerRect.top;

    img.style.left = startX + 'px';
    img.style.top = startY + 'px';
    img.style.transform = 'translate(-50%,-50%) scale(0.6)';
    img.style.opacity = '0';

    // Force layout so transitions run
    img.getBoundingClientRect();

    // Zielposition (oben Mitte des stages)
    const targetX = layerRect.width / 2;
    const targetY = layerRect.height * 0.18;

    img.style.transition = 'left 800ms cubic-bezier(.2,.8,.2,1), top 800ms cubic-bezier(.2,.8,.2,1), transform 800ms cubic-bezier(.2,.8,.2,1), opacity 400ms';
    img.style.left = targetX + 'px';
    img.style.top = targetY + 'px';
    img.style.transform = 'translate(-50%,-50%) scale(1)';
    img.style.opacity = '1';

    function onTransitionEnd(e) {
      // wir interessieren uns für das Ende der Positions-/transform-transition
      if (e.propertyName !== 'left' && e.propertyName !== 'top' && e.propertyName !== 'transform') return;
      img.removeEventListener('transitionend', onTransitionEnd);

      // kurz sichtbar lassen, dann wegfliegen und entfernen
      setTimeout(() => {
        img.style.transition = 'transform 700ms ease, opacity 700ms ease';
        img.style.transform = 'translate(-50%,-50%) scale(0.4) translateY(-120vh)';
        img.style.opacity = '0';

        setTimeout(() => {
          if (img.parentNode === itemsLayer) itemsLayer.removeChild(img);
          isAnimating = false;
        }, 750);
      }, 1100);
    }

    img.addEventListener('transitionend', onTransitionEnd);
  }

  openBtn.addEventListener('click', spawnItem);
  box.addEventListener('click', spawnItem);
  box.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      spawnItem();
    }
  });

  resetBtn.addEventListener('click', () => {
    itemsLayer.innerHTML = '';
    isAnimating = false;
  });
});
