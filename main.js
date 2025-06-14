import { renderComments } from "./modules/render.js";
import { initEventHandlers } from "./modules/formHandler.js";
import { initCommentInteractions } from "./modules/commentHandler.js";

renderComments();
initEventHandlers();
initCommentInteractions();
