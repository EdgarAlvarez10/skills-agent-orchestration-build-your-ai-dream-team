const state = {
  projects: [],
  search: "",
  status: "all",
  priority: "all",
  sort: "priority"
};

const elements = {
  list: document.querySelector("#project-list"),
  count: document.querySelector("#project-count"),
  search: document.querySelector("#project-search"),
  status: document.querySelector("#status-filter"),
  priority: document.querySelector("#priority-filter"),
  sort: document.querySelector("#sort-projects"),
  clear: document.querySelector("#clear-filters")
};

const priorityRank = { high: 0, medium: 1, low: 2 };
const statusRank = { blocked: 0, active: 1, proposal: 2, done: 3 };

function text(value, fallback) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function normaliseProject(project, index) {
  const owner = typeof project.owner === "object" && project.owner !== null
    ? text(project.owner.name, "Unassigned")
    : text(project.owner, "Unassigned");
  const status = text(project.status, "proposal").toLowerCase();
  const priority = text(project.priority, "medium").toLowerCase();

  return {
    id: text(project.id, `project-${index + 1}`),
    name: text(project.name || project.title, "Untitled project"),
    description: text(project.description, "No project summary available."),
    owner,
    status: statusRank[status] === undefined ? "proposal" : status,
    recentActivity: text(project.recentActivity, "No recent activity."),
    priority: priorityRank[priority] === undefined ? "medium" : priority,
    dueDate: project.dueDate || null,
    progress: Number.isFinite(project.progress) ? Math.min(100, Math.max(0, project.progress)) : 0,
    tags: Array.isArray(project.tags) ? project.tags.filter((tag) => typeof tag === "string") : []
  };
}

function createElement(tag, className, content) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (content !== undefined) element.textContent = content;
  return element;
}

function createProjectCard(project) {
  const card = createElement("article", "project-card");
  card.dataset.status = project.status;
  card.dataset.priority = project.priority;

  const header = createElement("div", "project-card-header");
  const title = createElement("h3", "project-title", project.name);
  const priority = createElement("span", `badge priority-${project.priority}`, `${project.priority} priority`);
  header.append(title, priority);

  const meta = createElement("div", "project-meta");
  meta.append(
    createElement("span", `badge status-${project.status}`, project.status),
    createElement("span", "project-owner", `Owner: ${project.owner}`)
  );

  const description = createElement("p", "project-description", project.description);
  const activityLabel = createElement("h4", "project-field-label", "Recent activity");
  const activity = createElement("p", "project-activity", project.recentActivity);
  const footer = createElement("footer", "project-card-footer");
  footer.append(
    createElement("span", "project-progress", `${project.progress}% complete`),
    createElement("span", "project-due-date", project.dueDate ? `Due ${project.dueDate}` : "No due date")
  );

  card.append(header, meta, description, activityLabel, activity, footer);
  return card;
}

function getVisibleProjects() {
  const query = state.search.toLowerCase();
  return state.projects
    .filter((project) => state.status === "all" || project.status === state.status)
    .filter((project) => state.priority === "all" || project.priority === state.priority)
    .filter((project) => !query || [project.name, project.owner, project.recentActivity].join(" ").toLowerCase().includes(query))
    .sort((first, second) => {
      if (state.sort === "name") return first.name.localeCompare(second.name);
      if (state.sort === "status") return statusRank[first.status] - statusRank[second.status];
      return priorityRank[first.priority] - priorityRank[second.priority];
    });
}

function render() {
  const projects = getVisibleProjects();
  elements.list.replaceChildren();
  elements.list.setAttribute("aria-busy", "false");
  elements.count.textContent = `${projects.length} of ${state.projects.length} projects`;

  if (!projects.length) {
    const empty = createElement("div", "empty-state");
    empty.append(
      createElement("h3", "empty-state-title", "No projects match those filters"),
      createElement("p", "empty-state-message", "Try a broader search or clear the filters to see the full portfolio.")
    );
    elements.list.append(empty);
    return;
  }

  projects.forEach((project) => elements.list.append(createProjectCard(project)));
}

function showMessage(title, message, className) {
  elements.list.replaceChildren();
  elements.list.setAttribute("aria-busy", "false");
  elements.count.textContent = "Project data unavailable";
  const stateMessage = createElement("div", `${className} empty-state`);
  stateMessage.append(createElement("h3", "empty-state-title", title), createElement("p", "empty-state-message", message));
  elements.list.append(stateMessage);
}

function bindFilters() {
  elements.search.addEventListener("input", (event) => { state.search = event.target.value.trim(); render(); });
  elements.status.addEventListener("change", (event) => { state.status = event.target.value; render(); });
  elements.priority.addEventListener("change", (event) => { state.priority = event.target.value; render(); });
  elements.sort.addEventListener("change", (event) => { state.sort = event.target.value; render(); });
  elements.clear.addEventListener("click", () => {
    state.search = "";
    state.status = "all";
    state.priority = "all";
    state.sort = "priority";
    elements.search.value = "";
    elements.status.value = "all";
    elements.priority.value = "all";
    elements.sort.value = "priority";
    render();
    elements.search.focus();
  });
}

async function loadProjects() {
  try {
    const response = await fetch("project-data.json", { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`Project data request failed with ${response.status}`);
    const data = await response.json();
    if (!data || !Array.isArray(data.projects)) throw new Error("Project data has an invalid shape");
    if (!data.projects.length) {
      showMessage("No projects yet", "Project data is empty. Add a project to start tracking the portfolio.", "empty-data");
      return;
    }
    state.projects = data.projects.map(normaliseProject);
    render();
  } catch (error) {
    showMessage("We could not load the projects", "Check that the data file is available, then refresh the page to try again.", "error-state");
  }
}

bindFilters();
loadProjects();