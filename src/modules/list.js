import Task from './task';
import Project from './project'

function List() {
    this.projects = [];
    this.projects.push(Project("Today"));
    this.projects.push(Project("This Week"));

    const setProjects = function(projects) {
        this.projects = projects;
    };

    const getProjects = () => this.projects;

    const getProject = function(name) {
        return this.projects.find((project) => project.getName() === name);
    };

    const contains = function(name) {
        return this.projects.some((project) => project.getName() === name);
    };

    const addProject = function(newProject) {
        if (this.projects.find((project) => project.name === newProject.name)) {
            return
        }
        this.projects.push(newProject);
    }

    const removeProject = function(name) {
        const toDelete = this.projects.find((project) => project.getName() === name);
        this.projects.splice(this.projects.indexOf(toDelete), 1);
    }

    
}