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
    body: JSON.stringify({
      name: name.trim(),
      text: text.trim(),
      forceError: true,
    }),
  })
    .then((response) => {
      if (response.status === 500) {
        throw new Error("Ошибка сервера");
      }
      if (response.status === 400) {
        throw new Error("Некорректный запрос");
      }
      if (response.status === 201) {
        return response.json();
      }
    })
    .then(() => {
      return getComments();
    });
};
