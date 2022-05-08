const { simpleQueryWithResult } = require("./common");

exports.getProfile = (sendBack, data, requestParams) => {
  const sql = `SELECT name, profileImg, text1, text2, text3 from profile WHERE id=${requestParams.id}`;
  simpleQueryWithResult(sql, sendBack);
};

exports.getCanvas = (sendBack, data, requestParams) => {
  const sql = `SELECT id, text, image, type, link, video, x, y from canvas WHERE userId=${requestParams.id}`;
  simpleQueryWithResult(sql, sendBack);
};
