export const menuData = {
  categories: [
    {
      id: 1,
      name: {
        en: "FINE DINING",
        fr: "HAUTE CUISINE",
        es: "ALTA COCINA",
        ar: "مطبخ فاخر"
      },
      description: {
        en: "Exquisite fine dining experience with premium ingredients.",
        fr: "Expérience de haute cuisine exquise avec des ingrédients premium.",
        es: "Experiencia de alta cocina exquisita con ingredientes premium.",
        ar: "تجربة طعام فاخر رائعة مع مكونات فاخرة."
      },
      color: "blue-700",
      border: "border-blue-700",
      shadow: "shadow-blue-500",
      image: "https://brigade-hocare.com/info/wp-content/uploads/2024/09/decoration-restaurant.png"
    },
    {
      id: 2,
      name: {
        en: "MOROCCAN SPECIALTIES",
        fr: "SPÉCIALITÉS MAROCAINES",
        es: "ESPECIALIDADES MARROQUÍES",
        ar: "تخصصات مغربية"
      },
      description: {
        en: "Traditional Moroccan dishes with modern twists.",
        fr: "Plats marocains traditionnels avec des touches modernes.",
        es: "Platos marroquíes tradicionales con toques modernos.",
        ar: "أطباق مغربية تقليدية مع لمسات عصرية."
      },
      color: "orange-700",
      border: "border-orange-700",
      shadow: "shadow-orange-500",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
    },
    {
      id: 3,
      name: {
        en: "DESSERTS",
        fr: "DESSERTS",
        es: "POSTRES",
        ar: "الحلويات"
      },
      description: {
        en: "Artisanal desserts and pastries.",
        fr: "Desserts et pâtisseries artisanales.",
        es: "Postres y pastelería artesanal.",
        ar: "حلويات ومعجنات حرفية."
      },
      color: "pink-700",
      border: "border-pink-700",
      shadow: "shadow-pink-500",
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
    }
  ],

  plates: [
    {
      id: 1,
      title: {
        en: "Wagyu Beef Steak",
        fr: "Steak de Bœuf Wagyu",
        es: "Filete de Ternera Wagyu",
        ar: "ستيك لحم واغيو"
      },
      description: {
        en: "Premium Wagyu beef steak with truffle sauce",
        fr: "Steak de bœuf Wagyu premium avec sauce aux truffes",
        es: "Filete de ternera Wagyu premium con salsa de trufa",
        ar: "ستيك لحم واغيو فاخر مع صلصة الكمأة"
      },
      price: 85.0,
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d",
      categoryId: 1,
      typeId: 101
    },
    {
      id: 2,
      title: {
        en: "Lobster Thermidor",
        fr: "Homard Thermidor",
        es: "Bogavante Thermidor",
        ar: "كركند ثيرميدور"
      },
      description: {
        en: "Classic French lobster dish with cognac sauce",
        fr: "Plat de homard français classique avec sauce cognac",
        es: "Plato clásico francés de bogavante con salsa de coñac",
        ar: "طبق كركند فرنسي كلاسيكي مع صلصة الكونياك"
      },
      price: 65.0,
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641",
      categoryId: 1,
      typeId: 101
    },
    {
      id: 3,
      title: {
        en: "Couscous Royal",
        fr: "Couscous Royal",
        es: "Cuscús Real",
        ar: "كسكس ملكي"
      },
      description: {
        en: "Traditional Moroccan couscous with lamb and vegetables",
        fr: "Couscous marocain traditionnel avec agneau et légumes",
        es: "Cuscús marroquí tradicional con cordero y verduras",
        ar: "كسكس مغربي تقليدي مع لحم الضأن والخضروات"
      },
      price: 28.0,
      image: "https://images.unsplash.com/photo-1515443961218-a51367888e4b",
      categoryId: 2,
      typeId: 201
    },
    {
      id: 4,
      title: {
        en: "Tagine of Lamb",
        fr: "Tajine d'Agneau",
        es: "Tajín de Cordero",
        ar: "طاجين لحم الضأن"
      },
      description: {
        en: "Slow-cooked lamb tagine with prunes and almonds",
        fr: "Tajine d'agneau mijoté avec pruneaux et amandes",
        es: "Tajín de cordero cocido a fuego lento con ciruelas y almendras",
        ar: "طاجين لحم ضأن مطهو ببطء مع البرقوق واللوز"
      },
      price: 32.0,
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641",
      categoryId: 2,
      typeId: 201
    },
    {
      id: 5,
      title: {
        en: "Chocolate Soufflé",
        fr: "Soufflé au Chocolat",
        es: "Soufflé de Chocolate",
        ar: "سوفليه شوكولاتة"
      },
      description: {
        en: "Warm chocolate soufflé with vanilla ice cream",
        fr: "Soufflé au chocolat chaud avec glace à la vanille",
        es: "Soufflé de chocolate caliente con helado de vainilla",
        ar: "سوفليه شوكولاتة دافئ مع آيس كريم فانيليا"
      },
      price: 15.0,
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187",
      categoryId: 3,
      typeId: 301
    }
  ],

  types: [
    {
      id: 101,
      name: {
        en: "FINE DINING",
        fr: "HAUTE CUISINE",
        es: "ALTA COCINA",
        ar: "مطبخ فاخر"
      },
      categoryId: 1
    },
    {
      id: 201,
      name: {
        en: "MOROCCAN",
        fr: "MAROCAIN",
        es: "MARROQUÍ",
        ar: "مغربي"
      },
      categoryId: 2
    },
    {
      id: 301,
      name: {
        en: "DESSERTS",
        fr: "DESSERTS",
        es: "POSTRES",
        ar: "الحلويات"
      },
      categoryId: 3
    }
  ]
}; 