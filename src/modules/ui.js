import { format } from 'date-fns';
import Project from './project';
import Task from './task';

export default class make_UI {

    // create a new project button and switch to this project on clicking 
    addProject(project) {
        const projectContainer = document.querySelector('.project-container');
        const btnWrapper = document.createElement('div');

        btnWrapper.classList.add('btn-wrapper');

        const newProject = document.createElement('button');
        const removeBtn = document.createElement('button');
        
        removeBtn.textContent = 'X';
        removeBtn.classList.add('proj-remove-btn');
        removeBtn.style.background = 'pink';
        removeBtn.addEventListener('click', () => {
            this.removeProject(project);
        });

        newProject.textContent = project.getName();
        newProject.classList.add('proj-button');

        btnWrapper.appendChild(newProject);
        btnWrapper.appendChild(removeBtn);

        projectContainer.appendChild(btnWrapper);
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
            const removeBtn = document.createElement('button');
            removeBtn.addEventListener('click', () => {
                this.removeProject(project);
            });
            removeBtn.textContent = 'X';
            removeBtn.classList.add('proj-remove-btn');
            btn.appendChild(removeBtn);
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
        taskPg.innerHTML += `<button class='add-task-btn'>+</button>`;
    }

    switchProject(newProject) {
        console.log(newProject);
        document.querySelector('.task-page').innerHTML = '';
        this.loadTasks(newProject);
    }

    removeProject(toRemove) {
        for (const project of document.querySelector('.project-container').querySelectorAll('.btn-wrapper')) {
            const projButton = project.querySelector('.proj-button');
            console.log(projButton.parentNode);
            console.log(`${projButton.textContent} === ${toRemove.getName()}`);
            if (projButton.textContent === toRemove.getName()) {
                document.querySelector('.project-container').removeChild(projButton.parentNode);
                console.log(projButton.parentNode);
                break;
            }
        }
    }
};