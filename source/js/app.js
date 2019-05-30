let body = document.querySelector('.page');
let navToggle = document.querySelector('.js-nav__toggle');
let navLists = document.querySelectorAll('.js-nav__list');

navToggle.addEventListener('click', (evt) => {
  evt.preventDefault();

  navLists.forEach(function(list) {
    list.classList.toggle('nav__list--show');
  });

  navToggle.classList.toggle('nav__toggle--close');
});

if ( body.classList.contains('page--index') ) {
  let indexLinks = document.querySelectorAll('.logo, .js-page-footer__logo');


  indexLinks.forEach((link) => {
    link.removeAttribute('href', '');
  });
}

let openModalBtns = document.querySelectorAll('.js-open-modal');
let overlay = document.querySelector('.overlay');

openModalBtns.forEach(function(btn) {
  btn.addEventListener('click', (evt) => {
    evt.preventDefault();

    overlay.classList.add('overlay--show');
  });
});

overlay.addEventListener('click', (evt) => {
  let target = evt.target;

  if (target.classList.contains('overlay--show')) {
    overlay.classList.remove('overlay--show');
  }
});

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27 && overlay.classList.contains('overlay--show')) {
    overlay.classList.remove('overlay--show');
  }
});
