export const menuData = {
  categories: [
    {
      id: 1,
      name: {
        en: "GOLF CLUB SPECIALS",
        fr: "SPÉCIALITÉS GOLF CLUB",
        es: "ESPECIALIDADES GOLF CLUB",
        ar: "تخصصات نادي الجولف"
      },
      description: {
        en: "Exclusive dishes served at our golf club restaurant.",
        fr: "Plats exclusifs servis dans notre restaurant de golf club.",
        es: "Platos exclusivos servidos en nuestro restaurante de golf club.",
        ar: "أطباق حصرية تقدم في مطعم نادي الجولف."
      },
      color: "green-700",
      border: "border-green-700",
      shadow: "shadow-green-500",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 2,
      name: {
        en: "INTERNATIONAL CUISINE",
        fr: "CUISINE INTERNATIONALE",
        es: "COCINA INTERNACIONAL",
        ar: "المطبخ الدولي"
      },
      description: {
        en: "International dishes from around the world.",
        fr: "Plats internationaux du monde entier.",
        es: "Platos internacionales de todo el mundo.",
        ar: "أطباق دولية من جميع أنحاء العالم."
      },
      color: "blue-700",
      border: "border-blue-700",
      shadow: "shadow-blue-500",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
    },
    {
      id: 3,
      name: {
        en: "BEVERAGES",
        fr: "BOISSONS",
        es: "BEBIDAS",
        ar: "المشروبات"
      },
      description: {
        en: "Refreshing drinks and cocktails.",
        fr: "Boissons rafraîchissantes et cocktails.",
        es: "Bebidas refrescantes y cócteles.",
        ar: "مشروبات منعشة وكوكتيلات."
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
        en: "Golf Club Burger",
        fr: "Burger Golf Club",
        es: "Hamburguesa Golf Club",
        ar: "برغر نادي الجولف"
      },
      description: {
        en: "Premium beef burger with golf club special sauce",
        fr: "Burger de bœuf premium avec sauce spéciale golf club",
        es: "Hamburguesa de ternera premium con salsa especial golf club",
        ar: "برغر لحم بقري فاخر مع صلصة نادي الجولف الخاصة"
      },
      price: 25.0,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      categoryId: 1,
      typeId: 101
    },
    {
      id: 2,
      title: {
        en: "Club Sandwich",
        fr: "Sandwich Club",
        es: "Sándwich Club",
        ar: "ساندويتش نادي"
      },
      description: {
        en: "Classic club sandwich with turkey, bacon, and avocado",
        fr: "Sandwich club classique avec dinde, bacon et avocat",
        es: "Sándwich club clásico con pavo, bacon y aguacate",
        ar: "ساندويتش نادي كلاسيكي مع الديك الرومي واللحم المقدد والأفوكادو"
      },
      price: 18.0,
      image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af",
      categoryId: 1,
      typeId: 101
    },
    {
      id: 3,
      title: {
        en: "Grilled Salmon",
        fr: "Saumon Grillé",
        es: "Salmón a la Plancha",
        ar: "سلمون مشوي"
      },
      description: {
        en: "Fresh grilled salmon with seasonal vegetables",
        fr: "Saumon frais grillé avec légumes de saison",
        es: "Salmón fresco a la plancha con verduras de temporada",
        ar: "سلمون طازج مشوي مع خضروات موسمية"
      },
      price: 32.0,
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288",
      categoryId: 2,
      typeId: 201
    },
    {
      id: 4,
      title: {
        en: "Golf Club Coffee",
        fr: "Café Golf Club",
        es: "Café Golf Club",
        ar: "قهوة نادي الجولف"
      },
      description: {
        en: "Premium coffee blend served in golf club style",
        fr: "Mélange de café premium servi dans le style golf club",
        es: "Mezcla de café premium servida al estilo golf club",
        ar: "مزيج قهوة فاخر يقدم بأسلوب نادي الجولف"
      },
      price: 8.0,
      image: "https://img.freepik.com/premium-photo/vertical-view-delicious-coffee-beautiful-white-cup-beans-mix-color-background_461922-19460.jpg",
      categoryId: 3,
      typeId: 301
    }
  ],

  types: [
    {
      id: 101,
      name: {
        en: "GOLF CLUB SPECIALS",
        fr: "SPÉCIALITÉS GOLF CLUB",
        es: "ESPECIALIDADES GOLF CLUB",
        ar: "تخصصات نادي الجولف"
      },
      categoryId: 1
    },
    {
      id: 201,
      name: {
        en: "INTERNATIONAL",
        fr: "INTERNATIONAL",
        es: "INTERNACIONAL",
        ar: "دولي"
      },
      categoryId: 2
    },
    {
      id: 301,
      name: {
        en: "BEVERAGES",
        fr: "BOISSONS",
        es: "BEBIDAS",
        ar: "المشروبات"
      },
      categoryId: 3
    }
  ]
}; 