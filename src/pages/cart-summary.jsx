import { useLocation } from "react-router-dom";
import { menuData } from "../data/mockData1";
import { useTranslation } from "react-i18next";

const allData = menuData;

const CartSummary = () => {
  const { t, i18n } = useTranslation();
  const langused = i18n.language;
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const rawData = params.get("data");

  if (!rawData) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">No cart data found</h2>
      </div>
    );
  }

  let data;
  try {
    const decoded = atob(rawData);
    const json = decodeURIComponent(escape(decoded));
    data = JSON.parse(json);
  } catch (err) {
    return (
      <div className="p-6 text-center text-red-600">
        <h2 className="text-xl font-semibold mb-4">Error loading cart summary.</h2>
        <p>{err.message}</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{t("Cart Summary")}</h1>
      <p className="mb-6 text-gray-100" >
        {t("City ID")}: <strong>{data.cityId}</strong>
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {data.items.map((item, idx) => {
          const fullDetails = allData?.plates?.find((p) => p.id === item.id);
          if (!fullDetails) return null;

          return (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md p-4 flex gap-4 items-center"
            >
              <img
                src={fullDetails.image || "/placeholder.svg"}
                alt={fullDetails.title[langused]}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">
                  {fullDetails.title[langused]}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {fullDetails.price.toFixed(2)} MAD
                </p>
                <div className="mt-2 flex justify-between text-sm font-medium">
                  <span>
                    {t("Quantity")}: {item.quantity}
                  </span>
                  <span>
                    {t("Total")}: {(fullDetails.price * item.quantity).toFixed(2)} MAD
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-right font-bold text-2xl border-t pt-4">
        {t("Total")}: {data.total.toFixed(2)} MAD
      </div>
    </div>
  );
};

export default CartSummary;
