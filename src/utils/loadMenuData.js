// src/utils/loadMenuData.js

export async function loadMenuData(cityId = null, restaurantName = null) {
  // If no parameters provided, fall back to localStorage for backward compatibility
  if (!cityId) {
    cityId = localStorage.getItem("selectedCity");
  }
  if (!restaurantName) {
    const menuID = localStorage.getItem("idMenu");
    // Map menu ID to restaurant name for backward compatibility
    if (cityId === "nador") {
      if (menuID === "1") restaurantName = "golf";
      else if (menuID === "2") restaurantName = "norsal";
      else if (menuID === "3") restaurantName = "beachclub";
    } else if (cityId === "al_hoceima") {
      if (menuID === "1") restaurantName = "norsal";
      else if (menuID === "2") restaurantName = "terace";
    }
  }

  switch (cityId) {
    case "nador":
      switch (restaurantName) {
        case "golf":
          return (await import("../data/nadorGolfMenu")).menuData;
        case "norsal":
          return (await import("../data/nadorNorsalMenu")).menuData;
        case "beachclub":
          return (await import("../data/nadorBeachClubMenu")).menuData;
        default:
          console.warn("Unknown restaurant for Nador:", restaurantName);
          return { categories: [], plates: [], types: [] };
      }

    case "al_hoceima":
      switch (restaurantName) {
        case "norsal":
          return (await import("../data/alhoceimaMenu1")).menuData;
        case "terace":
          return (await import("../data/alhoceimaMenu2")).menuData;
        default:
          console.warn("Unknown restaurant for Al Hoceima:", restaurantName);
          return { categories: [], plates: [], types: [] };
      }

    case "tanger":
      return (await import("../data/mockData3")).menuData;

    default:
      return { categories: [], plates: [], types: [] };
  }
}
