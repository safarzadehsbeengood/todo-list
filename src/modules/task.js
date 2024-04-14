export default class Task {
    constructor(name, dueDate = "None") {
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
        return this.dueDate
    }

    getFormattedDate = function() {
        const date = this.dueDate.split('/');
        return `${date[0]}/${date[1]}/${date[2]}`;
    }
    
};