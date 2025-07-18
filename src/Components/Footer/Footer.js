import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faXTwitter, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './footer.css';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../App';

export default function Footer() {
  const { t } = useTranslation();
  const { lng } = useContext(AppContext);

  // Restaurant data from JSON
  const restaurantData = {
    name: "كشري التحرير",
    name_en: "Koshary El Tahrir",
    established: "1963",
    phone: "19719",
    working_hours: {
      open: "09:00",
      close: "24:00"
    },
    delivery: {
      available: true,
      hours: {
        start: "09:00",
        end: "02:00"
      }
    },
    branches: {
      cairo: [
        {
          name: "فرع المعادي",
          name_en: "Maadi Branch",
          address: "شارع النصر، بجوار مؤمن، المعادي الجديدة",
          address_en: "Al-Nasr Street, next to Moamen, New Maadi",
          area: "المعادي",
          area_en: "Maadi"
        },
        {
          name: "فرع عباس العقاد",
          name_en: "Abbas El Akkad Branch", 
          address: "شارع عباس العقاد",
          address_en: "Abbas El Akkad Street",
          area: "مصر الجديدة",
          area_en: "Heliopolis"
        }
      ],
      zagazig: [
        {
          name: "فرع المحطة",
          name_en: "Central Station Branch",
          address: "ميدان التحرير",
          address_en: "Tahrir Square",
          phones: ["01212333375", "01022661477"]
        }
      ]
    }
  };

  const getRestaurantName = () => {
    return lng === 'en' ? restaurantData.name_en : restaurantData.name;
  };

  const getWorkingHours = () => {
    const open = restaurantData.working_hours.open;
    const close = restaurantData.working_hours.close;
    return `${open} - ${close}`;
  };

  const getDeliveryHours = () => {
    const start = restaurantData.delivery.hours.start;
    const end = restaurantData.delivery.hours.end;
    return `${t("Delivery")}: ${start} - ${end}`;
  };

  return (
    <footer className='mt-5 py-4 bg-dark text-light'>
      <div className='container'>
        {/* Restaurant Info Section */}
        <div className='row mb-4'>
          <div className='col-md-4 mb-3'>
            <h5 style={{ fontWeight: "bold", color: "#f39c12" }}>
              {getRestaurantName()}
            </h5>
            <p className='mb-1'>
              <small>
                {t("Since")} {restaurantData.established}
              </small>
            </p>
            <p className='mb-1'>
              <FontAwesomeIcon icon={faClock} className='me-2' />
              {getWorkingHours()}
            </p>
            <p className='mb-1'>
              <FontAwesomeIcon icon={faClock} className='me-2' />
              {getDeliveryHours()}
            </p>
          </div>

          {/* Contact Section */}
          <div className='col-md-4 mb-3'>
            <h6 style={{ fontWeight: "bold", marginBottom: "15px" }}>
              {t("Contact Us")}
            </h6>
            <div className='mb-2'>
              <FontAwesomeIcon icon={faPhone} className='me-2' />
              <a href={`tel:${restaurantData.phone}`} className='text-light text-decoration-none'>
                {restaurantData.phone}
              </a>
            </div>
            
            {/* Additional phone numbers from branches */}
            {restaurantData.branches.zagazig[0].phones.map((phone, index) => (
              <div key={index} className='mb-1'>
                <FontAwesomeIcon icon={faPhone} className='me-2' />
                <a href={`tel:${phone}`} className='text-light text-decoration-none'>
                  {phone}
                </a>
              </div>
            ))}
          </div>

          {/* Branches Section */}
          <div className='col-md-4 mb-3'>
            <h6 style={{ fontWeight: "bold", marginBottom: "15px" }}>
              {t("Our Branches")}
            </h6>
            
            {/* Cairo Branches */}
            <div className='mb-2'>
              <strong>{t("Cairo")}:</strong>
              {restaurantData.branches.cairo.slice(0, 2).map((branch, index) => (
                <div key={index} className='small mb-1'>
                  <FontAwesomeIcon icon={faMapMarkerAlt} className='me-1' />
                  {lng === 'en' ? branch.area_en || branch.area : branch.area}
                </div>
              ))}
            </div>

            {/* Zagazig Branches */}
            <div>
              <strong>{t("Zagazig")}:</strong>
              <div className='small mb-1'>
                <FontAwesomeIcon icon={faMapMarkerAlt} className='me-1' />
                {t("Al Tahrir Square")}
              </div>
            </div>

            {/* International Branches */}
            <div className='mt-2'>
              <small>
                <strong>{t("Also in")}:</strong><br/>
                {t("Saudi Arabia")} - {t("Qatar")}
              </small>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className='row mb-3'>
          <div className='col-12'>
            <div className='d-flex gap-4 align-items-center justify-content-center flex-wrap'>
              <a 
                href='https://www.facebook.com/KosharyElTahrir' 
                target='_blank' 
                rel='noopener noreferrer'
                className='text-light'
                style={{ fontSize: '1.5rem' }}
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a 
                href='https://x.com/KosharyElTahrir' 
                target='_blank'
                rel='noopener noreferrer' 
                className='text-light'
                style={{ fontSize: '1.5rem' }}
              >
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
              <a 
                href='https://www.youtube.com/channel/KosharyElTahrir' 
                target='_blank'
                rel='noopener noreferrer' 
                className='text-light'
                style={{ fontSize: '1.5rem' }}
              >
                <FontAwesomeIcon icon={faYoutube} />
              </a>
              <a 
                href='https://www.instagram.com/kosharytahrir' 
                target='_blank'
                rel='noopener noreferrer' 
                className='text-light'
                style={{ fontSize: '1.5rem' }}
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-12 text-center'>
            <hr className='my-3' style={{ borderColor: '#555' }} />
            <p className='mb-1'>{t("Prices include VAT")}</p>
            <p className='small text-muted mb-0'>
              © {new Date().getFullYear()} {getRestaurantName()}. {t("All rights reserved")}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}