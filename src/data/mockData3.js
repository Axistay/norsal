import { motion } from 'framer-motion';

// tanger
export const menuData = {
  categories: [
    {
      id: 1,
      name: {
        en: "BREAKFAST",
        fr: "PETIT DEJEUNER",
        es: "DESAYUNO",
        ar: "الإفطار"
      },
      description: {
        en: "DELICIOUS BREAKFAST To start the day right",
        fr: "PETIT-DEJEUNER DELICIEUX Pour bien commencer la journée",
        es: "DELICIOSO DESAYUNO Para empezar bien el día",
        ar: "إفطار لذيذ لبداية يوم رائع"
      },
      color: "bg-yellow-900",
      border: "border-yellow-900",
      shadow: "shadow-yellow-500",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGW6OFzhQ8WjJ0MAhtNUtLYPmWd-JI8jpZlA&s",
    },
    {
      id: 2,
      name: {
        en: "À LA CARTE",
        fr: "À LA CARTE",
        es: "A LA CARTA",
        ar: "من القائمة"
      },
      description: {
        en: "Choose from a wide variety of dishes, prepared just the way you like.",
        fr: "Choisissez parmi une grande variété de plats, préparés selon vos envies.",
        es: "Elija entre una amplia variedad de platos, preparados a su gusto.",
        ar: "اختر من مجموعة واسعة من الأطباق المحضّرة كما تحب."
      },
      color: "bg-sky-900",
      border: "border-sky-900",
      shadow: "shadow-sky-600",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCQmTIEbs6OVhbMQBkqvode0ui9gBssZx11w&s",
    },
  ],
  types: [

    {
      id: 101,
      name: {
        en: "CLASSIC",
        fr: "CLASSIQUE",
        es: "CLÁSICO",
        ar: "كلاسيكي"
      },
      categoryId: 1
    },
    {
      id: 102,
      name: {
        en: "FASSI",
        fr: "FASSI",
        es: "FASSI",
        ar: "فاسي"
      },
      categoryId: 1
    },
    {
      id: 103,
      name: {
        en: "SPLENDIDE",
        fr: "SPLENDIDE",
        es: "ESPLÉNDIDO",
        ar: "رائع"
      },
      categoryId: 1
    },
    {
      id: 104,
      name: {
        en: "HOLLANDAIS",
        fr: "HOLLANDAIS",
        es: "HOLANDÉS",
        ar: "هولندي"
      },
      categoryId: 1
    },
    {
      id: 105,
      name: {
        en: "CATALAN",
        fr: "CATALAN",
        es: "CATALÁN",
        ar: "كتالوني"
      },
      categoryId: 1
    },
    {
      id: 106,
      name: {
        en: "KIDS",
        fr: "ENFANTS",
        es: "NIÑOS",
        ar: "أطفال"
      },
      categoryId: 1
    },
    {
      id: 107,
      name: {
        en: "BEACH CLUB",
        fr: "BEACH CLUB",
        es: "CLUB DE PLAYA",
        ar: "نادي الشاطئ"
      },
      categoryId: 1
    },
    {
      id: 108,
      name: {
        en: "MAROCAIN",
        fr: "MAROCAIN",
        es: "MARROQUÍ",
        ar: "مغربي"
      },
      categoryId: 1
    },

    // la carte
    {
      id: 201,
      name: {
        en: "À LA CARTE",
        fr: "À LA CARTE",
        es: "A LA CARTA",
        ar: "من القائمة"
      },
      categoryId: 2
    },
    {
      id: 202,
      name: {
        en: "OMELETTES",
        fr: "OMELETTES",
        es: "TORTILLAS",
        ar: "عجة"
      },
      categoryId: 2
    },
    {
      id: 203,
      name: {
        en: "TURQUE",
        fr: "TURQUE",
        es: "TURCO",
        ar: "تركي"
      },
      categoryId: 2
    },
    {
      id: 204,
      name: {
        en: "SUPRÊME",
        fr: "SUPRÊME",
        es: "SUPREMO",
        ar: "فاخر"
      },
      categoryId: 2
    },
    {
      id: 205,
      name: {
        en: "DE LUXE",
        fr: "DE LUXE",
        es: "DE LUJO",
        ar: "فاخر جداً"
      },
      categoryId: 2
    },



  ],
  plates: [

    {
      id: 1,
      title: {
        en: "TURQUE",
        fr: "TURQUE",
        es: "TURCO",
        ar: "تركي"
      },
      description: {
        en: "Eggs, tomato sauce, cheese, hot drink, juice, mineral water, yogurt",
        fr: "Œufs, sauce tomate, fromage, boisson chaude, jus naturel, eau minérale, yaourt",
        es: "Huevos, salsa de tomate, queso, bebida caliente, jugo, agua mineral, yogur",
        ar: "بيض، صلصة طماطم، جبن، مشروب ساخن، عصير طبيعي، ماء معدني، ياغورت"
      },
      price: 50.00,
      image: "https://media.istockphoto.com/id/500293328/photo/breakfast-with-sunny-side-up-eggs-and-sausage.jpg?s=612x612&w=0&k=20&c=gamN8WnMHzyJhDyW73xrkY86Q5yDriWGjF6UtWi3PQc=",
      categoryId: 1,
      typeId: 103,
      nutrition: {
        calories: 500,
        protein: 20,
        fat: 25,
        carbs: 40
      }
    },
    {
      id: 2,
      title: {
        en: "SUPRÊME",
        fr: "SUPRÊME",
        es: "SUPREMO",
        ar: "فاخر"
      },
      description: {
        en: "Eggs, onion, mushroom, pepper, cherry tomato, cheese, juice, hot drink, mineral water, yogurt",
        fr: "Œufs, oignon, champignon, poivre, tomate cerise, fromage, jus naturel, boisson chaude, eau minérale, yaourt",
        es: "Huevos, cebolla, champiñón, pimienta, tomate cherry, queso, jugo, bebida caliente, agua mineral, yogur",
        ar: "بيض، بصل، فطر، فلفل، طماطم كرزية، جبن، عصير طبيعي، مشروب ساخن، ماء معدني، ياغورت"
      },
      price: 55.00,

      image: "https://media.istockphoto.com/id/500293328/photo/breakfast-with-sunny-side-up-eggs-and-sausage.jpg?s=612x612&w=0&k=20&c=gamN8WnMHzyJhDyW73xrkY86Q5yDriWGjF6UtWi3PQc=",
      categoryId: 1,
      typeId: 104,
      nutrition: {
        calories: 600,
        protein: 25,
        fat: 30,
        carbs: 45
      }
    },
    {
      id: 3,
      title: {
        en: "DE LUXE",
        fr: "DE LUXE",
        es: "DE LUJO",
        ar: "فاخر جداً"
      },
      description: {
        en: "Quail eggs, cherry tomato, mushroom, beef pastrami, special cheese, juice, hot drink, mineral water, yogurt",
        fr: "Œufs de caille, tomate cerise, champignon, pastrami de bœuf, fromage spécial, jus naturel, boisson chaude, eau minérale, yaourt",
        es: "Huevos de codorniz, tomate cherry, champiñón, pastrami de res, queso especial, jugo, bebida caliente, agua mineral, yogur",
        ar: "بيض السمان، طماطم كرزية، فطر، باسترامي اللحم، جبن خاص، عصير طبيعي، مشروب ساخن، ماء معدني، ياغورت"
      },
      price: 70.00,

      image: "https://media.istockphoto.com/id/500293328/photo/breakfast-with-sunny-side-up-eggs-and-sausage.jpg?s=612x612&w=0&k=20&c=gamN8WnMHzyJhDyW73xrkY86Q5yDriWGjF6UtWi3PQc=",
      categoryId: 1,
      typeId: 105,
      nutrition: {
        calories: 700,
        protein: 30,
        fat: 35,
        carbs: 50
      }
    },

    {
      id: 4,
      title: {
        en: "2 Eggs",
        fr: "2 Œufs",
        es: "2 Huevos",
        ar: "بيضتان"
      },
      description: {
        en: "2 cooked eggs served your way",
        fr: "2 œufs cuits à votre convenance",
        es: "2 huevos cocinados a tu gusto",
        ar: "بيضتان مطهوتان حسب رغبتك"
      },
      price: 25.00,

      image: "https://media.istockphoto.com/id/500293328/photo/breakfast-with-sunny-side-up-eggs-and-sausage.jpg?s=612x612&w=0&k=20&c=gamN8WnMHzyJhDyW73xrkY86Q5yDriWGjF6UtWi3PQc=",
      categoryId: 1,
      typeId: 102,
      nutrition: {
        calories: 160,
        protein: 12,
        fat: 11,
        carbs: 1
      }
    },
    {
      id: 5,
      title: {
        en: "Harcha",
        fr: "Harcha",
        es: "Harcha",
        ar: "حرشة"
      },
      description: {
        en: "Traditional Moroccan semolina bread",
        fr: "Pain marocain traditionnel à la semoule",
        es: "Pan marroquí tradicional de sémola",
        ar: "خبز مغربي تقليدي مصنوع من السميد"
      },
      price: 12.00,

      image: "https://media.istockphoto.com/id/500293328/photo/breakfast-with-sunny-side-up-eggs-and-sausage.jpg?s=612x612&w=0&k=20&c=gamN8WnMHzyJhDyW73xrkY86Q5yDriWGjF6UtWi3PQc=",
      categoryId: 1,
      typeId: 101,
      nutrition: {
        calories: 300,
        protein: 5,
        fat: 10,
        carbs: 45
      }
    },
    {
      id: 6,
      title: {
        en: "Nature Omelette",
        fr: "Omelette Nature",
        es: "Tortilla Natural",
        ar: "عجة طبيعية"
      },
      description: {
        en: "Plain omelette made with fresh eggs",
        fr: "Omelette nature préparée avec des œufs frais",
        es: "Tortilla natural hecha con huevos frescos",
        ar: "عجة بيض طبيعية محضرة من بيض طازج"
      },
      price: 25.00,

      image: "https://media.istockphoto.com/id/500293328/photo/breakfast-with-sunny-side-up-eggs-and-sausage.jpg?s=612x612&w=0&k=20&c=gamN8WnMHzyJhDyW73xrkY86Q5yDriWGjF6UtWi3PQc=",
      categoryId: 1,
      typeId: 102,
      nutrition: {
        calories: 220,
        protein: 14,
        fat: 18,
        carbs: 2
      }
    },
    {
      id: 7,
      title: {
        en: "Cheese Omelette",
        fr: "Omelette Fromage",
        es: "Tortilla de Queso",
        ar: "عجة بالجبن"
      },
      description: {
        en: "Omelette with melted cheese",
        fr: "Omelette au fromage fondu",
        es: "Tortilla con queso derretido",
        ar: "عجة بالجبن المذاب"
      },
      price: 30.00,

      image: "https://media.istockphoto.com/id/500293328/photo/breakfast-with-sunny-side-up-eggs-and-sausage.jpg?s=612x612&w=0&k=20&c=gamN8WnMHzyJhDyW73xrkY86Q5yDriWGjF6UtWi3PQc=",
      categoryId: 1,
      typeId: 102,
      nutrition: {
        calories: 280,
        protein: 16,
        fat: 22,
        carbs: 3
      }
    },
    {
      id: 8,
      title: {
        en: "À LA CARTE",
        fr: "À LA CARTE",
        es: "A LA CARTA",
        ar: "من القائمة"
      },
      description: {
        en: "A selection of dishes from our à la carte menu.",
        fr: "Une sélection de plats de notre menu à la carte.",
        es: "Una selección de platos de nuestro menú a la carta.",
        ar: "مجموعة من الأطباق من قائمة الطعام لدينا."
      },
      price: 45.00,

      image: "https://media.istockphoto.com/id/500293328/photo/breakfast-with-sunny-side-up-eggs-and-sausage.jpg?s=612x612&w=0&k=20&c=gamN8WnMHzyJhDyW73xrkY86Q5yDriWGjF6UtWi3PQc=",
      categoryId: 2,
      typeId: 201,
      nutrition: {
        calories: 400,
        protein: 20,
        fat: 15,
        carbs: 50
      }
    },
    {
      id: 9,
      title: {
        en: "OMELETTES",
        fr: "OMELETTES",
        es: "TORTILLAS",
        ar: "عجة"
      },
      description: {
        en: "Delicious omelettes made to order.",
        fr: "Délicieuses omelettes préparées à la commande.",
        es: "Deliciosas tortillas hechas a pedido.",
        ar: "عجة لذيذة تُعد عند الطلب."
      },
      price: 50.00,

      image: "https://media.istockphoto.com/id/500293328/photo/breakfast-with-sunny-side-up-eggs-and-sausage.jpg?s=612x612&w=0&k=20&c=gamN8WnMHzyJhDyW73xrkY86Q5yDriWGjF6UtWi3PQc=",
      categoryId: 2,
      typeId: 202,
      nutrition: {
        calories: 350,
        protein: 18,
        fat: 12,
        carbs: 40
      }
    },
    {
      id: 10,
      title: {
        en: "TURQUE",
        fr: "TURQUE",
        es: "TURCO",
        ar: "تركي"
      },
      description: {
        en: "A traditional Turkish dish with a twist.",
        fr: "Un plat turc traditionnel avec une touche.",
        es: "Un plato turco tradicional con un giro.",
        ar: "طبق تركي تقليدي مع لمسة."
      },
      price: 55.00,

      image: "https://media.istockphoto.com/id/500293328/photo/breakfast-with-sunny-side-up-eggs-and-sausage.jpg?s=612x612&w=0&k=20&c=gamN8WnMHzyJhDyW73xrkY86Q5yDriWGjF6UtWi3PQc=",
      categoryId: 2,
      typeId: 203,
      nutrition: {
        calories: 500,
        protein: 25,
        fat: 20,
        carbs: 45
      }
    },
    {
      id: 11,
      title: {
        en: "SUPRÊME",
        fr: "SUPRÊME",
        es: "SUPREMO",
        ar: "فاخر"
      },
      description: {
        en: "An exquisite dish for the discerning palate.",
        fr: "Un plat exquis pour le palais exigeant.",
        es: "Un plato exquisito para el paladar exigente.",
        ar: "طبق رائع للذوق الرفيع."
      },
      price: 60.00,

      image: "https://media.istockphoto.com/id/500293328/photo/breakfast-with-sunny-side-up-eggs-and-sausage.jpg?s=612x612&w=0&k=20&c=gamN8WnMHzyJhDyW73xrkY86Q5yDriWGjF6UtWi3PQc=",
      categoryId: 2,
      typeId: 204,
      nutrition: {
        calories: 600,
        protein: 30,
        fat: 25,
        carbs: 50
      }
    },
    {
      id: 12,
      title: {
        en: "DE LUXE",
        fr: "DE LUXE",
        es: "DE LUJO",
        ar: "فاخر جداً"
      },
      description: {
        en: "A luxurious dish for a special occasion.",
        fr: "Un plat luxueux pour une occasion spéciale.",
        es: "Un plato lujoso para una ocasión especial.",
        ar: "طبق فاخر لمناسبة خاصة."
      },
      price: 70.00,

      image: "https://media.istockphoto.com/id/500293328/photo/breakfast-with-sunny-side-up-eggs-and-sausage.jpg?s=612x612&w=0&k=20&c=gamN8WnMHzyJhDyW73xrkY86Q5yDriWGjF6UtWi3PQc=",
      categoryId: 2,
      typeId: 205,
      nutrition: {
        calories: 700,
        protein: 35,
        fat: 30,
        carbs: 60
      }
    },

  ]
};


