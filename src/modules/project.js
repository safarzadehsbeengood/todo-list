import { toDate, isToday, isThisWeek, subDays } from 'date-fns';

export default function Project(name) {
    this.name = name;
    this.tasks = [];

    const setName = function(name) {
        this.name = name;
    };

    const getName = () => this.name;

    const setTasks = function(tasks) {
        this.tasks = tasks;
    };

    const getTasks = () => this.tasks;
    
    const findTask = function(task) {
        return this.tasks.find((task) => task.getName() === task);
    };

    const contains = function(task) {
        return this.tasks.some((task) => task.getName() === task);
    };

    const addTask = function(newTask) {
        if (!this.tasks.find((task) => task.getName() === newTask.name)) {
            this.tasks.push(newTask);
        }
    };

    const deleteTask = function(taskName) {
        this.tasks = this.tasks.filter((task) => task.name !== taskName);
    };

    const getTasksToday = function() {
        return this.tasks.filter((task) => {
            const taskDate = new Date(task.getFormattedDate());
            return isToday(toDate(taskDate));
        });
    };

    const getTasksThisWeek = function() {
        return this.tasks.filter((task) => {
            const taskDate = new Date(task.getFormattedDate());
            return isThisWeek(subDays(toDate(taskDate), 1));
        });
    };

    return {
        setName,
        getName,
        setTasks,
        getTasks,
        findTask,
        contains,
        addTask,
        deleteTask,
        getTasksToday,
        getTasksThisWeek
    };
}