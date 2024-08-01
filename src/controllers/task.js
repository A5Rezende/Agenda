const Task = require("../models/Task");

exports.index = async function (req, res) {
  res.render("task", { jogador: {} });
};

exports.create = async function (req, res) {
  const task = new Task(req.body.date, req.body.name, req.body.description);
  await task.create();

  if (task.errors.length > 0) {
    res.render(task.errors);
  }
};

exports.update = async function (req, res) {
  if (!req.params.id) return res.render("404");

  const task = new Task(req.body.date, req.body.name, req.body.description);
  await task.update(parseInt(req.params.id));
};

exports.updateIndex = async function (req, res) {
  if (!req.params.id) return res.render("404");

  const task = await Task.search(parseInt(req.params.id));

  if (!task) {
    return res.render("404");
  }
  // console.log(task);
  res.render("task", { task });
};

exports.delete = async function (req, res) {
  if (!req.params.id) return res.render("404");

  const deletedTask = Task.delete(parseInt(req.params.id));
  res.redirect("../");
  return deletedTask;
};
