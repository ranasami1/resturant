import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Spiner } from '../spinner/spinner';
import { AppContext } from '../../App';
import { useTranslation } from 'react-i18next';

export function Sec2() {
  const { meal, Category, lng } = useContext(AppContext);
  const { t } = useTranslation();

  
  const getCategoryName = (categoryKey) => {
    const categoryNames = {
      'main_dishes': { ar: 'الأطباق الرئيسية', en: 'Main Dishes' },
      'sandwiches': { ar: 'السندويتشات', en: 'Sandwiches' },
      'side_dishes': { ar: 'الأطباق الجانبية', en: 'Side Dishes' },
      'extras_and_additions': { ar: 'الإضافات والمكملات', en: 'Extras and Additions' },
      'desserts': { ar: 'الحلويات', en: 'Desserts' },
      'beverages': { ar: 'المشروبات', en: 'Beverages' }
    };

    return categoryNames[categoryKey]?.[lng] || categoryKey.replace(/_/g, ' ');
  };


  return (
    <div>
      <h2 className="title tracking-in-expand">{t('Categories')}</h2>
      <div className="container-fluid d-flex gap-3 align-items-center justify-content-center flex-wrap">
        {meal.length > 0 ? (
          meal.map((category, key) => {
            const categoryItems = Array.isArray(category.items.details)
              ? category.items.details
              : Object.values(category.items.details).flat();

            return (
              <Card
                key={key}
                style={{
                  width: '18rem',
                  margin: '10px',
                  cursor: 'pointer'
                }}
              >
                <Card.Img
                  variant="top"
                  alt="category"
                  style={{
                    maxHeight: '230px',
                    objectFit: 'cover',
                    height: '200px'
                  }}
                />
                <Card.Body>
                  <Card.Title
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      marginBottom: '15px',
                      textAlign: lng === 'ar' ? 'right' : 'left'
                    }}
                  >
                    {getCategoryName(category.categoryKey)}
                  </Card.Title>
                  <Card.Text
                    style={{
                      fontSize: '0.9rem',
                      color: '#666',
                      marginBottom: '15px',
                      textAlign: lng === 'ar' ? 'right' : 'left'
                    }}
                  >
                    {categoryItems.length} {lng === 'ar' ? 'عنصر' : 'items'}
                  </Card.Text>
                  <div className="d-flex justify-content-center">
                    <Link to="/menu" style={{ textDecoration: 'none', width: '100%' }}>
                      <Button
                        variant="warning"
                        onClick={() => Category(category)}
                        style={{
                          width: '100%',
                          fontWeight: 'bold',
                          borderRadius: '25px'
                        }}
                      >
                        {t('View Menu')}
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            );
          })
        ) : (
          <Spiner />
        )}
      </div>
    </div>
  );
}
