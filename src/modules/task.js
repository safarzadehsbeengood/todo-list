export default function Task(name, dueDate = "None") {
    this.name = name;
    this.dueDate = dueDate;

    const setName = function(name) {
        this.name = name;
    };
    const getName = () => this.name;
    const setDate = function(date) {
        this.dueDate = date;
    };

    const getDate = () => this.dueDate;

    const getFormattedDate = function() {
        const date = this.dueDate.split('/');
        return `${date[0]}/${date[1]}/${date[2]}`;
    };

    return {
        setName,
        getName,
        setDate,
        getDate,
        getFormattedDate
    };
}