export const menuData = {
  categories: [
    {
      id: 1,
      name: {
        en: "SEAFOOD",
        fr: "FRUITS DE MER",
        es: "MARISCOS",
        ar: "المأكولات البحرية"
      },
      description: {
        en: "Fresh seafood caught daily from the Mediterranean.",
        fr: "Fruits de mer frais pêchés quotidiennement en Méditerranée.",
        es: "Mariscos frescos pescados diariamente en el Mediterráneo.",
        ar: "مأكولات بحرية طازجة تُصطاد يومياً من البحر المتوسط."
      },
      color: "teal-700",
      border: "border-teal-700",
      shadow: "shadow-teal-500",
      image: "https://poitoux.fr/wp-content/uploads/2022/02/outdoor-chairs-and-lounge-chairs-Fast-e1645544705166.jpg"
    },
    {
      id: 2,
      name: {
        en: "BEACH GRILL",
        fr: "GRILLADE DE PLAGE",
        es: "PARRILLA DE PLAYA",
        ar: "شواء الشاطئ"
      },
      description: {
        en: "Grilled specialties perfect for beach dining.",
        fr: "Spécialités grillées parfaites pour le dîner en bord de mer.",
        es: "Especialidades a la parrilla perfectas para cenar en la playa.",
        ar: "تخصصات مشوية مثالية لتناول الطعام على الشاطئ."
      },
      color: "orange-700",
      border: "border-orange-700",
      shadow: "shadow-orange-500",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
    },
    {
      id: 3,
      name: {
        en: "COCKTAILS",
        fr: "COCKTAILS",
        es: "COCTELES",
        ar: "كوكتيلات"
      },
      description: {
        en: "Refreshing cocktails and beach drinks.",
        fr: "Cocktails rafraîchissants et boissons de plage.",
        es: "Cócteles refrescantes y bebidas de playa.",
        ar: "كوكتيلات منعشة ومشروبات الشاطئ."
      },
      color: "purple-700",
      border: "border-purple-700",
      shadow: "shadow-purple-500",
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
    }
  ],

  plates: [
    {
      id: 1,
      title: {
        en: "Grilled Sea Bass",
        fr: "Bar Grillé",
        es: "Lubina a la Plancha",
        ar: "قاروص مشوي"
      },
      description: {
        en: "Fresh Mediterranean sea bass with herbs and lemon",
        fr: "Bar de Méditerranée frais avec herbes et citron",
        es: "Lubina mediterránea fresca con hierbas y limón",
        ar: "قاروص متوسطي طازج مع الأعشاب والليمون"
      },
      price: 35.0,
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288",
      categoryId: 1,
      typeId: 101
    },
    {
      id: 2,
      title: {
        en: "Seafood Paella",
        fr: "Paella aux Fruits de Mer",
        es: "Paella de Mariscos",
        ar: "باييلا مأكولات بحرية"
      },
      description: {
        en: "Traditional Spanish paella with fresh seafood",
        fr: "Paella espagnole traditionnelle avec fruits de mer frais",
        es: "Paella española tradicional con mariscos frescos",
        ar: "باييلا إسبانية تقليدية مع مأكولات بحرية طازجة"
      },
      price: 28.0,
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641",
      categoryId: 1,
      typeId: 101
    },
    {
      id: 3,
      title: {
        en: "Beach Burger",
        fr: "Burger de Plage",
        es: "Hamburguesa de Playa",
        ar: "برغر الشاطئ"
      },
      description: {
        en: "Juicy beef burger with beach special sauce",
        fr: "Burger de bœuf juteux avec sauce spéciale plage",
        es: "Hamburguesa de ternera jugosa con salsa especial de playa",
        ar: "برغر لحم بقري عصيري مع صلصة الشاطئ الخاصة"
      },
      price: 22.0,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      categoryId: 2,
      typeId: 201
    },
    {
      id: 4,
      title: {
        en: "Grilled Shrimp Skewers",
        fr: "Brochettes de Crevettes Grillées",
        es: "Brochetas de Gambas a la Plancha",
        ar: "أسياخ روبيان مشوي"
      },
      description: {
        en: "Fresh shrimp skewers with garlic butter",
        fr: "Brochettes de crevettes fraîches avec beurre à l'ail",
        es: "Brochetas de gambas frescas con mantequilla de ajo",
        ar: "أسياخ روبيان طازجة مع زبدة الثوم"
      },
      price: 26.0,
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641",
      categoryId: 2,
      typeId: 201
    },
    {
      id: 5,
      title: {
        en: "Beach Sunset Cocktail",
        fr: "Cocktail Coucher de Soleil",
        es: "Cóctel Atardecer de Playa",
        ar: "كوكتيل غروب الشمس"
      },
      description: {
        en: "Tropical cocktail with rum and fresh fruit",
        fr: "Cocktail tropical avec rhum et fruits frais",
        es: "Cóctel tropical con ron y frutas frescas",
        ar: "كوكتيل استوائي مع الروم والفواكه الطازجة"
      },
      price: 12.0,
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
      categoryId: 3,
      typeId: 301
    },
    {
      id: 6,
      title: {
        en: "Mojito",
        fr: "Mojito",
        es: "Mojito",
        ar: "موخيتو"
      },
      description: {
        en: "Classic mojito with fresh mint and lime",
        fr: "Mojito classique avec menthe fraîche et citron vert",
        es: "Mojito clásico con menta fresca y lima",
        ar: "موخيتو كلاسيكي مع النعناع الطازج والليمون الحامض"
      },
      price: 10.0,
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
      categoryId: 3,
      typeId: 301
    }
  ],

  types: [
    {
      id: 101,
      name: {
        en: "SEAFOOD",
        fr: "FRUITS DE MER",
        es: "MARISCOS",
        ar: "المأكولات البحرية"
      },
      categoryId: 1
    },
    {
      id: 201,
      name: {
        en: "BEACH GRILL",
        fr: "GRILLADE DE PLAGE",
        es: "PARRILLA DE PLAYA",
        ar: "شواء الشاطئ"
      },
      categoryId: 2
    },
    {
      id: 301,
      name: {
        en: "COCKTAILS",
        fr: "COCKTAILS",
        es: "COCTELES",
        ar: "كوكتيلات"
      },
      categoryId: 3
    }
  ]
}; 