(()=>{"use strict";function e(e,t,n){var r=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),o=r.querySelector(".card__image");o.src=e.link.href,o.alt=e.name,o.addEventListener("click",(function(){n(e.link.href,e.name)})),r.querySelector(".card__title").textContent=e.name,r.querySelector(".card__delete-button").addEventListener("click",(function(){!function(e){e.remove()}(r)}));var c=r.querySelector(".card__like-button");return c.addEventListener("click",(function(){t(c)})),r}function t(e){e.classList.toggle("card__like-button_is-active")}function n(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",o)}function r(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",o)}function o(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&r(t)}}document.querySelector(".profile__image").style.backgroundImage="url(".concat("images/avatar.jpg",")");var c=[{name:"Архыз",link:new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg")},{name:"Челябинская область",link:new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg")},{name:"Иваново",link:new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg")},{name:"Камчатка",link:new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg")},{name:"Холмогорский район",link:new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg")},{name:"Байкал",link:new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg")}];document.addEventListener("DOMContentLoaded",(function(){var o=document.querySelector(".popup__input_type_name"),u=document.querySelector(".popup__input_type_description"),a=document.querySelector(".profile__title"),d=document.querySelector(".profile__description"),i=a.textContent,p=d.textContent,l=document.querySelector(".popup_type_image"),s=l.querySelector(".popup__image"),_=l.querySelector(".popup__caption"),m=document.querySelector(".places__list");function f(e){m.prepend(e)}c.forEach((function(n){f(e(n,t,x))}));var y=document.querySelector(".popup_type_edit"),v=document.querySelector(".profile__edit-button"),k=y.querySelector(".popup__close");v.addEventListener("click",(function(){n(y),o.value=i,u.value=p})),k.addEventListener("click",(function(){return r(y)}));var q=document.querySelector(".popup_type_new-card"),S=document.querySelector(".profile__add-button"),L=q.querySelector(".popup__close");S.addEventListener("click",(function(){return n(q)})),L.addEventListener("click",(function(){return r(q)})),document.forms["edit-profile"].addEventListener("submit",(function(e){e.preventDefault();var t=o.value,n=u.value;a.textContent=t,d.textContent=n,r(y)}));var E=document.forms["new-place"],g=document.querySelector(".popup__input_type_card-name"),h=document.querySelector(".popup__input_type_url");function x(e,t){!function(e,t){s.src=e,s.alt=t,_.textContent=t,n(l)}(e,t)}E.addEventListener("submit",(function(n){n.preventDefault();var o=g.value,c=h.value;f(e({name:o,link:new URL(c)},t,x)),E.reset(),r(q)})),document.querySelectorAll(".popup").forEach((function(e){var t=document.querySelectorAll('[data-modal-target="'.concat(e.id,'"]')),o=e.querySelectorAll(".popup__close");t.forEach((function(t){t.addEventListener("click",(function(){return n(e)}))})),o.forEach((function(t){t.addEventListener("click",(function(){return r(e)}))})),e.addEventListener("click",(function(t){t.target===e&&r(e)}))}))}))})();