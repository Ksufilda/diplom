// const SITE = "https://your-space-diploma.herokuapp.com/";
const SITE = "https://ksun-diploma.herokuapp.com/";

export function getCanvas(id) {
  return fetch(`${SITE}canvas/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((data) => data.json());
}

export function getMe(key) {
  return fetch(`${SITE}myuser/${key}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((data) => data.json());
}

export function getMyCanvas(key) {
  return fetch(`${SITE}mycanvas/${key}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((data) => data.json());
}

export function getMyProfile(key) {
  return fetch(`${SITE}myprofile/${key}`, {
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
  const { id, name, profileImg, text1, text2, text3, timeKey } = data;
  console.log(data);
  return fetch(`${SITE}profile`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      name,
      profileImg,
      text1,
      text2,
      text3,
      timeKey,
    }),
  }).then((data) => data.json());
}

export function deleteLink(id) {
  return fetch(`${SITE}link/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  }).then((data) => data.json());
}

export function postLink(data) {
  const { profileId, type, link, id } = data;
  return fetch(`${SITE}link`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      link,
      type,
      profileId,
    }),
  }).then((data) => data.json());
}

export function postCanvas(data) {
  const { userId, text, image, type, link, video, x, y, scale, rotation, id } =
    data;
  return fetch(`${SITE}canvas`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      userId,
      text,
      image,
      type,
      link,
      video,
      x,
      y,
      rotation,
      scale,
    }),
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

export function loginUser(data) {
  return fetch(`${SITE}login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((data) => data.json());
}

export function registerUser(data) {
  console.log(data);
  const { id, login, password, timeKey, name } = data;
  return fetch(`${SITE}register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((data) => data.json());
}
