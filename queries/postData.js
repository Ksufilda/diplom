const format = require("pg-format");
const {
  simpleQueryWithResult,
  simpleQuery,
  callbackQuery,
} = require("./common");

exports.deleteCanvas = async (sendBack, data) => {
  const sql = `DELETE FROM canvas WHERE id = ${data.id}`;
  simpleQueryWithResult(sql, sendBack);
};

exports.postCanvas = async (sendBack, data) => {
  console.log(data);
  async function putCanvas(sendBack, data, id) {
    const sql = `DELETE FROM canvas WHERE id = ${id}`;
    simpleQuery(sql);
    insertCanvas(sendBack, data);
  }

  function insertCanvas(sendBack, data) {
    const sql = format(
      `INSERT INTO canvas (id, userId, text, image, type, link, video, x, y) VALUES %L`,
      data
    );

    console.log(sql);

    simpleQueryWithResult(sql, sendBack);
  }

  const sql = `SELECT id from canvas WHERE id=${data.id}`;
  callbackQuery(sql, function (err, result) {
    if (result?.rows.length > 0) {
      console.log(`put canvas`, data.id);
      putCanvas(sendBack, [Object.values(data)], data.id);
    } else {
      console.log(`insert canvas`, data.id);
      insertCanvas(sendBack, [Object.values(data)]);
    }
  });
};

exports.postProfile = async (sendBack, data) => {
  async function putProfile(sendBack, data, id) {
    const sql = `DELETE FROM profile WHERE id = ${id}`;
    simpleQuery(sql);
    insertProfile(sendBack, data);
  }

  function insertProfile(sendBack, data) {
    const sql = format(
      `INSERT INTO profile (id, name, profileImg, text1, text2, text3) VALUES %L`,
      data
    );

    simpleQueryWithResult(sql, sendBack);
  }

  const sql = `SELECT id from profile WHERE id=${data.id}`;
  callbackQuery(sql, function (err, result) {
    if (result?.rows.length > 0) {
      console.log(`put menu`, data.id);
      putProfile(sendBack, [Object.values(data)], data.id);
    } else {
      console.log(`insert menu`, data.id);
      insertProfile(sendBack, [Object.values(data)]);
    }
  });
};
