function searchTodo() {
  const searchip = document.getElementById("searchIp");
  if (!searchip) return;

  searchip.addEventListener("input", () => {
    searchit(searchip.value);
  });
}
function gettodo() {
  return document.querySelectorAll("#todolist > li");
}
function isMatch(todoLi, search) {
  if (!todoLi) return false;
  if (search === "") return true;

  const titleli = todoLi.querySelector("p.todo__title");

  if (!titleli) return false;

  return titleli.textContent.toLowerCase().includes(search.toLowerCase());
}
function searchit(search) {
  const gettodoL = gettodo();
  for (const elemtLi of gettodoL) {
    const show = isMatch(elemtLi, search);
    elemtLi.hidden = !show;
  }
}

function filterTodo(statusFt) {
  const gettodoL = gettodo();
  for (const elemtLi of gettodoL) {
    const show = statusFt === "All" || elemtLi.dataset.status === statusFt;
    elemtLi.hidden = !show;
  }
}

function filterst() {
  const filtered = document.getElementById("statusfilter");
  if (!filtered) return;

  filtered.addEventListener("change", () => {
    filterTodo(filtered.value);
  });
}
(() => {
  searchTodo();
  filterst();
})();
