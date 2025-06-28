import { formatDate } from "./utils.js";

export let comments = [];

export const updateComments = (apiComments) => {
  comments = apiComments.map((comment) => ({
    name: comment.author.name,
    date: formatDate(comment.date),
    text: comment.text,
    numberLikes: comment.likes,
    likeState: comment.isLiked,
    id: comment.id,
  }));
};
