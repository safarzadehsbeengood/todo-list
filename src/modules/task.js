import { format, subMonths } from "date-fns";

export default class Task {
  constructor(name, dueDate) {
    this.name = name;
    this.dueDate = dueDate;
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
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
