import './styles.css';
import Task from './modules/task';
import Project from './modules/project';
import List from './modules/list';
import make_UI from './modules/ui';
import { add } from 'date-fns';

const UI = new make_UI();
const projectList = new List();

document.querySelector('.add-btn').addEventListener('click', projectInput);
document.querySelector('.add-task-btn').addEventListener('click', taskInput);

// make a popup menu to add a project to the project list
function projectInput() {
    if (document.querySelector('.popup')) return;
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = 
    `<input type='text' class='proj-input
    ' placeholder='Project Name'>
    <button class='proj-submit'>Submit</button>`;
    document.querySelector('.project-container').appendChild(popup);
    document.querySelector('.proj-submit').addEventListener('click', () => {
        if (document.querySelector('.proj-input').value === '') return;
        const projName = document.querySelector('.proj-input').value;
        const newProject = new Project(projName);
        projectList.addProject(newProject);
        document.querySelector('.project-container').removeChild(popup);
        UI.addProject(newProject);
    });
}

function taskInput() {
    if (document.querySelector('.task-popup')) return;
    const taskPopup = document.createElement('div');
    taskPopup.classList.add('task-popup');
    taskPopup.innerHTML = 
    `<div class='task-input-wrapper'>
        <input type='text' class='task-input
        ' placeholder='Task Name'>
        <input type='date' class='date-input
    ' placeholder='Due Date'>
    </div>
    <button class='task-submit'>Submit</button>
    <button class='task-cancel'>Cancel</button>`;
    document.querySelector('.task-page').appendChild(taskPopup);
    document.querySelector('.add-task-btn').style.display = 'none';
    document.querySelector('.task-cancel').addEventListener('click', () => {
        document.querySelector('.task-page').removeChild(taskPopup);
        document.querySelector('.add-task-btn').style.display = 'block';
    });
    document.querySelector('.task-submit').addEventListener('click', () => {
        if (document.querySelector('.task-input').value === '') return;
        const taskName = document.querySelector('.task-input').value;
        const taskDate = document.querySelector('.date-input').value;
        const newTask = new Task(taskName, taskDate);
        const currentProject = projectList.getProject(document.querySelector('.curr-proj-name').textContent);
        currentProject.addTask(newTask);
        document.querySelector('.task-page').removeChild(taskPopup);
        UI.loadTasks(currentProject);
        document.querySelector('.add-task-btn').style.display = 'block';
    });
}