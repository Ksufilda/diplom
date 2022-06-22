const format = require("pg-format");
const {
  simpleQueryWithResult,
  simpleQuery,
  callbackQuery,
} = require("./common");

const nodemailer = require("nodemailer");

exports.sendMail = async (sendBack, data, requestParams) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "klc6tultfo7w5raz@ethereal.email", // generated ethereal user
      pass: "2Ef9UrA2tp8f9EN1j9", // generated ethereal password
    },
  });

  // let transporter = nodemailer.createTransport({
  //   host: "smtp.gmail.com",
  //   port: 465,
  //   secure: true, // true for 465, false for other ports
  //   auth: {
  //     user: "deducme@gmail.com", // generated ethereal user
  //     pass: "Pomogite1337!", // generated ethereal password
  //   },
  // });
  console.log("asdasdas");
  transporter.sendMail(
    {
      from: '"Your Space" <your-space@gmail.com>', // sender address
      to: requestParams.email, // list of receivers
      subject: "Проверочный код", // Subject line
      text: "Ваш проверочный код - 1111", // plain text body
    },
    (error, info) => {
      if (error) return console.warn("Ошибка отправки почты", error);
      console.log("Письмо успешно отправлено", info.messageId, info.response);
      sendBack(null, info);
    }
  );
};

exports.deleteLink = async (sendBack, data) => {
  const sql = `DELETE FROM link WHERE id = ${data.id}`;
  simpleQueryWithResult(sql, sendBack);
};

exports.postLink = async (sendBack, data) => {
  async function putLink(data, id) {
    const sql = `DELETE FROM link WHERE id = ${id}`;
    simpleQuery(sql);
    insertLink(data);
  }

  function insertLink(data) {
    const sql = format(
      `INSERT INTO link (id, link, type, profileid) VALUES %L`,
      data
    );
    simpleQueryWithResult(sql, sendBack);
  }

  const sql = `SELECT id from link WHERE id=${data.id}`;
  callbackQuery(sql, function (err, result) {
    console.log(data);
    if (result?.rows.length > 0) {
      console.log(`put link`, data.id);
      putLink([Object.values(data)], data.id);
    } else {
      console.log(`insert link`, data.id);
      insertLink([Object.values(data)]);
    }
  });
};

exports.deleteCanvas = async (sendBack, data) => {
  const sql = `DELETE FROM canvas WHERE id = ${data.id}`;
  simpleQueryWithResult(sql, sendBack);
};

exports.postCanvas = async (sendBack, data) => {
  async function putCanvas(data, id) {
    const sql = `DELETE FROM canvas WHERE id = ${id}`;
    simpleQuery(sql);
    insertCanvas(data);
  }

  function insertCanvas(data) {
    const sql = format(
      `INSERT INTO canvas (id, userId, text, image, type, link, video, x, y, rotation, scale) VALUES %L`,
      data
    );
    simpleQueryWithResult(sql, sendBack);
  }

  const sql = `SELECT id from canvas WHERE id=${data.id}`;
  callbackQuery(sql, function (err, result) {
    console.log(data);
    if (result?.rows.length > 0) {
      console.log(`put canvas`, data.id);
      putCanvas([Object.values(data)], data.id);
    } else {
      console.log(`insert canvas`, data.id);
      insertCanvas([Object.values(data)]);
    }
  });
};

exports.registerUser = async (sendBack, data) => {
  function insertUser(sendBack, data) {
    console.log(data);

    const sql = format(
      `INSERT INTO users (id, name, login, password, timeKey) VALUES %L`,
      data
    );

    console.log(sql);

    simpleQueryWithResult(sql, sendBack);
  }

  const sql = `SELECT id from users WHERE login='${data.login}'`;

  callbackQuery(sql, function (err, result) {
    if (result?.rows.length > 0) {
      sendBack({ message: "Такой логин уже используется" }, null);
    } else {
      console.log(`insert users`, data.id, data);
      insertUser(sendBack, [Object.values(data)]);
    }
  });
};

exports.loginUser = async (sendBack, data) => {
  function sendNewTimekey(id) {
    const timeKey = Math.floor(
      Math.random() * Math.floor(Math.random() * Date.now())
    );
    const sql = `UPDATE users SET timekey='${timeKey}' WHERE id=${id}`;

    callbackQuery(sql, (err, res) => {
      res.rows[0] = timeKey;
      sendBack(err, res);
    });
  }

  const sql = `SELECT * from users WHERE login='${data.login}' AND password='${data.password}'`;
  callbackQuery(sql, function (err, result) {
    console.log(result?.rows[0], "result");
    if (result?.rows.length > 0) {
      sendNewTimekey(result?.rows[0].id);
    } else {
      sendBack({ message: "Неверный логин или пароль" }, null);
    }
  });
};

exports.postProfile = async (sendBack, data) => {
  async function putUsersProfileId() {
    const sql = `UPDATE users SET profileId=${data.id} WHERE timeKey='${data.timeKey}'`;
    console.log("putUsersProfileId", data);
    simpleQueryWithResult(sql, sendBack);
  }

  async function putProfile(data, id) {
    const sql = `DELETE FROM profile WHERE id = ${id}`;
    simpleQuery(sql);
    insertProfile(data);
  }

  function insertProfile(data) {
    const sql = format(
      `INSERT INTO profile (id, name, profileImg, text1, text2, text3) VALUES %L`,
      data
    );
    simpleQuery(sql);
    putUsersProfileId();
  }

  const sql = `SELECT id from profile WHERE id=${data.id}`;
  callbackQuery(sql, function (err, result) {
    const profileData = JSON.parse(JSON.stringify(data));
    delete profileData.timeKey;
    console.log([Object.values(profileData)]);
    if (result?.rows.length > 0) {
      console.log(`put menu`, data.id);
      putProfile([Object.values(profileData)], data.id);
    } else {
      console.log(`insert menu`, data.id);
      insertProfile([Object.values(profileData)]);
    }
  });
};
