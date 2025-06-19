import { comments } from "./data.js";
import { renderComments } from "./render.js";
import { sanitizeHTML, getDateTime } from "./utils.js";

export const initAddCommentListener = () => {
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

    NameElement.value = "";
    TextElement.value = "";
  });
};

export const initLikeListeners = () => {
    const likeButtons = document.querySelectorAll(".like-button");

    for (const likeButton of likeButtons) {
        likeButton.addEventListener("click", (event) => {
            event.stopPropagation();

        const index = likeButton.dataset.index;
        const comment = comments[index];

        comment.numberLikes = comment.likeState
            ? comment.numberLikes - 1
            : comment.numberLikes + 1;

        comment.likeState = !comment.likeState;

        renderComments();
        });
    };
};

export const initQuoteListeners = () => {
    const TextElement = document.querySelector(".add-form-text");
    const commentsElement = document.querySelectorAll(".comment");

    for (const commentElement of commentsElement) {
        commentElement.addEventListener("click", () => {
            const currentComment = comments[commentElement.dataset.index];
            TextElement.value = `${currentComment.name}: ${currentComment.text}`;
        });
    };
};
