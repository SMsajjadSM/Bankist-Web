'use strict';

///////////////////////////////////////
// Modal window
const imgLazyLoad = document.querySelectorAll('img[data-src]');
const allSection = document.querySelectorAll('.section');
const header = document.querySelector('.header');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnscroll = document.querySelector('.btn--scroll-to');
const sectionscroll = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
btnscroll.addEventListener('click', () => {
  sectionscroll.scrollIntoView({ behavior: 'smooth' });
});
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content ');
tabs.forEach(t =>
  t.addEventListener('click', e => {
    const clicked = e.target.closest('.operations__tab');
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    clicked.classList.add('operations__tab--active');
    tabsContent.forEach(t => {
      t.classList.remove('operations__content--active');
    });
    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add('operations__content--active');
  })
);
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    sibling.forEach(s => {
      if (s !== link) {
        s.style.opacity = this;
      } else {
        logo.style.opacity = this;
      }
    });
  }
};
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
// ---navbar-sticky---
const stickyNav = entries => {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserve = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: '-90px',
});

// ---section-efects---
headerObserve.observe(header);
const revealAllsection = (entries, obsrv) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  obsrv.unobserve(entry.target);
};
const option = { null: 0, threshold: 0.15 };

// ---img effct---
const revelSection = new IntersectionObserver(revealAllsection, option);
allSection.forEach(section => {
  revelSection.observe(section);
  section.classList.add('section--hidden');
});
const lazyImg = (entries, obsrv) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
};
const makeLaziImg = new IntersectionObserver(lazyImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});
imgLazyLoad.forEach(img => makeLaziImg.observe(img));
