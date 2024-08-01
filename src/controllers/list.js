const Task = require("../models/Task");

exports.list = async function (req, res) {
  const list = Task.list();
  res.render("list", list);
  return;
};
