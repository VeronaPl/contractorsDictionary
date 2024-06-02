import { sendClientData } from "./clientsApi.js";
import { createClientsForm } from "./createModalForm.js";
import { validateClientForm } from "./validateForm.js";

export const editClientModal = (data) => {
  const editModal = document.createElement("div");
  const editModalContent = document.createElement("div");
  const createForm = createClientsForm();
  const titleId = document.createElement("span");

  titleId.classList.add("modal__id");
  editModal.classList.add("modal-edit", "site-modal", "modal-active");
  editModalContent.classList.add(
    "edit-modal__content",
    "site-modal__content",
    "modal-active"
  );

  titleId.textContent = "ID: " + data.id.substr(0, 8);
  createForm.modalTitle.textContent = "Изменить данные";

  createForm.modalClose.addEventListener("click", () => {
    editModal.remove();
  });

  createForm.inputName.value = data.name;
  createForm.inputType.value = data.type;
  createForm.inputInn.value = data.inn;

  createForm.form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateClientForm()) {
      return;
    }

    let client = {};
    client.name = createForm.inputName.value;
    client.type = createForm.inputType.value;
    client.inn = createForm.inputInn.value;

    const spinner = document.querySelector(".modal__spinner");

    try {
      spinner.style.display = "block";
      await sendClientData(client, "PATCH", data.id);
      setTimeout(() => {
        editModal.remove();
      }, 1500);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => (spinner.style.display = "block"), 1500);
    }
  });

  createForm.modalTitle.append(titleId);
  editModalContent.append(
    createForm.modalClose,
    createForm.modalTitle,
    createForm.form
  );
  editModal.append(editModalContent);

  document.addEventListener("click", (e) => {
    if (e.target == editModal) {
      editModal.remove();
    }
  });

  return {
    editModal,
    editModalContent,
  };
};
