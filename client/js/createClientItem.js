import { deleteClientModal } from "./createDeleteModal.js";
import { editClientModal } from "./editClient.js";
import { svgSpinner } from "./svg.js";

export const createClientItem = (data) => {
  const clientTr = document.createElement("tr");
  const clientIdTd = document.createElement("td");
  const clientId = document.createElement("span");
  const clientName = document.createElement("td");
  const clientType = document.createElement("td");
  const clientInn = document.createElement("td");
  const clientActions = document.createElement("td");
  const clientEdit = document.createElement("button");
  const clientDelete = document.createElement("button");
  const deleteClient = deleteClientModal();
  const editClient = editClientModal(data);
  const editSpinner = document.createElement("span");
  const deleteSpinner = document.createElement("span");

  editSpinner.classList.add("actions__spinner");
  deleteSpinner.classList.add("actions__spinner");
  clientTr.classList.add("clients__item");
  clientTr.id = data.id;
  clientIdTd.classList.add("client__id");
  clientName.classList.add("clients__name");
  clientType.classList.add("clients__type");
  clientInn.classList.add("clients__inn");
  clientActions.classList.add("clients__actions");
  clientDelete.classList.add("clients__delete", "btn-reset");
  clientEdit.classList.add("clients__edit", "btn-reset");

  const deleteById = () => {
    import("./clientsApi.js").then(({ deleteClientItem }) => {
      deleteClient.deleteModalDelete.addEventListener("click", () => {
        try {
          deleteClient.deleteSpinner.style.display = "block";

          setTimeout(() => {
            deleteClientItem(data.id);
            document.getElementById(data.id).remove();
          }, 1000);
        } catch (error) {
          console.log(error);
        } finally {
          setTimeout(
            () => (deleteClient.deleteSpinner.style.display = "none"),
            1000
          );
        }
      });
    });
  };

  clientDelete.addEventListener("click", () => {
    deleteSpinner.style.display = "block";
    clientDelete.classList.add("action-wait");

    setTimeout(() => {
      deleteById();
      document.body.append(deleteClient.deleteModal);

      deleteSpinner.style.display = "none";
      clientDelete.classList.remove("action-wait");
    }, 500);
  });

  clientEdit.addEventListener("click", () => {
    editSpinner.style.display = "block";
    clientEdit.classList.add("action-wait");

    setTimeout(() => {
      document.body.append(editClient.editModal);

      editSpinner.style.display = "none";
      clientEdit.classList.remove("action-wait");
    }, 500);
  });

  deleteSpinner.innerHTML = svgSpinner;
  editSpinner.innerHTML = svgSpinner;
  clientId.textContent = data.id.substr(0, 8);
  clientName.textContent = data.name;
  clientType.textContent = data.type;
  clientInn.textContent = data.inn.substr(0, 10);
  clientEdit.textContent = "Изменить";
  clientDelete.textContent = "Удалить";

  clientIdTd.append(clientId);
  clientDelete.append(deleteSpinner);
  clientEdit.append(editSpinner);
  clientActions.append(clientEdit, clientDelete);
  clientTr.append(clientIdTd, clientName, clientType, clientInn, clientActions);

  return clientTr;
};
