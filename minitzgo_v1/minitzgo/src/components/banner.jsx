import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Add from "./images/shop.jpg";
import Ad2 from "../components/images/minitgo_ad.png"
import Ad3 from "../components/images/ad3.png"
import { BiInfoCircle } from "react-icons/bi";
import myContext from "./context/MyContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Carousel from "react-bootstrap/Carousel";
// import Add from "./images/shop.jpg"; // You can add more images as needed


/* banner */
export default function Banner() {
  const [loading, setLoading] = useState(true);
  // const context = useContext(myContext);
  // const { setSearchQuery } = context;
  useEffect(() => {
    // Simulating data fetching
    setTimeout(() => setLoading(false), 2000);
  }, []);
  const navigate = useNavigate();

  function handleNavigateToProducts() {
    navigate("/products");
    // setSearchQuery("");
  }
  return (
    <div className="banner-container" style={{ minHeight: '80vh', padding: '2rem 0' }}>
      <Container>
        <div className="banner-content">
        <Row className="align-items-center flex-column-reverse flex-md-row"  style={{border:'1px solid #f1f1f1', borderRadius: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', borderLeft: '5px solid #FF6B6B'}}>
          <Col xs={12} md={6} className="banner-text-section text-left text-md-start mt-4 mt-md-0 p-3" >
          {loading ? (
            <div className="skeleton-loader" >
            <Skeleton height={50} width={400} />
            <Skeleton height={30} width={300} style={{ marginTop: "20px" }} />
            <Skeleton height={45} width={200} style={{ marginTop: "25px" }} />
            </div>
          ) : (
            <div className="banner-text-content text-center" >
            <h1 className="banner-title" style={{ 
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: '800'  // Added thicker font weight
            }}>
              ✨ Discover Amazing Products
              <span className="highlight-text" style={{ 
              display: 'block',
              background: 'linear-gradient(45deg, #FF6B6B, #FF8E53)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: '800'  // Added thicker font weight
              }}> Near You</span>
              <div className="animated-text" style={{ 
                fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', 
                color: '#666',
                fontWeight: '700'  // Added thicker font weight
              }}>
              A Minute to Go! 🚀
              </div>
            </h1>
            <ul className="banner-features" style={{ 
              listStyle: 'none', 
              padding: 0,
              margin: '1.5rem 0',
              textAlign: 'left',
              fontWeight: '400'  // Added thicker font weight
              
            }}>
              <li className="text-center" style={{ marginBottom: '0.5rem', }}>
                <span style={{ color: '#FF6B6B', marginRight: '8px' }}>✓</span>
                Quick local deliveries
              </li>
              <li className="text-center" style={{ marginBottom: '0.5rem' }}>
                <span style={{ color: '#FF6B6B', marginRight: '8px' }}>✓</span>
                Trusted neighborhood stores
              </li>
              <li className="text-center">
                <span style={{ color: '#FF6B6B', marginRight: '8px' }}>✓</span>
                Best prices guaranteed
              </li>
            </ul>
            <div className="banner-buttons" style={{ 
              marginTop: '2rem', 
              display: 'flex', 
              gap: '1rem',
              justifyContent: 'center',
              '@media (min-width: 768px)': {
                justifyContent: 'flex-start'
              }
            }}>
              <Button 
              className="primary-button"
              onClick={handleNavigateToProducts}
              style={{
                background: 'linear-gradient(45deg, #FF6B6B, #FF8E53)',
                border: 'none',
                padding: '0.8rem 2rem',
                borderRadius: '25px',
                boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
                transition: 'transform 0.2s ease',
                fontWeight: '600'  // Added thicker font weight
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
              Shop Now
              </Button>
              <Button 
              className="secondary-button"
              onClick={handleNavigateToProducts}
              style={{
                background: 'white',
                color: '#FF6B6B',
                border: '2px solid #FF6B6B',
                padding: '0.8rem 2rem',
                borderRadius: '25px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease',
                fontWeight: '600'  // Added thicker font weight
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
              Find Nearby
              </Button>
            </div>
            </div>
          )}
          </Col>
          
          <Col xs={12} md={6} className="banner-image-section">
          {loading ? (
            <Skeleton height={400} width="100%" />
          ) : (
            <Carousel 
            className="banner-carousel"
            fade
            controls={false}
            indicators={true}
            interval={3000}
            style={{ 
              maxHeight: '500px', 
              overflow: 'hidden',
              borderRadius: '15px',
               
            }}
            >
            <Carousel.Item>
              <div className="carousel-image-container">
              <img src={Add} alt="Featured Products" style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="carousel-image-container">
              <img src={Ad2} alt="Special Offers" style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
              </div>
            </Carousel.Item>
            
            <Carousel.Item>
              <div className="carousel-image-container">
              <img src={Ad3} alt="Best Deals" style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
              </div>
            </Carousel.Item>
            </Carousel>
          )}
          </Col>
            </Row>
            </div>
          </Container>
          <br />
          <br />
         
        </div>
      );
    }
