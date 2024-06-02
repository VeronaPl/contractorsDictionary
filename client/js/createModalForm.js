import { svgSpinner } from "./svg.js";
import { validateClientForm } from "./validateForm.js";

export const createClientsForm = () => {
  const modalTitle = document.createElement("h2");
  const modalClose = document.createElement("button");
  const form = document.createElement("form");
  const inputName = document.createElement("input");
  const labelName = document.createElement("label");
  const inputType = document.createElement("input");
  const labelType = document.createElement("label");
  const inputInn = document.createElement("input");
  const labelInn = document.createElement("label");
  const requiredName = document.createElement("span");
  const requiredType = document.createElement("span");
  const saveBtn = document.createElement("button");
  const formFloatingName = document.createElement("div");
  const formFloatingType = document.createElement("div");
  const formFloatingInn = document.createElement("div");
  const saveSpinner = document.createElement("span");

  const errorBlock = document.createElement("p");
  const unacceptableLetter = document.createElement("span");
  const writeName = document.createElement("span");
  const writeType = document.createElement("span");
  const writeInn = document.createElement("span");
  const requiredValue = document.createElement("span");

  saveSpinner.classList.add("modal__spinner");
  modalTitle.classList.add("modal__title");
  modalClose.classList.add("modal__close", "btn-reset");
  form.classList.add("modal__form");
  formFloatingName.classList.add("form-floating");
  formFloatingType.classList.add("form-floating");
  formFloatingInn.classList.add("form-floating");
  inputName.classList.add("modal__input");
  inputType.classList.add("modal__input");
  inputInn.classList.add("modal__input");
  labelName.classList.add("modal__label");
  labelType.classList.add("modal__label");
  labelInn.classList.add("modal__label");
  requiredName.classList.add("modal__label");
  requiredType.classList.add("modal__label");
  saveBtn.classList.add("modal__btn-save", "btn-reset", "site-btn");
  labelName.for = "floatingName";
  labelType.for = "floatingType";
  labelInn.for = "floatingInn";
  inputName.id = "floatingName";
  inputType.id = "floatingType";
  inputInn.id = "floatingInn";
  inputName.type = "text";
  inputType.type = "text";
  inputInn.type = "text";
  inputName.placeholder = "Название";
  inputType.placeholder = "Тип";
  inputInn.placeholder = "ИНН";

  errorBlock.classList.add("modal__error");
  unacceptableLetter.id = "unacceptableLetter";
  writeName.id = "writeName";
  writeType.id = "writeType";
  writeInn.id = "writeInn";
  requiredValue.id = "requiredValue";

  saveSpinner.innerHTML = svgSpinner;
  modalTitle.textContent = "Новый контрагент";
  labelName.textContent = "Название";
  labelType.textContent = "Тип";
  labelInn.textContent = "ИНН";
  saveBtn.textContent = "Сохранить";
  requiredName.textContent = "*";
  requiredType.textContent = "*";

  labelName.append(requiredName);
  saveBtn.append(saveSpinner);
  labelType.append(requiredType);
  formFloatingName.append(inputName, labelName);
  formFloatingType.append(inputType, labelType);
  formFloatingInn.append(inputInn, labelInn);
  errorBlock.append(
    writeName,
    writeType,
    writeInn,
    requiredValue,
    unacceptableLetter
  );
  form.append(
    formFloatingName,
    formFloatingType,
    formFloatingInn,
    errorBlock,
    saveBtn
  );

  return {
    form,
    modalClose,
    modalTitle,
    inputName,
    inputType,
    inputInn,
    labelName,
    labelType,
    labelInn,
  };
};
