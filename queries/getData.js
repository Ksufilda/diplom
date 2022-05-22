const { simpleQueryWithResult, callbackQuery } = require("./common");

exports.getMyProfile = (sendBack, data, requestParams) => {
  const callbackSql = `SELECT profileId from users WHERE timeKey='${requestParams.key}'`;
  callbackQuery(callbackSql, function (err, result) {
    console.log("aaaaaa", result);
    if (result?.rows.length > 0) {
      console.log(result?.rows[0]?.profileid);
      const id = result?.rows[0]?.profileid;
      if (!id) sendBack({ message: "no_profile" }, null);
      else {
        const sql = `SELECT name, profileImg, text1, text2, text3 from profile WHERE id=${id}`;
        console.log("aaaasdfsfsdfsdfdsaa");

        simpleQueryWithResult(sql, sendBack);
      }
    } else sendBack({ message: "no_profile" }, null);
  });
};

exports.getMyUser = (sendBack, data, requestParams) => {
  const sql = `SELECT name from users WHERE timeKey=${requestParams.key}`;
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
