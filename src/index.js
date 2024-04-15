import "./styles.css";
import Task from "./modules/task";
import Project from "./modules/project";
import List from "./modules/list";
import make_UI from "./modules/ui";
import { add, format } from "date-fns";

const UI = new make_UI();
const projectList = new List();

document.querySelector('.add-task-btn').style.display = 'none';

document.querySelector(".add-btn").addEventListener("click", projectInput);
document.querySelector(".add-task-btn").addEventListener("click", taskInput);

document.querySelector(".today").addEventListener("click", () => {
  projectList.updateTodayProject();
  UI.switchProject(projectList.getProject("Today"));
});

document.querySelector(".this-week").addEventListener("click", () => {
  projectList.updateWeekProject();
  UI.switchProject(projectList.getProject("This Week"));
});

// make a popup menu to add a project to the project list
function projectInput() {
  const popup = document.createElement("div");
  popup.classList.add("proj-input-popup");
  popup.innerHTML = `<div class='proj-input-wrapper'>
        <input type='text' class='proj-input
        ' placeholder='Project Name'>
    </div>
    <div class='proj-submit-wrapper'>
        <button class='proj-submit' style='background: green;'>Submit</button>
        <button class='proj-cancel'>Cancel</button>
    </div>`;
  document.querySelector(".project-container").appendChild(popup);
  document.querySelector(".add-btn").style.display = "none";
  document.querySelector(".proj-cancel").addEventListener("click", () => {
    document.querySelector(".project-container").removeChild(popup);
    document.querySelector(".add-btn").style.display = "block";
  });
  document.querySelector(".proj-submit").addEventListener("click", () => {
    if (document.querySelector(".proj-input").value === "") return;
    const projName = document.querySelector(".proj-input").value;
    const newProject = new Project(projName);
    projectList.addProject(newProject);
    document.querySelector(".project-container").removeChild(popup);
    UI.addProject(newProject);
    document.querySelector(".add-btn").style.display = "block";
    document
      .querySelector(`.proj-btn-wrapper.${projName.replace(/[^a-zA-Z0-9]/g, '')}`)
      .querySelector(".proj-remove-btn")
      .addEventListener("click", () => {
        projectList.deleteProject(projName);
        if (
          document.querySelector(".curr-proj-name").textContent === projName
        ) {
          document.querySelector(".task-page").innerHTML = "";
        }
        UI.removeProject(newProject);
      });
  });
}

function taskInput() {
    // create a popup menu to add a task to the current project
  const taskPopup = document.createElement("div");
  taskPopup.classList.add("task-popup");
  taskPopup.innerHTML = `<div class='task-input-wrapper'>
            <input type='text' class='task-input
            ' placeholder='Task Name'>
            <input type='date' class='date-input
        ' placeholder='Due Date'>
        </div>
        <div class='task-submit-cancel-wrapper'>
            <button class='task-submit'>Submit</button>
            <button class='task-cancel'>Cancel</button>
        </div>`;

    // append the popup to the task page
  document.querySelector(".task-page").appendChild(taskPopup);
  // hide the add task button
  document.querySelector(".add-task-btn").style.display = "none";
  // add event listeners to the submit and cancel buttons
  document.querySelector(".task-cancel").addEventListener("click", () => {
    document.querySelector(".task-page").removeChild(taskPopup);
    document.querySelector(".add-task-btn").style.display = "block";
  });
  document.querySelector(".task-submit").addEventListener("click", () => {
    if (
      document.querySelector(".task-input").value === "" ||
      document.querySelector(".date-input").value == ""
    )
      return;
    const taskName = document.querySelector(".task-input").value;
    const taskDate = document.querySelector(".date-input").value;
    let formattedDate = taskDate.split("-"); // [year, month, day]
    console.log(`Date: ${taskDate}`);
    const newTask = new Task(
      taskName,
      new Date(
        parseInt(formattedDate[0]),
        parseInt(formattedDate[1]),
        parseInt(formattedDate[2])
      )
    );
    const currentProject = projectList.getProject(
      document.querySelector(".curr-proj-name").textContent
    );
    currentProject.addTask(newTask);
    document.querySelector(".task-page").removeChild(taskPopup);
    UI.loadTasks(currentProject);
    document.querySelector(".add-task-btn").style.display = "block";
    console.log(projectList.getProjects());
  });
}
