import { createClientsSection } from "./createClientsSection.js";
import { getClients } from "./clientsApi.js";
import { createClientItem } from "./createClientItem.js";
import { sortTable } from "./sortClientsTable.js";

const createApp = async () => {
  const clientSection = await createClientsSection();
  document.body.append(clientSection.main);
  const preloader = document.querySelector(".preloader");
  const tableWrapper = document.querySelector(".clients__wrapper");

  try {
    tableWrapper.style.overflow = "visible";
    const clients = await getClients();

    for (const client of clients) {
      document
        .querySelector(".clients__tbody")
        .append(createClientItem(client));
    }
  } catch (error) {
    console.log(error);
  } finally {
    console.log(preloader);
    preloader.remove();
    tableWrapper.style.overflow = "auto";
  }
};

createApp();
document.addEventListener("DOMContentLoaded", sortTable);
