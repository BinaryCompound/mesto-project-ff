(()=>{"use strict";function e(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t(e)}function n(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function o(e){for(var o=1;o<arguments.length;o++){var r=null!=arguments[o]?arguments[o]:{};o%2?n(Object(r),!0).forEach((function(n){var o,c,a,i;o=e,c=n,a=r[n],i=function(e,n){if("object"!=t(e)||!e)return e;var o=e[Symbol.toPrimitive];if(void 0!==o){var r=o.call(e,"string");if("object"!=t(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(c),(c="symbol"==t(i)?i:String(i))in o?Object.defineProperty(o,c,{value:a,enumerable:!0,configurable:!0,writable:!0}):o[c]=a})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var r={baseUrl:"https://nomoreparties.co/v1/wff-cohort-12",headers:{authorization:"a6c324f3-515d-4107-9910-fdcad5920d1c","Content-Type":"application/json"}};function c(t){return fetch("".concat(r.baseUrl,"/cards/likes/").concat(t),{method:"PUT",headers:r.headers}).then(e)}var a=document.querySelector(".popup__input_type_name"),i=document.querySelector(".popup__input_type_description"),u=document.querySelector(".profile__title"),l=document.querySelector(".profile__description"),d=u.textContent,s=l.textContent,p=document.querySelector(".popup_type_image"),f=p.querySelector(".popup__image"),_=p.querySelector(".popup__caption"),m=document.querySelector(".places__list"),y=document.querySelector(".popup_type_edit"),v=document.querySelector(".profile__edit-button"),b=(y.querySelector(".popup__close"),document.querySelector(".popup_type_new-card")),h=document.querySelector(".profile__add-button"),S=(b.querySelector(".popup__close"),document.forms.edit_profile),q=document.forms.new_place,k=document.querySelector(".popup__input_type_card-name"),E=document.querySelector(".popup__input_type_url"),g=document.querySelector(".profile__image");function L(e){return L="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},L(e)}function C(e,t){var n=e.nextElementSibling;e.validity.valid?(n.textContent="",n.classList.remove(t.inputErrorClass)):(n.textContent=e.validationMessage,n.classList.add(t.inputErrorClass))}function O(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",w);var t=e.querySelector(".popup__form");t&&function(e){e.addEventListener("submit",(function(t){t.preventDefault();var n,o=e.querySelector(".popup__button"),r=o.textContent;(n=o).textContent="Сохранение...",n.setAttribute("disabled",!0),setTimeout((function(){e.reset(),function(e,t){e.textContent=t,e.removeAttribute("disabled")}(o,r)}),2e3)}))}(t)}function j(e){e.querySelectorAll(".popup__input-error").forEach((function(e){e.textContent="",e.classList.remove("popup__input-error_active")})),e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",w)}function w(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&j(t)}}function x(t,n){fetch("".concat(r.baseUrl,"/cards"),{headers:r.headers}).then(e).then((function(n){n.forEach((function(n){var o=function(t,n,o){var a=document.querySelector("#card-template").content.cloneNode(!0),i=a.querySelector(".card__image"),u=a.querySelector(".card__title"),l=a.querySelector(".card__delete-button"),d=a.querySelector(".card__like-button"),s=a.querySelector(".card__like-counter");return i.src=t.link,i.alt=t.name,u.textContent=t.name,console.log("cardData:",t),t._id&&(d.dataset.cardId=t._id),d.dataset.cardId=t._id,console.log(d),s.textContent=t.likes.length,l.addEventListener("click",(function(){var o;t.owner._id===n._id?(l.closest(".card").remove(),(o=d.dataset.cardId,fetch("".concat(r.baseUrl,"/cards/").concat(o),{method:"DELETE",headers:r.headers}).then(e)).then((function(){console.log("Карточка успешно удалена")})).catch((function(e){console.error("Ошибка при удалении карточки:",e)}))):console.error("Нельзя удалять чужие карточки")})),d.addEventListener("click",(function(){var t=d.dataset.cardId;d.classList.contains("card__like-button_is-active")?function(t){return fetch("".concat(r.baseUrl,"/cards/likes/").concat(t),{method:"DELETE",headers:r.headers}).then(e)}(t).then((function(e){d.classList.remove("card__like-button_is-active"),s.textContent=e.likes.length})).catch((function(e){console.error("Ошибка при дизлайке карточки:",e)})):c(t).then((function(e){d.classList.add("card__like-button_is-active"),s.textContent=e.likes.length})).catch((function(e){console.error("Ошибка при лайке карточки:",e)}))})),i.addEventListener("click",(function(){var e,n;e=t.link,n=t.name,f.src=e,f.alt=n,_.textContent=n,O(p)})),a}(n,t);m.appendChild(o)}))})).catch((function(e){console.error("Ошибка при загрузке карточек:",e)}))}function P(e){document.querySelector(".profile__image").src=e}function A(){j(document.querySelector(".popup_type_new-avatar"))}function D(e,t){e.querySelector(".card__like-counter").textContent=t}function T(e){var t=e.target,n=t.closest(".places__item"),o=n.dataset.cardId;t.classList.contains("card__like-button_liked")?(t.classList.add("card__like-button_liked"),c(o).then((function(e){D(n,e.likesCount)})).catch((function(e){console.error("Ошибка при удалении лайка:",e)}))):(t.classList.remove("card__like-button_liked"),c(o).then((function(e){D(n,e.likesCount)})).catch((function(e){console.error("Ошибка при добавлении лайка:",e)})))}function I(e,t,n){e.addEventListener("submit",(function(e){e.preventDefault(),t(e),n()}))}function U(e){u.textContent=e.name,l.textContent=e.about}document.querySelector(".profile__image-button"),document.querySelector(".popup_type_new-avatar"),document.querySelector(".card__delete-button"),window.addEventListener("load",(function(){fetch("".concat(r.baseUrl,"/users/me"),{headers:r.headers}).then(e).then((function(e){e&&P(e.avatar)})).catch((function(e){console.error("Ошибка при загрузке аватара:",e)}))})),function(){var e=localStorage.getItem("profileData");if(e){var t=JSON.parse(e);U(t),a.value=t.name,i.value=t.about}}(),h.addEventListener("click",(function(){return O(b)})),I(q,(function(){var t,n,c;(t={name:k.value,link:E.value},n=t.name,c=t.link,fetch("".concat(r.baseUrl,"/cards"),{method:"POST",headers:o(o({},r.headers),{},{"Content-Type":"application/json"}),body:JSON.stringify({name:n,link:c})}).then(e)).then((function(e){var t;(function(e){m.prepend(e)})(t=createCard(e,handleLike,handleImageClick)),t.querySelector(".card__like-button").addEventListener("click",T),clearForm(q),j(b)})).catch((function(e){console.error("Ошибка при добавлении карточки:",e)}))}),(function(){return j(b)})),v.addEventListener("click",(function(){O(y),a.value=d,i.value=s})),I(S,(function(t){var n,c,u;t.preventDefault(),(n={name:a.value,about:i.value},c=n.name,u=n.about,fetch("".concat(r.baseUrl,"/users/me"),{method:"PATCH",headers:o(o({},r.headers),{},{"Content-Type":"application/json"}),body:JSON.stringify({name:c,about:u})}).then(e)).then((function(e){!function(e){localStorage.setItem("profileData",JSON.stringify(e))}(e),U(e),clearForm(editMyProfileForm)})).catch((function(e){console.error("Ошибка при сохранении профиля:",e)}))}),(function(){return j(y)})),g.addEventListener("click",(function(){O(document.querySelector(".popup_type_new-avatar"))})),I(document.forms.edit_avatar,(function(t){var n;t.preventDefault(),(n=document.getElementById("avatar__input").value,fetch("".concat(r.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:o(o({},r.headers),{},{"Content-Type":"application/json"}),body:JSON.stringify({avatar:n})}).then(e)).then((function(e){P(e.avatar),A()})).catch((function(e){console.error("Ошибка при обновлении аватара:",e)}))}),A),document.addEventListener("DOMContentLoaded",(function(){var e;x(),(e={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inputErrorClass:"popup__input-error_active",popup__input_type_error:"popup__input_type_error"})&&"object"===L(e)?document.querySelectorAll(e.formSelector).forEach((function(t){t.addEventListener("submit",(function(n){n.preventDefault(),function(e,t){var n=e.querySelectorAll(t.inputSelector),o=!0;n.forEach((function(e){C(e,t),e.validity.valid||(o=!1)}));var r=e.querySelector(t.submitButtonSelector);o?r.removeAttribute("disabled"):r.setAttribute("disabled","disabled")}(t,e)})),t.addEventListener("input",(function(n){C(n.target,e),function(e,t){var n=e.querySelectorAll(t.inputSelector),o=!0;n.forEach((function(e){e.validity.valid||(o=!1)}));var r=e.querySelector(t.submitButtonSelector);o?r.removeAttribute("disabled"):r.setAttribute("disabled","disabled")}(t,e)}))})):console.error("Invalid settings object"),document.querySelectorAll(".popup").forEach((function(e){var t=document.querySelectorAll('[data-modal-target="'.concat(e.id,'"]')),n=e.querySelectorAll(".popup__close");t.forEach((function(t){t.addEventListener("click",(function(){return O(e)}))})),n.forEach((function(t){t.addEventListener("click",(function(){return j(e)}))})),e.addEventListener("click",(function(t){t.target===e&&j(e)}))}))}))})();