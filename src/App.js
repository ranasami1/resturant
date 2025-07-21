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

  function Categories() {
    setLoading(true);
    axios
      .get('/items.json') 
      .then((res) => {
        // Transform the object of arrays to an array of categories with items
        const menuData = res.data.menu;
        const categoryArray = Object.entries(menuData).map(([key, items]) => {
          return {
            categoryKey: key, 
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
      Categories,
      Category, 
      t, 
      lng,
      loading,
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