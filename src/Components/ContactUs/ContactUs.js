import React, { useContext, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPhone, 
  faMapMarkerAlt, 
  faClock, 
  faEnvelope,
  faMotorcycle,
  faStore
} from '@fortawesome/free-solid-svg-icons';
import { 
  faFacebook, 
  faXTwitter, 
  faYoutube, 
  faInstagram 
} from '@fortawesome/free-brands-svg-icons';
import { AppContext } from '../../App';
import './ContactUs.css';

export default function ContactUs() {
  const { t, lng } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    subject: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success');

  // Restaurant data
  const restaurantData = {
    name: "كشري التحرير",
    name_en: "Koshary El Tahrir",
    established: "1963",
    phone: "19719",
    email: "info@kosharytahrir.com",
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
          area_en: "Maadi",
          phone: "01212333375"
        },
        {
          name: "فرع عباس العقاد",
          name_en: "Abbas El Akkad Branch", 
          address: "شارع عباس العقاد",
          address_en: "Abbas El Akkad Street",
          area: "مصر الجديدة",
          area_en: "Heliopolis",
          phone: "01022661477"
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setAlertType('success');
    setShowAlert(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      subject: ''
    });

    // Hide alert after 5 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const getRestaurantName = () => {
    return lng === 'en' ? restaurantData.name_en : restaurantData.name;
  };

  return (
    <div className="contact-us-page">
      <Container className="py-5">
        {/* Page Header */}
        <Row className="mb-5">
          <Col>
            <div className="page-header text-center">
              <h1 className="display-4 mb-3 tracking-in-expand">
                {t("Contact Us")}
              </h1>
              <p className="lead text-muted">
                {t("We'd love to hear from you! Get in touch with us anytime.")}
              </p>
            </div>
          </Col>
        </Row>

        {/* Alert */}
        {showAlert && (
          <Row className="mb-4">
            <Col>
              <Alert variant={alertType} onClose={() => setShowAlert(false)} dismissible>
                {t("Thank you for your message! We will get back to you soon.")}
              </Alert>
            </Col>
          </Row>
        )}

        <Row>
          {/* Contact Form */}
          <Col lg={8} className="mb-4">
            <Card className="contact-form-card h-100">
              <Card.Header className="bg-warning text-dark">
                <h4 className="mb-0">
                  <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                  {t("Send us a Message")}
                </h4>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          {t("Full Name")}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder={t("Enter your name")}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          {t("Email Address")}
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder={t("Enter your email")}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          {t("Phone Number")}
                        </Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder={t("Enter your phone")}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          {t("Subject")}
                        </Form.Label>
                        <Form.Select
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">
                            {t("Select a subject")}
                          </option>
                          <option value="order">
                            {t("Order Inquiry")}
                          </option>
                          <option value="complaint">
                            {t("Complaint")}
                          </option>
                          <option value="suggestion">
                            {t("Suggestion")}
                          </option>
                          <option value="franchise">
                            {t("Franchise Inquiry")}
                          </option>
                          <option value="other">
                            {t("Other")}
                          </option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>
                      {t("Message")}
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder={t("Enter your message...")}
                    />
                  </Form.Group>

                  <Button 
                    variant="warning" 
                    type="submit" 
                    size="lg" 
                    className="w-100"
                  >
                    {t("Send Message")}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Contact Information */}
          <Col lg={4}>
            {/* Quick Contact */}
            <Card className="contact-info-card mb-4">
              <Card.Header className="bg-dark text-light">
                <h5 className="mb-0">
                  {t("Quick Contact")}
                </h5>
              </Card.Header>
              <Card.Body>
                <div className="contact-item mb-3">
                  <FontAwesomeIcon icon={faPhone} className="contact-icon" />
                  <div>
                    <strong>{t("Phone")}</strong>
                    <br />
                    <a href={`tel:${restaurantData.phone}`} className="contact-link">
                      {restaurantData.phone}
                    </a>
                  </div>
                </div>

                <div className="contact-item mb-3">
                  <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
                  <div>
                    <strong>{t("Email")}</strong>
                    <br />
                    <a href={`mailto:${restaurantData.email}`} className="contact-link">
                      {restaurantData.email}
                    </a>
                  </div>
                </div>

                <div className="contact-item mb-3">
                  <FontAwesomeIcon icon={faClock} className="contact-icon" />
                  <div>
                    <strong>{t("Working Hours")}</strong>
                    <br />
                    {restaurantData.working_hours.open} - {restaurantData.working_hours.close}
                  </div>
                </div>

                <div className="contact-item">
                  <FontAwesomeIcon icon={faMotorcycle} className="contact-icon" />
                  <div>
                    <strong>{t("Delivery Hours")}</strong>
                    <br />
                    {restaurantData.delivery.hours.start} - {restaurantData.delivery.hours.end}
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Branches */}
            <Card className="branches-card mb-4">
              <Card.Header className="bg-warning text-dark">
                <h5 className="mb-0">
                  <FontAwesomeIcon icon={faStore} className="me-2" />
                  {t("Our Branches")}
                </h5>
              </Card.Header>
              <Card.Body>
                {/* Cairo Branches */}
                <div className="branch-section mb-3">
                  <h6 className="branch-city">
                    {t("Cairo")}
                  </h6>
                  {restaurantData.branches.cairo.map((branch, index) => (
                    <div key={index} className="branch-item mb-2">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 text-warning" />
                      <div>
                        <strong>
                          {lng === 'en' ? branch.name_en : branch.name}
                        </strong>
                        <br />
                        <small className="text-muted">
                          {lng === 'en' ? branch.address_en : branch.address}
                        </small>
                        {branch.phone && (
                          <>
                            <br />
                            <a href={`tel:${branch.phone}`} className="contact-link">
                              {branch.phone}
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Zagazig Branches */}
                <div className="branch-section">
                  <h6 className="branch-city">
                    {t("Zagazig")}
                  </h6>
                  {restaurantData.branches.zagazig.map((branch, index) => (
                    <div key={index} className="branch-item mb-2">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 text-warning" />
                      <div>
                        <strong>
                          {lng === 'en' ? branch.name_en : branch.name}
                        </strong>
                        <br />
                        <small className="text-muted">
                          {lng === 'en' ? branch.address_en : branch.address}
                        </small>
                        {branch.phones && (
                          <>
                            <br />
                            {branch.phones.map((phone, phoneIndex) => (
                              <div key={phoneIndex}>
                                <a href={`tel:${phone}`} className="contact-link">
                                  {phone}
                                </a>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>

            {/* Social Media */}
            <Card className="social-card">
              <Card.Header className="bg-dark text-light">
                <h5 className="mb-0">
                  {t("Follow Us")}
                </h5>
              </Card.Header>
              <Card.Body className="text-center">
                <div className="social-links">
                  <a 
                    href='https://www.facebook.com/KosharyElTahrir' 
                    target='_blank' 
                    rel='noopener noreferrer'
                    className="social-link facebook"
                  >
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                  <a 
                    href='https://x.com/KosharyElTahrir' 
                    target='_blank'
                    rel='noopener noreferrer' 
                    className="social-link twitter"
                  >
                    <FontAwesomeIcon icon={faXTwitter} />
                  </a>
                  <a 
                    href='https://www.youtube.com/channel/KosharyElTahrir' 
                    target='_blank'
                    rel='noopener noreferrer' 
                    className="social-link youtube"
                  >
                    <FontAwesomeIcon icon={faYoutube} />
                  </a>
                  <a 
                    href='https://www.instagram.com/kosharytahrir' 
                    target='_blank'
                    rel='noopener noreferrer' 
                    className="social-link instagram"
                  >
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}