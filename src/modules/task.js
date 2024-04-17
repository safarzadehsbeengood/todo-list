import { format } from "date-fns";

export default class Task {
  constructor(name, dueDate, priority = 0, notes = "") {
    this.name = name;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  getPriority() {
    return this.priority;
  }

  setPriority(priority) {
    this.priority = priority;
  }

  getNotes() {
    return this.notes;
  }

  setNotes(notes) {
    this.notes = notes;
  }

  setDate(date) {
    this.dueDate = date;
  }

  getDate() {
    return this.dueDate;
  }

  getFormattedDate = function () {
    return format(this.dueDate, "MM/dd/yyyy");
  };
}
