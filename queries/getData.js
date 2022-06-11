const {
  simpleQueryWithResult,
  callbackQuery,
  simpleQuery,
  promiseQuery,
} = require("./common");

exports.getMyProfile = (sendBack, data, requestParams) => {
  const callbackSql = `SELECT profileId from users WHERE timeKey='${requestParams.key}'`;

  promiseQuery(callbackSql).then((result) => {
    console.log(result);

    if (result?.rows.length > 0) {
      console.log(result?.rows[0]?.profileid);
      const id = result?.rows[0]?.profileid;
      if (!id) sendBack({ message: "no_profile" }, null);
      else {
        const sql = `SELECT id, name, profileImg, text1, text2, text3 from profile WHERE id=${id}`;

        simpleQueryWithResult(sql, sendBack);
      }
    } else sendBack({ message: "no_profile" }, null);
  });
};

exports.getMyCanvas = (sendBack, data, requestParams) => {
  const callbackSql = `SELECT id from users WHERE timeKey='${requestParams.key}'`;

  promiseQuery(callbackSql)
    .then((result) => {
      if (result?.rows.length > 0) {
        console.log(result?.rows[0]?.id);
        const id = result?.rows[0]?.id;
        if (!id) sendBack({ message: "no_profile" }, null);
        else {
          return id;
        }
      } else sendBack({ message: "no_profile" }, null);

      return null;
    })
    .then((id) => {
      if (!id) return;
      const sql = `SELECT id, userId, text, image, type, link, video, x, y, rotation, scale from canvas WHERE userId=${id}`;

      callbackQuery(sql, function (err, result) {
        if (result?.rows?.length) sendBack(err, result);
        else {
          result.rows[0] = { userid: id };
          sendBack(err, result);
        }
      });
    });

  callbackQuery(callbackSql, function (err, result) {
    if (result?.rows.length > 0) {
      console.log(result?.rows[0]?.id);
      const id = result?.rows[0]?.id;
      if (!id) sendBack({ message: "no_profile" }, null);
      else {
        const sql = `SELECT id, userId, text, image, type, link, video, x, y, rotation, scale from canvas WHERE userId=${id}`;

        callbackQuery(sql, function (err, result) {
          if (result?.rows?.length) sendBack(err, result);
          else {
            result.rows[0] = { userid: id };
            sendBack(err, result);
          }
        });
      }
    } else sendBack({ message: "no_profile" }, null);
  });
};

exports.getMyUser = (sendBack, data, requestParams) => {
  const sql = `SELECT name from users WHERE timeKey=${requestParams.key}`;
  simpleQueryWithResult(sql, sendBack);
};

exports.getProfile = (sendBack, data, requestParams) => {
  const callbackSql = `SELECT profileId from users WHERE id='${requestParams.id}'`;
  callbackQuery(callbackSql, function (err, result) {
    if (result?.rows.length > 0) {
      const id = result?.rows[0]?.profileid;
      if (!id) sendBack({ message: "no_profile" }, null);
      else {
        const sql = `SELECT name, profileImg, text1, text2, text3 from profile WHERE id=${id}`;

        simpleQueryWithResult(sql, sendBack);
      }
    } else sendBack({ message: "no_profile" }, null);
  });
};

exports.getCanvas = (sendBack, data, requestParams) => {
  const sql = `SELECT id, text, image, type, link, video, x, y, rotation, scale from canvas WHERE userId=${requestParams.id}`;
  simpleQueryWithResult(sql, sendBack);
};
