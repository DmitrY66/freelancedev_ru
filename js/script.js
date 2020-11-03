let button_menu = document.querySelector("#open_close_menu");
let nav_main_list_mob = document.querySelector("#nav-main-list-mob");

button_menu.addEventListener("click", (evt) => {
  evt.preventDefault();
  nav_main_list_mob.classList.toggle("list-mob-show");
  button_menu.classList.toggle("btn-open-menu");
  button_menu.classList.toggle("btn-close-menu");
});

let button_modal = document.querySelector("#footer-contact");
let link_modal = document.querySelector(".calling-now");
let modal_address = document.querySelector(".section-modal");
let button_close_modal = document.querySelector(".section-modal__container");

button_modal.addEventListener("click", (evt) => {
  evt.preventDefault();
  modal_address.classList.toggle("section-modal-show");
});

link_modal.addEventListener("click", (evt) => {
  evt.preventDefault();
  modal_address.classList.toggle("section-modal-show");
});

button_close_modal.addEventListener("click", (evt) => {
  evt.preventDefault();
  modal_address.classList.toggle("section-modal-show");
});









