const SITE = "https://ksun-diploma.herokuapp.com/";

export function getCanvas(id) {
  return fetch(`${SITE}canvas/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((data) => data.json());
}
