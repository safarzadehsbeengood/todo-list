import './styles.css';
import Task from './modules/task';
import Project from './modules/project';
import List from './modules/list';
import make_UI from './modules/ui';

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

let i = 1;

document.querySelector('.add-btn').onclick = function() {
    const p = new Project(`clicked ${i}`);
    projectList.addProject(p);
    p.addTask(new Task(`bruh ${i}`, '05-22-2095'));
    i += 1
    UI.addProject(p);
}

// UI.loadTasks(testProject);