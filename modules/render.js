import { comments } from "./data.js";

export const renderComments = () => {
  const oneCommentBlock = document.querySelector(".comments");
  oneCommentBlock.innerHTML = comments
    .map((comment, index) => {
      return `<li class="comment" data-index="${index}"">
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
              <button data-index="${index}" class="like-button ${comment.likeState ? "-active-like" : ""}"></button>
            </div>
          </div>
        </li>`;
    })
    .join("");
};
