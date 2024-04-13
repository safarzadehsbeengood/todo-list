import './styles.css';
import Task from './modules/task';
import Project from './modules/project';
import List from './modules/list';
import make_UI from './modules/ui';

const UI = new make_UI();
var projectList = new List();
let testProject = new Project("test");
testProject.addTask(new Task('do homework', '12-24-1992'));
projectList.addProject(testProject);
UI.loadTasks(testProject);