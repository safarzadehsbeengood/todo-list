import { format } from "date-fns";
import Project from "./project";
import Task from "./task";
import List from "./list";

export default class make_UI {
  // create a new project button and switch to this project on clicking
  addProject(project) {
    const projectContainer = document.querySelector(".project-container");
    const btnWrapper = document.createElement("div");

    btnWrapper.classList.add("proj-btn-wrapper");
    btnWrapper.classList.add(project.getName().replace(/[^a-zA-Z0-9]/g, ''));

    const newProject = document.createElement("button");
    const removeBtn = document.createElement("button");

    removeBtn.textContent = "X";
    removeBtn.classList.add("proj-remove-btn");
    removeBtn.style.background = "pink";

    newProject.textContent = project.getName();
    newProject.classList.add("proj-button");

    btnWrapper.appendChild(removeBtn);
    btnWrapper.appendChild(newProject);

    projectContainer.appendChild(btnWrapper);
    newProject.addEventListener("click", () => {
      this.switchProject(project);
    });
  }

  loadProjects(projects) {
    const projectContainer = document.querySelector(".project-container");
    for (let project of projects) {
      if (project.getName() === "Today" || project.getName() === "This Week")
        continue;
      const btn = document.createElement("button");
      const removeBtn = document.createElement("button");
      removeBtn.addEventListener("click", () => {
        this.removeProject(project);
      });
      removeBtn.textContent = "X";
      removeBtn.classList.add("proj-remove-btn");
      btn.appendChild(removeBtn);
      btn.textContent = project.getName();
      btn.style.width = "100%";
      btn.addEventListener("click", () => {
        document.querySelector(".task-page").innerHTML = "";
        this.loadTasks(project);
      });
      projectContainer.appendChild(btn);
    }
  }

  // project is a Project()
  loadTasks(project) {
    const taskContainer = document.querySelector(".tasks-container");
    taskContainer.innerHTML = "";
    document.querySelector(".curr-proj-name").textContent = project.getName();
    for (let task of project.getTasks()) {
      taskContainer.innerHTML += `
            <div class='task-wrapper'>
                <button class='task-btn'>${task.getName()}</button>
                <p>Due Date: ${task.getFormattedDate()}</p>
            </div>
            `;
    }
    if (project.getName() === "Today" || project.getName() === "This Week") {
      document.querySelector(".add-task-btn").style.display = "none";
    } else {
      document.querySelector(".add-task-btn").style.display = "block";
    }
  }

  switchProject(newProject) {
    document.querySelector(".tasks-container").innerHTML = "";
    this.loadTasks(newProject);
  }

  removeProject(toRemove) {
    for (const project of document
      .querySelector(".project-container")
      .querySelectorAll(".proj-btn-wrapper")) {
      const projButton = project.querySelector(".proj-button");
      if (projButton.textContent === toRemove.getName()) {
        document
          .querySelector(".project-container")
          .removeChild(projButton.parentNode);
        break;
      }
    }
  }
}
