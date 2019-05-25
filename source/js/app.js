let body = document.querySelector('.page');
let navToggle = document.querySelector('.js-nav__toggle');
let navList = document.querySelector('.js-nav__list');

navToggle.addEventListener('click', (evt) => {
  evt.preventDefault();

  navList.classList.toggle('nav__list--show');
  navToggle.classList.toggle('nav__toggle--close');
});

if ( body.classList.contains('page--index') ) {
  let indexLink = document.querySelector('.page-header__logo');

  indexLink.removeAttribute('href', '');
}
