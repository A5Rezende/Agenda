const Task = require("../models/Task");

exports.index = async function (req, res) {
  res.render("task", { task: {} });
};

exports.create = async function (req, res) {
  if (!req.body.date && !req.body.name && !req.body.description) {
    res.send("Falta parametros");
  } else {
    const task = new Task(req.body.date, req.body.name, req.body.description);
    await task.create();
  }
  res.redirect("../");
};

exports.update = async function (req, res) {
  if (!req.params.id) return res.render("404");

  const task = new Task(req.body.date, req.body.name, req.body.description);
  await task.update(parseInt(req.params.id));

  if (!task) {
    return res.render("404");
  }

  res.redirect("../");
};

exports.updateIndex = async function (req, res) {
  if (!req.params.id) return res.render("404");

  const task = await Task.search(parseInt(req.params.id));

  if (!task) {
    return res.render("404");
  }
  res.render("task", { task });
};

exports.delete = async function (req, res) {
  if (!req.params.id) return res.render("404");

  const deletedTask = Task.delete(parseInt(req.params.id));
  res.redirect("../");
  return deletedTask;
};
