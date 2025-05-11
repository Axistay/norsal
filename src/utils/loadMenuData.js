// src/utils/loadMenuData.js
'../data/'

export async function loadMenuData() {
    const cityID = localStorage.getItem("selectedCity");
  
    switch (cityID) {
      case "nador":
        return (await import("../data/mockData1")).menuData;
      case "al_hoceima":
        return (await import("../data/mockData2")).menuData;
      case "tanger":
        return (await import("../data/mockData3")).menuData;
      default:
        return { categories: [], plates: [], types: [] };
    }
  }
  