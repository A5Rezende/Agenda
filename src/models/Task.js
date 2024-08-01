const path = require("path");
const fs = require("fs");
const dbPath = path.join(__dirname, "..", "..", "data", "db.json");

class Task {
  constructor(date, name, description) {
    this.date = date;
    this.name = name;
    this.description = description;
    this.errors = [];
  }

  create() {
    if (!this.date || !this.name || !this.description) {
      this.errors.push("Data de conclusão, nome e Descrição são obrigatórios");
      return false;
    } else {
      const data = Task.readData();

      const newTask = {
        id: data.tasks.length + 1,
        date: this.date,
        name: this.name,
        description: this.description,
      };

      data.tasks.push(newTask);
      Task.writeData(data);

      return newTask;
    }
  }

  update(id) {
    const data = Task.readData();
    const taskIndex = data.tasks.findIndex((p) => p.id === id);

    if (taskIndex !== -1) {
      data.tasks[taskIndex] = {
        id,
        date: this.date,
        name: this.name,
        description: this.description,
        conclusion: data.tasks[taskIndex].conclusion,
      };
      Task.writeData(data);
      return data.tasks[taskIndex];
    }
  }

  static delete(id) {
    const data = Task.readData();
    const taskIndex = data.tasks.findIndex((p) => p.id === id);

    if (taskIndex !== -1) {
      const deletedTask = data.tasks.splice(taskIndex, 1);
      Task.writeData(data);
      return deletedTask[0];
    }
  }

  static list() {
    const data = Task.readData();
    return data;
  }

  static search(id) {
    const data = Task.readData();
    const task = data.tasks.find((t) => t.id === id);

    return task;
  }

  static readData() {
    const data = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(data);
  }

  static writeData(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
  }
}

module.exports = Task;
