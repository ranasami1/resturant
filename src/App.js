// App.js
import './App.css';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Header from './Components/Header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './Components/Home/Home';
import { Menue } from './Components/Menue/Menu';
import ContactUs from './Components/ContactUs/ContactUs';
import AboutUs from './Components/AboutUs/AboutUs';
import { useState, createContext, useEffect } from 'react';
import axios from 'axios';
import Footer from './Components/Footer/Footer';
import { initReactI18next, useTranslation } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import Cookies from 'js-cookie';

export const AppContext = createContext();

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    lng: 'ar',
    fallbackLng: 'en',
    detection: {
      order: ['cookie', 'htmlTag', 'sessionStorage', 'navigator', 'localStorage', 'path', 'subdomain'],
      caches: ['cookie'],
    },
    backend: {
      loadPath: `/locale/{{lng}}/transilition.json`,
    },
  });

function App() {
  const { t } = useTranslation();
  const [cat, setCat] = useState();
  const [menu, setMenu] = useState([]);
  const [meal, setMeal] = useState([]);
  const [isArabic, setIsArabic] = useState(false);
  const [loading, setLoading] = useState(true);

  // Function to get category display names
  const getCategoryDisplayName = (categoryKey) => {
    const categoryNames = {
      'main_dishes': {
        ar: 'الأطباق الرئيسية',
        en: 'Main Dishes'
      },
      'sandwiches': {
        ar: 'السندويتشات',
        en: 'Sandwiches'
      },
      'side_dishes': {
        ar: 'الأطباق الجانبية',
        en: 'Side Dishes'
      },
      'extras_and_additions': {
        ar: 'الإضافات والمكملات',
        en: 'Extras and Additions'
      },
      'desserts': {
        ar: 'الحلويات',
        en: 'Desserts'
      },
      'beverages': {
        ar: 'المشروبات',
        en: 'Beverages'
      }
    };

    return categoryNames[categoryKey] || {
      ar: categoryKey.replace(/_/g, ' '),
      en: categoryKey.replace(/_/g, ' ')
    };
  };

  function Categories() {
    setLoading(true);
    axios
      .get('/items.json') 
      .then((res) => {
        // Transform the object of arrays to an array of categories with items
        const menuData = res.data.menu;
        const categoryArray = Object.entries(menuData).map(([key, items]) => {
          const displayNames = getCategoryDisplayName(key);
          return {
            categoryKey: key, 
            en_category_name: displayNames.en,
            ar_category_name: displayNames.ar,
            items: {
              details: items,
            },
          };
        });
        setMeal(categoryArray);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading JSON:', err);
        setLoading(false);
      });
  }

  function Category(selectedCategory) {
    console.log('Selected Category:', selectedCategory);
    
    // Enhanced category data for localStorage
    const enhancedCategory = {
      ...selectedCategory,
      categoryDisplayName: selectedCategory.en_category_name,
      timestamp: new Date().getTime() // Add timestamp for cache management
    };
    
    // Store in localStorage - note this won't work in Claude artifacts but will work in real app
    try {
      localStorage.setItem('menue', JSON.stringify(enhancedCategory));
    } catch (error) {
      console.warn('localStorage not available:', error);
      // In Claude artifacts, we can use a state fallback
      setCat(enhancedCategory);
    }
  }

  // Function to get cart items count (for future cart functionality)
  const getCartItemsCount = () => {
    try {
      const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
      return cartItems.length;
    } catch {
      return 0;
    }
  };

  // Function to add item to cart (for future implementation)
  const addToCart = (item) => {
    try {
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const newCart = [...existingCart, { ...item, cartId: Date.now() }];
      localStorage.setItem('cart', JSON.stringify(newCart));
      console.log('Item added to cart:', item);
    } catch (error) {
      console.warn('Could not add to cart:', error);
    }
  };

  const lng = Cookies.get('i18next') || 'ar';

  useEffect(() => {
    Categories();
    document.dir = i18next.dir();
    if (lng === 'ar') {
      setIsArabic(true);
    } else {
      setIsArabic(false);
    }
  }, [lng]);

  // Update document direction when language changes
  useEffect(() => {
    document.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
  }, [lng]);

  return (
    <AppContext.Provider value={{ 
      cat, 
      setCat,
      menu, 
      setMenu, 
      meal, 
      Category, 
      t, 
      lng,
      loading,
      addToCart,
      getCartItemsCount
    }}>
      <div className={`App ${isArabic ? 'arFont' : ''}`}>
        <Header />

        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menue />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </Router>

        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;