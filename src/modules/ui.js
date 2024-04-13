import { format } from 'date-fns';
import Project from './project';
import Task from './task';

export default class make_UI {
    addProject(name) {
        document.querySelector('.projects').innerHTML = 
        `<h2 class="project-title">
            Projects
        </h2>`
            +
        `<button class='project-btn' style='width: 100%;'>
            ${name}
        </button>` 
            +
        `<button class="add-btn" style="font-size: 30px; width: 100%;">+</button>`;
    };

    loadProjects(projects) {
        const projectContainer = document.querySelector('.projects');
        projectContainer.innerHTML = 
        `<h2 class="project-title">
            Projects
        </h2>`;
        for (let project of projects) {
             projectContainer.innerHTML += 
            `<button class='project-btn' style='width: 100%;>${project.getName()}</button>`;
        }
        projectContainer.innerHTML += `<button class="add-btn" style="font-size: 30px; width: 100%;">+</button>`;
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
};