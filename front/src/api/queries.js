const SITE = "https://ksun-diploma.herokuapp.com/";

export function getCanvas(id) {
  return fetch(`${SITE}canvas/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((data) => data.json());
}

export function getProfile(id) {
  return fetch(`${SITE}profile/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((data) => data.json());
}

export function saveProfile(data) {
  const { id, name, profileImg, text1, text2, text3 } = data;
  return fetch(`${SITE}profile`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, name, profileImg, text1, text2, text3 }),
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
