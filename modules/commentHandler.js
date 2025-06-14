import { comments } from "./data.js";
import { renderComments } from "./render.js";

export const initCommentInteractions = () => {
  const likeButtons = document.querySelectorAll(".like-button");
  const TextElement = document.querySelector(".add-form-text");

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
      initCommentInteractions();
    });
  }

  const commentsElement = document.querySelectorAll(".comment");

  for (const commentElement of commentsElement) {
    commentElement.addEventListener("click", () => {
      const currentComment = comments[commentElement.dataset.index];
      TextElement.value = `${currentComment.name}: ${currentComment.text}`;
    });
  }
};
