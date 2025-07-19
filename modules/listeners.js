import { comments } from "./data.js";
import { renderComments } from "./render.js";
import { sanitizeHTML } from "./utils.js";
import { updateComments } from "./data.js";
import { getComments, postComment } from "./api.js";

export const initAddCommentListener = () => {
  const NameElement = document.querySelector(".add-form-name");
  const TextElement = document.querySelector(".add-form-text");
  const ButtonElement = document.querySelector(".add-form-button");

  const handlePostClick = () => {
    const name = NameElement.value.trim();
    const text = TextElement.value.trim();

    document.querySelector(".form-loading").style.display = "block";
    document.querySelector(".add-form").style.display = "none";

    postComment({
      name: sanitizeHTML(name),
      text: sanitizeHTML(text),
    })
      .then(() => getComments())
      .then((data) => {
        document.querySelector(".form-loading").style.display = "none";
        document.querySelector(".add-form").style.display = "flex";

        updateComments(data.comments);
        renderComments();

        NameElement.value = "";
        TextElement.value = "";
      })
      .catch((error) => {
        document.querySelector(".form-loading").style.display = "none";
        document.querySelector(".add-form").style.display = "flex";

        if (error.message === "Failed to fetch") {
          alert("Нет интернета. Пожалуйста, попробуйте снова");
        }

        if (error.message === "Ошибка сервера") {
          alert("Ошибка сервера");
        }

        if (error.message === "Некорректный запрос") {
          alert("Имя и текст должны быть не короче 3-х символов");
        }
        NameElement.classList.add("-error");
        TextElement.classList.add("-error");

        setTimeout(() => {
          NameElement.classList.remove("-error");
          TextElement.classList.remove("-error");
        }, 4000);

        if (error.message === "Ошибка сервера") {
          handlePostClick();
        }
      });
  };

  ButtonElement.addEventListener("click", handlePostClick);
};

function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}

export const initLikeListeners = () => {
  const likeButtons = document.querySelectorAll(".like-button");

  for (const likeButton of likeButtons) {
    likeButton.addEventListener("click", (event) => {
      event.stopPropagation();

      const commentId = likeButton.dataset.id;
      const comment = comments.find((c) => c.id == commentId);

      likeButton.classList.add("like-loading");
      delay(1000).then(() => {
        comment.numberLikes = comment.likeState
          ? comment.numberLikes - 1
          : comment.numberLikes + 1;

        comment.likeState = !comment.likeState;

        likeButton.classList.remove("like-loading");
        renderComments();
      });
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
