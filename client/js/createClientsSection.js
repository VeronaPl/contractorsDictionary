import { addClientModal } from "./addClient.js";
import { createPreloader } from "./preloader.js";
import { svgAddUser } from "./svg.js";

export const createClientsSection = () => {
  const section = document.createElement("section");
  const h1 = document.createElement("h1");
  const container = document.createElement("div");
  const main = document.createElement("main");
  const sortingDisplay = document.createElement("thead");
  const theadTr = document.createElement("tr");
  const sortingDisplayId = document.createElement("th");
  const sortingDisplayName = document.createElement("th");
  const sortingDisplayType = document.createElement("th");
  const sortingDisplayInn = document.createElement("th");
  const sortingDisplayActions = document.createElement("th");
  const sortingDisplaySpan = document.createElement("span");
  const addUserBtn = document.createElement("button");
  const addUserBtnSvg = document.createElement("span");
  const tableWrapper = document.createElement("div");
  const clientsTable = document.createElement("table");
  const tbody = document.createElement("tbody");
  const innSpan = document.createElement("span");

  const sortDisplayItems = [
    sortingDisplayId,
    sortingDisplayName,
    sortingDisplayInn,
  ];

  for (const item of sortDisplayItems) {
    item.addEventListener("click", () => {
      if (item.classList.contains("sort-down")) {
        item.classList.remove("sort-down");
        item.classList.add("sort-up");
        if (item.dataset.type === "text") {
          item.querySelector("span").textContent = "а-я";
        }
      } else {
        item.classList.add("sort-down");
        item.classList.remove("sort-up");
        if (item.dataset.type === "text") {
          item.querySelector("span").textContent = "я-а";
        }
      }
    });
  }

  sortingDisplayId.setAttribute("data-type", "id");
  sortingDisplayName.setAttribute("data-type", "text");
  sortingDisplayInn.setAttribute("data-type", "id");

  section.classList.add("clients");
  tableWrapper.classList.add("clients__wrapper");
  h1.classList.add("clients__heading");
  tbody.classList.add("clients__tbody");
  sortingDisplay.classList.add("clients__display", "display-info");
  sortingDisplayId.classList.add(
    "display-info__item",
    "display-info__item--id",
    "sort-up"
  );
  sortingDisplayName.classList.add(
    "display-info__item",
    "display-info__item--name",
    "sort-up"
  );
  sortingDisplayType.classList.add(
    "display-info__item",
    "display-info__item--type"
  );
  sortingDisplayInn.classList.add(
    "display-info__item",
    "display-info__item--inn",
    "sort-up"
  );
  sortingDisplayActions.classList.add(
    "display-info__item",
    "display-info__item--actions"
  );
  sortingDisplaySpan.classList.add("display-info__sorting");
  addUserBtn.classList.add("clients__btn", "btn-reset");
  addUserBtnSvg.classList.add("clients__svg");
  container.classList.add("container", "clients__container");
  clientsTable.classList.add("clients__table");
  main.classList.add("main");
  innSpan.classList.add("clients__inn");

  h1.textContent = "Контрагенты";
  sortingDisplayId.textContent = "id";
  sortingDisplayName.textContent = "Название";
  sortingDisplaySpan.textContent = "а-я";
  sortingDisplayType.textContent = "Тип";
  sortingDisplayInn.textContent = "ИНН";
  sortingDisplayActions.textContent = "Действия ";
  addUserBtn.textContent = "Добавить контрагента";
  addUserBtnSvg.innerHTML = svgAddUser;

  addUserBtn.addEventListener("click", () => {
    document.body.append(addClientModal());
  });

  main.append(section);
  section.append(container);
  sortingDisplayName.appendChild(sortingDisplaySpan);
  sortingDisplayInn.appendChild(innSpan);
  theadTr.append(
    sortingDisplayId,
    sortingDisplayName,
    sortingDisplayType,
    sortingDisplayInn,
    sortingDisplayActions
  );
  sortingDisplay.append(theadTr);
  tableWrapper.append(clientsTable, createPreloader());
  clientsTable.append(sortingDisplay, tbody);
  addUserBtn.append(addUserBtnSvg);
  container.append(h1, tableWrapper, addUserBtn);

  return {
    main,
    clientsTable,
    tbody,
  };
};
