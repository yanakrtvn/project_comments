import { comments } from "./data.js";
import { sanitizeHTML, getDateTime } from "./auxiliaryFunctions.js";
import { renderComments } from "./render.js";
import { initCommentInteractions } from "./commentHandler.js";

export const initEventHandlers = () => {
  const NameElement = document.querySelector(".add-form-name");
  const TextElement = document.querySelector(".add-form-text");
  const ButtonElement = document.querySelector(".add-form-button");

  ButtonElement.addEventListener("click", () => {
    const name = NameElement.value;
    const text = TextElement.value;

    NameElement.classList.remove("error");
    TextElement.classList.remove("error");

    let Errors = false;

    if (!name) {
      NameElement.classList.add("error");
      Errors = true;
    }

    if (!text) {
      TextElement.classList.add("error");
      Errors = true;
    }

    if (Errors) {
      return;
    }

    const newComment = {
      name: sanitizeHTML(NameElement.value),
      date: getDateTime(),
      text: sanitizeHTML(TextElement.value),
      numberLikes: 0,
      likeState: false,
    };

    comments.push(newComment);

    renderComments();
    initCommentInteractions();

    NameElement.value = "";
    TextElement.value = "";
  });
};
