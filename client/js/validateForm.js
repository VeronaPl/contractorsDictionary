export const validateClientForm = () => {
  const userName = document.getElementById("floatingName");
  const userType = document.getElementById("floatingType");
  const userInn = document.getElementById("floatingInn");
  const unacceptableLetter = document.getElementById("unacceptableLetter");
  const writeName = document.getElementById("writeName");
  const writeType = document.getElementById("writeType");
  const writeInn = document.getElementById("writeInn");
  const requiredValue = document.getElementById("requiredValue");
  const validateArray = [
    unacceptableLetter,
    writeName,
    writeType,
    writeInn,
    requiredValue,
  ];
  const regexp = /[^а-яА-ЯёЁ]+$/g;
  const regexpNum = /[^\d{10,12}]+$/g;
  const onlyNumbers = /[^0-9]+$/g;
  const onlyEmail = /[^a-zA-Z|@|.]+$/g;

  const onInputValue = (input) => {
    input.addEventListener("input", () => {
      input.style.borderColor = "var(--color-gray-suit)";
      for (const item of validateArray) {
        item.textContent = "";
      }
    });

    input.oncut =
      input.oncopy =
      input.onpaste =
        () => {
          input.style.borderColor = "var(--color-gray-suit)";
          for (const item of validateArray) {
            item.textContent = "";
          }
        };

    input.onchange = () => {
      input.style.borderColor = "var(--color-gray-suit)";

      if (userType.value && userName.value && userInn.value) {
        for (const item of validateArray) {
          item.textContent = "";
        }
      }
    };
  };

  onInputValue(userName);
  onInputValue(userType);
  onInputValue(userInn);

  const checkRequiredName = (input, message, name) => {
    if (!input.value) {
      input.style.borderColor = "var(--color-burnt-sienna)";
      message.textContent = `Введите ${name.toLowerCase()} контрагента!`;
      return false;
    } else {
      message.textContent = "";
    }

    return true;
  };

  const checkByRegexp = (input, regexp) => {
    if (regexp.test(input.value.trim())) {
      input.style.borderColor = "var(--color-burnt-sienna)";
      unacceptableLetter.textContent = "Недопустимые символы!";
      return false;
    } else if (input == userInn) {
      if (input.value.trim().length < 10 || input.value.trim().length > 12) {
        input.style.borderColor = "var(--color-burnt-sienna)";
        unacceptableLetter.textContent = "Некорректный ИНН!";
        return false;
      }
    }

    return true;
  };

  if (!checkRequiredName(userType, writeType, "Тип")) {
    return false;
  }
  if (!checkRequiredName(userName, writeName, "Название")) {
    return false;
  }
  if (!checkRequiredName(userInn, writeInn, "ИНН")) {
    return false;
  }
  if (!checkByRegexp(userType, regexp)) {
    return false;
  }
  if (!checkByRegexp(userInn, regexpNum)) {
    return false;
  }

  return true;
};
