export const getComments = () => {
  return fetch("https://wedev-api.sky.pro/api/v1/yana-korotaeva/comments", {
    method: "GET",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Ошибка загрузки комментариев");
    }
    return response.json();
  });
};

export const postComment = ({ name, text }) => {
  return fetch("https://wedev-api.sky.pro/api/v1/yana-korotaeva/comments", {
    method: "POST",
    body: JSON.stringify({ name, text }),
  }).then((response) => {
    if (!response.ok) {
      return response.json().then((err) => {
        throw new Error(err.error || "Ошибка сервера");
      });
    }
    return response.json();
  });
};
