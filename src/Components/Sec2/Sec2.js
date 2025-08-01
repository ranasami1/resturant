import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { Spiner } from "../spinner/spinner";
import { AppContext } from "../../App";
import { useTranslation } from "react-i18next";

export function Sec2() {
  const { meal, lng, loading,Category } = useContext(AppContext);
  const { t } = useTranslation();

  const getCategoryImage = (itemsObj) => {
    const values = Object.values(itemsObj.details || {}).flat();
    const firstItemWithImage = values.find((item) => item[0]);
    return firstItemWithImage;
  };
  const getCategoryName = (categoryKey, lng) => {
    // Create a mapping of category keys to display names
    const categoryNames = {
      main_dishes: {
        ar: "الأطباق الرئيسية",
        en: "Main Dishes",
      },
      sandwiches: {
        ar: "السندويتشات",
        en: "Sandwiches",
      },
      side_dishes: {
        ar: "الأطباق الجانبية",
        en: "Side Dishes",
      },
      extras_and_additions: {
        ar: "الإضافات والخدمات",
        en: "Extras & Additions",
      },
      desserts: {
        ar: "الحلويات",
        en: "Desserts",
      },
      beverages: {
        ar: "المشروبات",
        en: "Beverages",
      },
    };

    return categoryNames[categoryKey]?.[lng] || categoryKey;
  };
  const getItemsCount = (itemsObj) => {
    return Object.values(itemsObj.details || {}).flat().length;
  };

  if (loading) return <Spiner />;

  return (
    <div>
      <h2 className="title tracking-in-expand">{t("Categories")}</h2>
      <div className="container-fluid d-flex gap-3 align-items-center justify-content-center flex-wrap">
        {meal.map((category, key) => (
          <Card
            key={key}
            style={{
              width: "18rem",
              margin: "10px",
              cursor: "pointer",
            }}
          >
            <Card.Img
              src={getCategoryImage(category.items)}
              variant="top"
              alt="category"
              style={{
                maxHeight: "230px",
                objectFit: "cover",
                height: "200px",
              }}
            />
            <Card.Body>
              <Card.Title
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  marginBottom: "15px",
                  textAlign: lng === "ar" ? "right" : "left",
                }}
              >
                {getCategoryName(category.categoryKey, lng)}
              </Card.Title>
              <Card.Text
                style={{
                  fontSize: "0.9rem",
                  color: "#666",
                  marginBottom: "15px",
                  textAlign: lng === "ar" ? "right" : "left",
                }}
              >
                {getItemsCount(category.items)}{" "}
                {lng === "ar" ? "عنصر" : "items"}
              </Card.Text>
              <div className="d-flex justify-content-center">
                <Link
                  to="/menu"
                  style={{ textDecoration: "none", width: "100%" }}
                >
                  <Button
                    variant="warning"
                    onClick={()=>Category(category)}
                    style={{
                      width: "100%",
                      fontWeight: "bold",
                      borderRadius: "25px",
                    }}
                  >
                    {t("View Menu")}
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}
