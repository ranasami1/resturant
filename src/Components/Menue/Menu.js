import "./Menue.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { Spiner } from "../spinner/spinner";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { AppContext } from "../../App";

export function Menue() {
  const { lng } = useContext(AppContext);
  const { t } = useTranslation();

  // Get data from localStorage
  const storedJsonString = localStorage.getItem("menue");
  const retrievedObject = storedJsonString
    ? JSON.parse(storedJsonString)
    : null;

  if (!retrievedObject) {
    return (
      <div className="menu">
        <div
          className="container-fluid d-flex justify-content-center align-items-center"
          style={{ minHeight: "400px" }}
        >
          <div className="text-center">
            <h3>
              {lng === "ar" ? "لم يتم اختيار قسم" : "No category selected"}
            </h3>
            <p>
              {lng === "ar"
                ? "الرجاء العودة واختيار قسم من الأقسام المتاحة"
                : "Please go back and select a category"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Get items array
  const getItems = () => {
    if (retrievedObject.items && retrievedObject.items.details) {
      // Handle different data structures
      if (Array.isArray(retrievedObject.items.details)) {
        return retrievedObject.items.details;
      } else if (typeof retrievedObject.items.details === "object") {
        // If it's an object with arrays, flatten all arrays
        return Object.values(retrievedObject.items.details).flat();
      }
    }
    return [];
  };

  const items = getItems();

  // Function to get item name based on language
  const getItemName = (item) => {
    if (lng === "en") {
      return item.name_en || item.name;
    } else {
      return item.name || item.name_en;
    }
  };

  // Function to get item description
  const getItemDescription = (item) => {
    if (lng === "en") {
      return item.description_en || item.description || "";
    } else {
      return item.description || item.description_en || "";
    }
  };

  // Function to get price display
  const getPriceDisplay = (item) => {
    if (item.price_egypt) {
      return item.price_egypt;
    }
    if (item.price) {
      return `${item.price} ${t("EGP")}`;
    }
    return lng === "ar" ? "اتصل للاستفسار" : "Call for price";
  };

  // Function to get size display
  const getSizeDisplay = (item) => {
    if (!item.size) return null;

    const sizeTranslations = {
      صغير: lng === "ar" ? "صغير" : "Small",
      متوسط: lng === "ar" ? "متوسط" : "Medium",
      كبير: lng === "ar" ? "كبير" : "Large",
      عادي: lng === "ar" ? "عادي" : "Regular",
      وسط: lng === "ar" ? "متوسط" : "Medium",
    };

    return sizeTranslations[item.size] || item.size;
  };

  // Function to get ingredients display
  const getIngredientsDisplay = (item) => {
    if (!item.ingredients || !Array.isArray(item.ingredients)) return null;

    return item.ingredients.join(lng === "ar" ? "، " : ", ");
  };


  return (
    <div className="menu">
      <h1
        className="title tracking-in-expand"
        style={{
          textAlign: lng === "ar" ? "right" : "left",
          marginBottom: "30px",
        }}
      >
        {t(retrievedObject.categoryKey)}
      </h1>

      <div className="container-fluid d-flex gap-3 align-items-center justify-content-center flex-wrap">
        {items.length > 0 ? (
          items.map((item, key) => (
            <Card
              key={key}
              style={{
                width: "320px",
                margin: "10px",
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                transition: "transform 0.2s",
                cursor: "pointer",
              }}
              className="menu-card"
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-5px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <Card.Img
                src={
                  item.image   
                }
                style={{
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <Card.Body style={{ padding: "20px" }}>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <Card.Title
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      marginBottom: "0",
                      flex: 1,
                      textAlign: lng === "ar" ? "right" : "left",
                    }}
                  >
                    {getItemName(item)}
                  </Card.Title>
                  {getSizeDisplay(item) && (
                    <Badge
                      bg="secondary"
                      style={{
                        marginLeft: lng === "ar" ? "0" : "10px",
                        marginRight: lng === "ar" ? "10px" : "0",
                      }}
                    >
                      {getSizeDisplay(item)}
                    </Badge>
                  )}
                </div>

                {getItemDescription(item) && (
                  <Card.Text
                    style={{
                      fontSize: "0.9rem",
                      color: "#666",
                      marginBottom: "10px",
                      textAlign: lng === "ar" ? "right" : "left",
                      lineHeight: "1.4",
                    }}
                  >
                    {getItemDescription(item)}
                  </Card.Text>
                )}

                {getIngredientsDisplay(item) && (
                  <Card.Text
                    style={{
                      fontSize: "0.8rem",
                      color: "#888",
                      marginBottom: "10px",
                      fontStyle: "italic",
                      textAlign: lng === "ar" ? "right" : "left",
                    }}
                  >
                    <strong>{t("Ingredients")}:</strong>{" "}
                    {getIngredientsDisplay(item)}
                  </Card.Text>
                )}

                {item.serves && (
                  <Card.Text
                    style={{
                      fontSize: "0.9rem",
                      color: "#007bff",
                      marginBottom: "10px",
                      textAlign: lng === "ar" ? "right" : "left",
                    }}
                  >
                    {t("Serves")}: {item.serves}
                  </Card.Text>
                )}

                <div className="d-flex justify-content-between align-items-center">
                  <div
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      color: "#e67e22",
                    }}
                  >
                    {getPriceDisplay(item)}
                  </div>

                  <Button
                    variant="warning"
                    size="sm"
                    style={{
                      borderRadius: "20px",
                      fontWeight: "bold",
                      padding: "8px 16px",
                    }}
                    onClick={() => {
                      // Add to cart functionality here
                      console.log("Adding to cart:", item);
                    }}
                  >
                    {t("Add to Cart")}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <div className="w-100 d-flex justify-content-center">
            <Spiner />
          </div>
        )}
      </div>
    </div>
  );
}
