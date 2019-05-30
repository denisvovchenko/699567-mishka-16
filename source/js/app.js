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
  let indexLink = document.querySelector('.logo');

  indexLink.removeAttribute('href', '');
}

let openModalBtns = document.querySelectorAll('.js-open-modal');
let overlay = document.querySelector('.overlay');

openModalBtns.forEach(function(btn) {
  btn.addEventListener('click', function(evt) {
    evt.preventDefault();

    overlay.classList.add('overlay--show');
  });
});
