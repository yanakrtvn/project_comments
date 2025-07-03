import { renderComments } from "./modules/render.js";
import { initAddCommentListener } from "./modules/listeners.js";
import { updateComments } from "./modules/data.js";
import { getComments } from "./modules/api.js";

document.querySelector(".comments").innerHTML =
  "Пожалуйста подождите, загружаю комментарии...";

initAddCommentListener();

const loadComments = () => {
  getComments()
    .then((data) => {
      updateComments(data.comments);
      renderComments();
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    });
};

loadComments();
