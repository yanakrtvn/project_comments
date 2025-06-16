export const sanitizeHTML = (value) => {
  return value.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
};

export function getDateTime() {
  const nowDate = new Date();
  const day = String(nowDate.getDate()).padStart(2, "0");
  const month = String(nowDate.getMonth() + 1).padStart(2, "0");
  const year = String(nowDate.getFullYear()).slice(-2);
  const hours = String(nowDate.getHours()).padStart(2, "0");
  const minutes = String(nowDate.getMinutes()).padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}
