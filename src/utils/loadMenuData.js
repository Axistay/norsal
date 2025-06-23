// src/utils/loadMenuData.js

export async function loadMenuData() {
  const cityID = localStorage.getItem("selectedCity");
  const menuID = localStorage.getItem("idMenu");

  switch (cityID) {
    case "nador":
      return (await import("../data/mockData1")).menuData;

    case "al_hoceima":
      if (menuID === "1") {
        console.log("Menu ID:", menuID);
        console.log("City ID:", cityID);
        return (await import("../data/alhoceimaMenu1")).menuData;
      } else if (menuID === "2") {
        return (await import("../data/alhoceimaMenu2")).menuData;
      } else {
        console.warn("Unknown menu ID for Al Hoceima:", menuID);
        return { categories: [], plates: [], types: [] };
      }

    case "tanger":
      return (await import("../data/mockData3")).menuData;

    default:
      return { categories: [], plates: [], types: [] };
  }
}
