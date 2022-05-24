const { dropTable, createTable } = require("./common");

exports.dropProfile = async () => {
  const sql = `DROP TABLE profile`;
  dropTable(sql, `Table profile not destroyed`, `Table profile destroyed`);
};

exports.dropUser = async () => {
  const sql = `DROP TABLE users`;
  dropTable(sql, `Table users not destroyed`, `Table users destroyed`);
};

exports.dropCanvas = async () => {
  const sql = `DROP TABLE canvas`;
  dropTable(sql, `Table canvas not destroyed`, `Table canvas destroyed`);
};

exports.createCanvas = async () => {
  const sqlcanvas = `CREATE TABLE canvas (id BIGINT, userId BIGINT, text VARCHAR(255), image VARCHAR(255), type VARCHAR(255), link VARCHAR(255), video VARCHAR(255), x BIGINT, y BIGINT)`;

  createTable(sqlcanvas, `table canvas already exist`, `Table canvas created`);
};

exports.createUser = async () => {
  const sqlprofile = `CREATE TABLE users (id BIGINT, profileId BIGINT, login VARCHAR(255), password VARCHAR(255), timeKey VARCHAR(255))`;

  createTable(sqlprofile, `table users already exist`, `Table users created`);
};

exports.createProfile = async () => {
  const sqlprofile = `CREATE TABLE profile (id BIGINT, name VARCHAR(255), profileImg VARCHAR(255), canvasId BIGINT, text1 VARCHAR(255), text2 VARCHAR(255), text3 VARCHAR(255))`;

  createTable(
    sqlprofile,
    `table profile already exist`,
    `Table profile created`
  );
};
