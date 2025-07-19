import { renderComments } from "./modules/render.js";
import { updateComments } from "./modules/data.js";
import { getComments } from "./modules/api.js";

export const loadComments = (startLoading) => {
  if (startLoading) {
    document.querySelector(".container").innerHTML =
      `<p>Пожалуйста подождите, загружаю комментарии...</p>`;
  }
  getComments()
    .then((data) => {
      updateComments(data.comments);
      renderComments();
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    });
};

loadComments(true);
