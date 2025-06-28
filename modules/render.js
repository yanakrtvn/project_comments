import { comments } from "./data.js";
import { initLikeListeners, initQuoteListeners } from "./listeners.js";

export const renderComments = () => {
  const oneCommentBlock = document.querySelector(".comments");

  oneCommentBlock.innerHTML = comments
    .map((comment) => {
      return `<li class="comment" data-id="${comment.id}"">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.numberLikes}</span>
              <button data-id="${comment.id}" class="like-button ${comment.likeState ? "-active-like" : ""}"></button>
            </div>
          </div>
        </li>`;
    })
    .join("");

  initLikeListeners();
  initQuoteListeners();
};
