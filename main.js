(()=>{"use strict";function e(e){e.classList.toggle("card__like-button_is-active")}function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t(e)}function n(e,t){var n=e.nextElementSibling;e.validity.valid?(n.textContent="",n.classList.remove(t.inputErrorClass)):(n.textContent=e.validationMessage,n.classList.add(t.inputErrorClass))}function o(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",c);var t=e.querySelector(".popup__form");t&&function(e){e.addEventListener("submit",(function(t){t.preventDefault();var n,o=e.querySelector(".popup__button"),r=o.textContent;(n=o).textContent="Сохранение...",n.setAttribute("disabled",!0),setTimeout((function(){e.reset(),function(e,t){e.textContent=t,e.removeAttribute("disabled")}(o,r)}),2e3)}))}(t)}function r(e){e.querySelectorAll(".popup__input-error").forEach((function(e){e.textContent="",e.classList.remove("popup__input-error_active")})),e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",c)}function c(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&r(t)}}function u(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function i(e){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i(e)}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){var o,r,c,u;o=e,r=t,c=n[t],u=function(e,t){if("object"!=i(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,"string");if("object"!=i(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r),(r="symbol"==i(u)?u:String(u))in o?Object.defineProperty(o,r,{value:c,enumerable:!0,configurable:!0,writable:!0}):o[r]=c})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var p={baseUrl:"https://nomoreparties.co/v1/wff-cohort-10",headers:{authorization:"cd96ad2d-6ac8-4d45-8a99-781f91d662c6","Content-Type":"application/json"}};function s(e){return fetch("".concat(p.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:p.headers}).then(u)}function d(){r(document.querySelector(".popup_type_new-avatar"))}function f(e,t){e.querySelector(".card__like-counter").textContent=t}function _(e){var t=e.target,n=t.closest(".places__item"),o=n.dataset.cardId;t.classList.contains("card__like-button_liked")?(t.classList.remove("card__like-button_liked"),s(o).then((function(e){f(n,e.likesCount)})).catch((function(e){console.error("Ошибка при удалении лайка:",e)}))):(t.classList.add("card__like-button_liked"),s(o).then((function(e){f(n,e.likesCount)})).catch((function(e){console.error("Ошибка при добавлении лайка:",e)})))}var y=document.querySelector(".popup__input_type_name"),m=document.querySelector(".popup__input_type_description"),v=document.querySelector(".profile__title"),b=document.querySelector(".profile__description"),S=v.textContent,h=b.textContent,q=document.querySelector(".popup_type_image"),k=q.querySelector(".popup__image"),E=q.querySelector(".popup__caption"),g=document.querySelector(".places__list"),L=document.querySelector(".popup_type_edit"),C=document.querySelector(".profile__edit-button"),O=(L.querySelector(".popup__close"),document.querySelector(".popup_type_new-card")),j=document.querySelector(".profile__add-button"),w=(O.querySelector(".popup__close"),document.forms.edit_profile),P=document.forms.new_place,A=document.querySelector(".popup__input_type_card-name"),x=document.querySelector(".popup__input_type_url"),T=document.querySelector(".profile__image");function D(e,t,n){e.addEventListener("submit",(function(e){e.preventDefault(),t(e),n()}))}function U(e,t){k.src=e,k.alt=t,E.textContent=t,o(q)}j.addEventListener("click",(function(){return o(O)})),D(P,(function(){var t,n,o;(t={name:A.value,link:x.value},n=t.name,o=t.link,fetch("".concat(p.baseUrl,"/cards"),{method:"POST",headers:l(l({},p.headers),{},{"Content-Type":"application/json"}),body:JSON.stringify({name:n,link:o})}).then(u)).then((function(t){var n;(function(e){g.prepend(e)})(n=function(e,t,n){var o=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),r=o.querySelector(".card__image");r.src=e.link.href,r.alt=e.name,r.addEventListener("click",(function(){n(e.link.href,e.name)})),o.querySelector(".card__title").textContent=e.name,o.querySelector(".card__delete-button").addEventListener("click",(function(){!function(e){e.remove()}(o)}));var c=o.querySelector(".card__like-button");return c.addEventListener("click",(function(){t(c)})),o}(t,e,U)),n.querySelector(".card__like-button").addEventListener("click",_),P.reset(),r(O)})).catch((function(e){console.error("Ошибка при добавлении карточки:",e)}))}),(function(){return r(O)})),C.addEventListener("click",(function(){o(L),y.value=S,m.value=h})),D(w,(function(e){var t,n,o,r=y.value,c=m.value;v.textContent=r,b.textContent=c,(t={name:r,about:c},n=t.name,o=t.about,fetch("".concat(p.baseUrl,"/users/me"),{method:"PATCH",headers:l(l({},p.headers),{},{"Content-Type":"application/json"}),body:JSON.stringify({name:n,about:o,avatar})}).then(u)).catch((function(e){console.error("Ошибка при сохранении профиля:",e)}))}),(function(){return r(L)})),T.addEventListener("click",(function(){o(document.querySelector(".popup_type_new-avatar"))})),D(document.forms.edit_avatar,(function(e){e.preventDefault(),function(e){return fetch("".concat(p.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:l(l({},p.headers),{},{"Content-Type":"application/json"}),body:JSON.stringify({avatar:e})}).then(u).then((function(e){return console.log("Ответ сервера после обновления аватара:",e),e})).catch((function(e){throw console.error("Ошибка при запросе на обновление аватара:",e),e}))}(document.getElementById("avatar__input").value).then((function(e){var t;t=e.avatar,document.querySelector(".profile__image").src=t,d()})).catch((function(e){console.error("Ошибка при обновлении аватара:",e)}))}),d),document.addEventListener("DOMContentLoaded",(function(){var e;(e={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inputErrorClass:"popup__input-error_active",popup__input_type_error:"popup__input_type_error"})&&"object"===t(e)?document.querySelectorAll(e.formSelector).forEach((function(t){t.addEventListener("submit",(function(o){o.preventDefault(),function(e,t){var o=e.querySelectorAll(t.inputSelector),r=!0;o.forEach((function(e){n(e,t),e.validity.valid||(r=!1)}));var c=e.querySelector(t.submitButtonSelector);r?c.removeAttribute("disabled"):c.setAttribute("disabled","disabled")}(t,e)})),t.addEventListener("input",(function(o){n(o.target,e),function(e,t){var n=e.querySelectorAll(t.inputSelector),o=!0;n.forEach((function(e){e.validity.valid||(o=!1)}));var r=e.querySelector(t.submitButtonSelector);o?r.removeAttribute("disabled"):r.setAttribute("disabled","disabled")}(t,e)}))})):console.error("Invalid settings object"),document.querySelectorAll(".popup").forEach((function(e){var t=document.querySelectorAll('[data-modal-target="'.concat(e.id,'"]')),n=e.querySelectorAll(".popup__close");t.forEach((function(t){t.addEventListener("click",(function(){return o(e)}))})),n.forEach((function(t){t.addEventListener("click",(function(){return r(e)}))})),e.addEventListener("click",(function(t){t.target===e&&r(e)}))}))}))})();