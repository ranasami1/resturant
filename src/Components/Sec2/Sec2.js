import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Spiner } from '../spinner/spinner';
import { AppContext } from '../../App';
import { useTranslation } from 'react-i18next';

export function Sec2() {
  const { meal, Category, lng, loading } = useContext(AppContext);
  const { t } = useTranslation();

  const getCategoryName = (cat) => {
    return lng === 'ar' ? cat.ar_category_name : cat.en_category_name;
  };

  const getCategoryImage = (itemsObj) => {
    // ناخد أول صورة موجودة جوه details لأي عنصر
    const values = Object.values(itemsObj.details || {}).flat();
    const firstItemWithImage = values.find(item => item[0]);
    return firstItemWithImage;
  };

  const getItemsCount = (itemsObj) => {
    return Object.values(itemsObj.details || {}).flat().length;
  };

  if (loading) return <Spiner />;

  return (
    <div>
      <h2 className="title tracking-in-expand">{t('Categories')}</h2>
      <div className="container-fluid d-flex gap-3 align-items-center justify-content-center flex-wrap">
        {meal.map((category, key) => (
          <Card
            key={key}
            style={{
              width: '18rem',
              margin: '10px',
              cursor: 'pointer'
            }}
          >
            <Card.Img
              src={getCategoryImage(category.items)}
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
                {getCategoryName(category)}
              </Card.Title>
              <Card.Text
                style={{
                  fontSize: '0.9rem',
                  color: '#666',
                  marginBottom: '15px',
                  textAlign: lng === 'ar' ? 'right' : 'left'
                }}
              >
                {getItemsCount(category.items)} {lng === 'ar' ? 'عنصر' : 'items'}
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
        ))}
      </div>
    </div>
  );
}
