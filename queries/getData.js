const { simpleQueryWithResult } = require("./common");

exports.getMyProfile = (sendBack, data, requestParams) => {
  const callbackSql = `SELECT profileId from user WHERE timeKey=${requestParams.key}`;
  callbackQuery(callbackSql, function (err, result) {
    if (result?.rows.length > 0) {
      const id = result?.rows[0].id;
      const sql = `SELECT name, profileImg, text1, text2, text3 from profile WHERE id=${id}`;
      simpleQueryWithResult(sql, sendBack);
    } else sendBack({ message: "вы не авторизованы" }, null);
  });
};

exports.getMyUser = (sendBack, data, requestParams) => {
  const sql = `SELECT name from user WHERE timeKey=${requestParams.key}`;
  simpleQueryWithResult(sql, sendBack);
};

exports.getProfile = (sendBack, data, requestParams) => {
  const sql = `SELECT name, profileImg, text1, text2, text3 from profile WHERE id=${requestParams.id}`;
  simpleQueryWithResult(sql, sendBack);
};

exports.getCanvas = (sendBack, data, requestParams) => {
  const sql = `SELECT id, text, image, type, link, video, x, y from canvas WHERE userId=${requestParams.id}`;
  simpleQueryWithResult(sql, sendBack);
};
