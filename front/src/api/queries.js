const SITE = "https://ksun-diploma.herokuapp.com/";

export function getCanvas(id) {
  return fetch(`${SITE}canvas/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((data) => data.json());
}

export function postCanvas(data) {
  const { userId, text, image, type, link, video, x, y, id } = data;
  return fetch(`${SITE}canvas`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, userId, text, image, type, link, video, x, y }),
  }).then((data) => data.json());
}

export function deleteCanvas(id) {
  return fetch(`${SITE}canvas/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  }).then((data) => data.json());
}
