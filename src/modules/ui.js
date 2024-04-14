import { format } from 'date-fns';
import Project from './project';
import Task from './task';

export default class make_UI {

    // create a new project button and switch to this project on clicking 
    addProject(project) {
        const projectContainer = document.querySelector('.project-container');
        const newProject = document.createElement('button');
        newProject.textContent = project.getName();
        newProject.classList.add('proj-button');
        projectContainer.appendChild(newProject);
        console.log(project.getName());
        newProject.addEventListener('click', () => {
            document.querySelector('.task-page').innerHTML = '';
            this.loadTasks(project);
        });
        // this.taskPg;
    };

    loadProjects(projects) {
        const projectContainer = document.querySelector('.project-container');
        for (let project of projects) {
            if (project.getName() === 'Today' || project.getName() === 'This Week') continue;
            const btn = document.createElement('button');
            btn.textContent = project.getName();
            btn.style.width = '100%';
            btn.addEventListener('click', () => {
                document.querySelector('.task-page').innerHTML = '';
                this.loadTasks(project);
            });
            projectContainer.appendChild(btn);
        }
    }

    // project is a Project()
    loadTasks(project) {
        const taskPg = document.querySelector('.task-page');
        taskPg.innerHTML = `<h2 class='curr-proj-name'>${project.getName()}</h2>`;
        for (let task of project.getTasks()) {
            taskPg.innerHTML += 
            `<button class='task-btn'>${task.getName()}</button>`;
        }
    }

    switchProject(newProject) {
        console.log(newProject);
        document.querySelector('.task-page').innerHTML = '';
        this.loadTasks(newProject);
    }
};