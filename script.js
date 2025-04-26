let slides = document.querySelectorAll('.slide');
let current = 0;
let playing = true;
let interval = setInterval(nextSlide, 4000);

function nextSlide() {
  slides[current].classList.remove('active');
  current = (current + 1) % slides.length;
  updateSlide();
}

function updateSlide() {
  const bg = getComputedStyle(slides[current]).getPropertyValue('--bg');
  document.querySelector('main').style.backgroundColor = bg;
  slides[current].classList.add('active');
}

// Initialize background
updateSlide();

// Optional: Add controls
const nav = document.createElement('div');
nav.id = 'controls';
nav.style.position = 'absolute';
nav.style.bottom = '30px';
nav.style.left = '50%';
nav.style.transform = 'translateX(-50%)';
nav.style.display = 'flex';
nav.style.gap = '10px';

slides.forEach((_, index) => {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  dot.style.width = '12px';
  dot.style.height = '12px';
  dot.style.borderRadius = '50%';
  dot.style.background = index === current ? '#fff' : 'rgba(255,255,255,0.4)';
  dot.style.cursor = 'pointer';
  dot.style.transition = 'background 0.3s';
  dot.addEventListener('click', () => {
    clearInterval(interval);
    slides[current].classList.remove('active');
    current = index;
    updateSlide();
    restartInterval();
  });
  nav.appendChild(dot);
});

document.querySelector('.showcase').appendChild(nav);

function restartInterval() {
  clearInterval(interval);
  interval = setInterval(nextSlide, 4000);
}

// Optional: Keyboard control
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    nextSlide();
    restartInterval();
  } else if (e.key === 'ArrowLeft') {
    slides[current].classList.remove('active');
    current = (current - 1 + slides.length) % slides.length;
    updateSlide();
    restartInterval();
  }
});
// Handle touch/click on preview images
document.querySelectorAll('#preview-next').forEach(el => {
  el.addEventListener('click', () => {
    clearInterval(interval);
    nextSlide();
    restartInterval();
  });
});

document.querySelectorAll('#preview-previous').forEach(el => {
  el.addEventListener('click', () => {
    clearInterval(interval);
    slides[current].classList.remove('active');
    current = (current - 1 + slides.length) % slides.length;
    updateSlide();
    restartInterval();
  });
});



// Pause slideshow on button hover
// const buttons = document.querySelectorAll('.slide .text button');

// buttons.forEach(button => {
//   button.addEventListener('mouseenter', () => {
//     clearInterval(interval);
//   });

//   button.addEventListener('mouseleave', () => {
//     interval = setInterval(nextSlide, 4000);
//   });
// });


