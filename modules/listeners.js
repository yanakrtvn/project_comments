import { comments } from "./data.js";
import { renderComments } from "./render.js";
import { sanitizeHTML } from "./utils.js";
import { updateComments } from "./data.js";
import { getComments, postComment } from "./api.js";

export const initAddCommentListener = () => {
  const NameElement = document.querySelector(".add-form-name");
  const TextElement = document.querySelector(".add-form-text");
  const ButtonElement = document.querySelector(".add-form-button");

  ButtonElement.addEventListener("click", () => {
    const name = NameElement.value.trim();
    const text = TextElement.value.trim();

    NameElement.classList.remove("error");
    TextElement.classList.remove("error");

    if (!name || name.length < 3) {
      NameElement.classList.add("error");
      return;
    }
    if (!text || text.length < 3) {
      TextElement.classList.add("error");
      return;
    }

    postComment({
      name: sanitizeHTML(name),
      text: sanitizeHTML(text),
    })
      .then(getComments)
      .then((data) => {
        updateComments(data.comments);
        renderComments();

        NameElement.value = "";
        TextElement.value = "";
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        alert(error.message);
      });
  });
};

export const initLikeListeners = () => {
  const likeButtons = document.querySelectorAll(".like-button");

  for (const likeButton of likeButtons) {
    likeButton.addEventListener("click", (event) => {
      event.stopPropagation();

      const commentId = likeButton.dataset.id;
      const comment = comments.find((c) => c.id == commentId);

      comment.numberLikes = comment.likeState
        ? comment.numberLikes - 1
        : comment.numberLikes + 1;

      comment.likeState = !comment.likeState;

      renderComments();
    });
  }
};

export const initQuoteListeners = () => {
  const TextElement = document.querySelector(".add-form-text");
  const commentsElement = document.querySelectorAll(".comment");

  for (const commentElement of commentsElement) {
    commentElement.addEventListener("click", () => {
      const commentId = commentElement.dataset.id;
      const comment = comments.find((c) => c.id == commentId);

      if (comment) {
        TextElement.value = `${comment.name}: ${comment.text}`;
      }
    });
  }
};
