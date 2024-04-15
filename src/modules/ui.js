import { format } from 'date-fns';
import Project from './project';
import Task from './task';
import List from './list';

export default class make_UI {

    // create a new project button and switch to this project on clicking 
    addProject(project) {
        const projectContainer = document.querySelector('.project-container');
        const btnWrapper = document.createElement('div');

        btnWrapper.classList.add('proj-btn-wrapper');

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
            this.switchProject(project);
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
        const taskContainer = document.querySelector('.tasks-container');
        taskContainer.innerHTML = '';
        console.log(project.getTasks());
        document.querySelector('.curr-proj-name').textContent = project.getName();
        for (let task of project.getTasks()) {
            taskContainer.innerHTML += 
            `
            <div class='task-wrapper'>
                <button class='task-btn'>${task.getName()}</button>
                <p>Due Date: ${task.getDate()}</p>
            </div>
            `;
        }
    }

    switchProject(newProject) {
        document.querySelector('.tasks-container').innerHTML = '';
        this.loadTasks(newProject);
    }

    removeProject(toRemove) {
        for (const project of document.querySelector('.project-container').querySelectorAll('.proj-btn-wrapper')) {
            const projButton = project.querySelector('.proj-button');
            if (projButton.textContent === toRemove.getName()) {
                document.querySelector('.project-container').removeChild(projButton.parentNode);
                break;
            }
        }
    }
};