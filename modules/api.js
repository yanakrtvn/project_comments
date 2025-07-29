const host = "https://wedev-api.sky.pro/api/v2/yana-korotaeva";
const authHost = "https://wedev-api.sky.pro/api/user";

export let token = "";
export const upDateToken = (newToken) => {
  token = newToken;
};

export let name = "";
export const upDateName = (newName) => {
  name = newName;
};

export const getComments = () => {
  return fetch(host + "/comments", {
    method: "GET",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Ошибка загрузки комментариев");
    }
    return response.json();
  });
};

export const postComment = ({ name, text }) => {
  return fetch(host + "/comments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
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

export const login = (login, password) => {
  return fetch(authHost + "/login", {
    method: "POST",
    body: JSON.stringify({ login: login, password: password }),
  });
};

export const registration = (name, login, password) => {
  return fetch(authHost, {
    method: "POST",
    body: JSON.stringify({ name: name, login: login, password: password }),
  });
};
