import { sendClientData } from "./clientsApi.js";
import { createClientsForm } from "./createModalForm.js";
import { validateClientForm } from "./validateForm.js";

export const addClientModal = () => {
  const createForm = createClientsForm();
  const modal = document.createElement("div");
  const modalContent = document.createElement("div");

  modal.classList.add("modal", "site-modal", "modal-active");
  modalContent.classList.add(
    "modal__content",
    "site-modal__content",
    "modal-active"
  );
  createForm.form.classList.add("add-client");

  modal.append(modalContent);
  modalContent.append(
    createForm.modalClose,
    createForm.modalTitle,
    createForm.form
  );

  createForm.form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validateClientForm()) {
      return;
    }

    let clientObj = {};

    clientObj.name = createForm.inputName.value;
    clientObj.type = createForm.inputType.value;
    clientObj.inn = createForm.inputInn.value;
    console.log(clientObj);

    const spinner = document.querySelector('.modal__spinner');

    try {
      spinner.style.display = 'block';
      await sendClientData(clientObj, "POST");  
    } catch (error) {
      console.log(error);
    } finally{
      setTimeout(() => spinner.style.display = 'block', 1000);
    }

  });

  createForm.modalClose.addEventListener("click", () => {
    modal.remove();
  });

  document.addEventListener("click", (e) => {
    if (e.target == modal) {
      modal.remove();
    }
  });

  return modal;
};
