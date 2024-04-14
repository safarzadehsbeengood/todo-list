import './styles.css';
import Task from './modules/task';
import Project from './modules/project';
import List from './modules/list';
import make_UI from './modules/ui';
import { add } from 'date-fns';

const UI = new make_UI();
const projectList = new List();
const testProject = new Project("school");
const testProject2 = new Project("goon");

testProject.addTask(new Task('do homework', '12-24-1992'));
testProject2.addTask(new Task('all day', '04-24-2024'));
projectList.addProject(testProject);
projectList.addProject(testProject2);

UI.loadProjects(projectList.getProjects());
UI.loadTasks(testProject);

document.querySelector('.add-btn').addEventListener('click', addProjectPopup);

// make a popup menu to add a project to the project list
function addProjectPopup() {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = 
    `<input type='text' class='proj-input
    ' placeholder='Project Name'>
    <button class='proj-submit'>Submit</button>`;
    document.querySelector('.project-container').appendChild(popup);
    document.querySelector('.proj-submit').addEventListener('click', () => {
        const projName = document.querySelector('.proj-input').value;
        const newProject = new Project(projName);
        projectList.addProject(newProject);
        document.querySelector('.project-container').removeChild(popup);
        UI.addProject(newProject);
    });
}