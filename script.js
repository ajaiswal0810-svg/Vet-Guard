const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.querySelector("#navbar ul");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

document.querySelectorAll("#navbar a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });
});

const fadeSections = document.querySelectorAll('.fade-section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeSections.forEach(el => observer.observe(el));

const slides = document.querySelectorAll('.slide');
const dots   = document.querySelectorAll('.dot');
let current  = 0;
let timer;

function goTo(index) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (index + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}

function startAuto() {
  timer = setInterval(() => goTo(current + 1), 4000);
}

function resetAuto() {
  clearInterval(timer);
  startAuto();
}

document.querySelector('.prev').addEventListener('click', () => {
  goTo(current - 1);
  resetAuto();
});

document.querySelector('.next').addEventListener('click', () => {
  goTo(current + 1);
  resetAuto();
});

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    goTo(i);
    resetAuto();
  });
});

startAuto();