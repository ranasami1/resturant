import React, { useContext } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCrown,
  faHistory,
  faAward,
  faUsers,
  faHeart,
  faStore,
  faGlobeAmericas,
  faHandshake,
  faStar,
  faLeaf,
  faShieldAlt,
  faTruck
} from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../../App';
import './AboutUs.css';

export default function AboutUs() {
  const { t, lng } = useContext(AppContext);

  const stats = [
    {
      icon: faHistory,
      number: "62",
      text: t("Years of Excellence"),
      suffix: "+"
    },
    {
      icon: faStore,
      number: "15",
      text: t("Branches"),
      suffix: "+"
    },
    {
      icon: faUsers,
      number: "500K",
      text: t("Happy Customers"),
      suffix: "+"
    },
    {
      icon: faAward,
      number: "25",
      text: t("Awards Won"),
      suffix: "+"
    }
  ];

  const values = [
    {
      icon: faHeart,
      title: t("Quality & Taste"),
      desc: t("We use only the finest ingredients and traditional recipes passed down through generations.")
    },
    {
      icon: faLeaf,
      title: t("Fresh Ingredients"),
      desc: t("Daily fresh ingredients sourced from trusted local suppliers to ensure the best quality.")
    },
    {
      icon: faShieldAlt,
      title: t("Food Safety"),
      desc: t("Strict hygiene standards and food safety protocols to protect our customers' health.")
    },
    {
      icon: faTruck,
      title: t("Fast Delivery"),
      desc: t("Quick and reliable delivery service to bring authentic koshary to your doorstep.")
    },
    {
      icon: faHandshake,
      title: t("Customer Service"),
      desc: t("Dedicated customer support team committed to ensuring your satisfaction.")
    },
    {
      icon: faGlobeAmericas,
      title: t("Community Impact"),
      desc: t("Supporting local communities and preserving Egyptian culinary traditions.")
    }
  ];


  return (
    <div className="about-us-page">
      <Container className="py-5">
        {/* Page Header */}
        <Row className="mb-5">
          <Col>
            <div className="page-header text-center">
              <h1 className="display-4 mb-3 tracking-in-expand">
                <FontAwesomeIcon icon={faCrown} className="me-3 text-warning" />
                {t("About Koshary El Tahrir")}
              </h1>
              <p className="lead text-muted">
                {t("Serving authentic Egyptian koshary since 1963 with passion, tradition, and quality.")}
              </p>
            </div>
          </Col>
        </Row>

        {/* Our Story Section */}
        <Row className="mb-5">
          <Col lg={6} className="mb-4">
            <Card className="story-card h-100">
              <Card.Body className="p-4">
                <h3 className="mb-4 text-center">
                  <FontAwesomeIcon icon={faHistory} className="me-2 text-warning" />
                  {t("Our Story")}
                </h3>
                <p className="story-text">
                  {t("Founded in 1963 in the heart of Cairo's Tahrir Square, Koshary El Tahrir began as a small family business with a big dream: to serve the most authentic and delicious koshary in Egypt. Our founder, Ahmed El Tahrir, started with a simple cart and a secret family recipe that had been passed down through generations.")}
                </p>
                <p className="story-text">
                  {t("Over the decades, we have grown from that humble cart to become one of Egypt's most beloved koshary chains, with branches across Egypt and internationally. Despite our growth, we have never compromised on the quality and authenticity that made us who we are today.")}
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={6} className="mb-4">
            <Card className="mission-card h-100">
              <Card.Body className="p-4">
                <h3 className="mb-4 text-center">
                  <FontAwesomeIcon icon={faHeart} className="me-2 text-danger" />
                  {t("Our Mission")}
                </h3>
                <div className="mission-content">
                  <div className="mission-item mb-3">
                    <FontAwesomeIcon icon={faStar} className="mission-icon" />
                    <p>
                      {t("To preserve and share the authentic taste of Egyptian koshary with the world.")}
                    </p>
                  </div>
                  <div className="mission-item mb-3">
                    <FontAwesomeIcon icon={faUsers} className="mission-icon" />
                    <p>
                      {t("To bring families and communities together through our delicious food.")}
                    </p>
                  </div>
                  <div className="mission-item">
                    <FontAwesomeIcon icon={faShieldAlt} className="mission-icon" />
                    <p>
                      {t("To maintain the highest standards of quality, hygiene, and customer service.")}
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Statistics Section */}
        <Row className="mb-5">
          <Col>
            <Card className="stats-card">
              <Card.Body className="p-4">
                <h3 className="text-center mb-4">
                  {t("Our Achievements")}
                </h3>
                <Row>
                  {stats.map((stat, index) => (
                    <Col md={6} lg={3} key={index} className="mb-3">
                      <div className="stat-item text-center">
                        <FontAwesomeIcon 
                          icon={stat.icon} 
                          className="stat-icon mb-3" 
                        />
                        <h2 className="stat-number">
                          {stat.number}
                          <span className="stat-suffix">
                            {stat.suffix}
                          </span>
                        </h2>
                        <p className="stat-text">
                          {stat.text}
                        </p>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Values Section */}
        <Row className="mb-5">
          <Col>
            <h3 className="text-center mb-4">
              {t("Our Values")}
            </h3>
            <Row>
              {values.map((value, index) => (
                <Col md={6} lg={4} key={index} className="mb-4">
                  <Card className="value-card h-100">
                    <Card.Body className="text-center p-4">
                      <FontAwesomeIcon 
                        icon={value.icon} 
                        className="value-icon mb-3" 
                      />
                      <h5 className="value-title">
                        {value.title}
                      </h5>
                      <p className="value-desc">
                        {value.desc}
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
        {/* Call to Action */}
        <Row>
          <Col>
            <Card className="cta-card text-center">
              <Card.Body className="p-5">
                <h3 className="mb-3">
                  {t("Experience the Tradition")}
                </h3>
                <p className="lead mb-4">
                  {t("Join millions of satisfied customers who have made Koshary El Tahrir part of their dining tradition.")}
                </p>
                <div className="cta-buttons">
                  <a 
                    href="/menu" 
                    className="btn btn-warning btn-lg me-3 mb-2"
                  >
                    {t("View Our Menu")}
                  </a>
                  <a 
                    href="/contact" 
                    className="btn btn-outline-dark btn-lg mb-2"
                  >
                    {t("Find a Branch")}
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