import Task from './task';
import Project from './project'

export default class List {
    constructor() {
        this.projects = [];
        this.projects.push(new Project("Today"));
        this.projects.push(new Project("This Week"));
    }

    setProjects(projects) {
        this.projects = projects;
    };

    getProjects() {
        return this.projects;
    }

    getProject(name) {
        return this.projects.find((project) => project.getName() === name);
    };

    contains(name) {
        return this.projects.some((project) => project.getName() === name);
    };

    addProject(newProject) {
        if (this.projects.find((project) => project.name === newProject.name)) {
            return
        }
        this.projects.push(newProject);
    };

    deleteProject(name) {
        const toDelete = this.projects.find((project) => project.getName() === name);
        this.projects.splice(this.projects.indexOf(toDelete), 1);
    };

    updateTodayProject() {
        this.getProject("Today").tasks = [];

        this.projects.forEach((project) => {
            if (project.getName() === "Today" || project.getName() === "This Week") {
                return;
            } else {
                const todayTasks = project.getTasksToday();
                todayTasks.forEach((task) => {
                    const taskName = `${task.getName()} (${project.getName()})`;
                    this.getProject('Today').addTask(Task(taskName, task.getDate));
                });
            }
        });
    };

    updateWeekProject() {
        this.getProject('This week').tasks = [];
    
        this.projects.forEach((project) => {
          if (project.getName() === 'Today' || project.getName() === 'This week')
            return;
    
          const weekTasks = project.getTasksThisWeek();
          weekTasks.forEach((task) => {
            const taskName = `${task.getName()} (${project.getName()})`
            this.getProject('This week').addTask(new Task(taskName, task.getDate()))
          });
        });
    
        this.getProject('This week').setTasks(
          this.getProject('This week')
            .getTasks()
            .sort((taskA, taskB) =>
              compareAsc(
                toDate(new Date(taskA.getDateFormatted())),
                toDate(new Date(taskB.getDateFormatted()))
              )
            )
        );
      };

    // return {
    //     setProjects,
    //     getProjects,
    //     getProject,
    //     contains,
    //     addProject,
    //     deleteProject,
    //     updateTodayProject,
    //     updateWeekProject
    // };
}