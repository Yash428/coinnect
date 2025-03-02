import React from 'react'
import "../styles/Price.css"
import { Link } from 'react-router-dom'
function Price() {
  return (
    <>
    <nav className="home-navbar">
            <div className="home-navbar-container">
              <ul className="home-navbar-menu">
                <li>
                  <Link to="/about" className="home-navbar-link">
                    ABOUT US
                  </Link>
                </li>
                <li>
                  <Link to="/" className="home-navbar-link">
                    HOME
                  </Link>
                </li>
                <li>
                  <Link to="/get" className="home-navbar-link">
                    GET IN TOUCH
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
    <div className="pricing-container">
      <div className="pricing-header">
        <div className="pricing-label">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
          </svg>
          Pricing
        </div>
        <h1>Flexible Pricing for Every Career Stage</h1>
        <p className="pricing-subheading">Choose the plan that best fits your career development needs</p>
      </div>

      <div className="pricing-cards">
        <div className="pricing-card">
          <div className="pricing-card-header">
            <h2 className='S'>Starter</h2>
            <div className="pricing-price">
              <span className="price-text">Free</span>
            </div>
          </div>
          <div className="pricing-features">
            <div className="feature">
              <svg className="check-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#28A745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Limited AI Interviews</span>
            </div>
            <div className="feature">
              <svg className="check-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#28A745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Limited Quiz Access</span>
            </div>
            <div className="feature">
              <svg className="check-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#28A745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Basic Resume Review</span>
            </div>
            <div className="feature">
              <svg className="check-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#28A745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Community Support</span>
            </div>
          </div>
          <button className="cta-button starter-button">Get Started</button>
        </div>

        <div className="pricing-card pro-card">
          <div className="popular-tag">Most Popular</div>
          <div className="pricing-card-header">
            <h2 className='P'>Pro</h2>
            <div className="pricing-price">
              <span className="price-text">$9.99</span>
              <span className="price-period">/month</span>
            </div>
          </div>
          <div className="pricing-features">
            <div className="feature">
              <svg className="check-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#28A745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Unlimited Quiz Access</span>
            </div>
            <div className="feature">
              <svg className="check-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#28A745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Comprehensive Resume Review</span>
            </div>
            <div className="feature">
              <svg className="check-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#28A745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>AI Interview Practice</span>
            </div>
            <div className="feature">
              <svg className="check-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#28A745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Personalized Learning Paths</span>
            </div>
          </div>
          <button className="cta-button pro-button">Go Pro</button>
        </div>

        <div className="pricing-card">
          <div className="pricing-card-header">
            <h2 className='E'>Enterprise</h2>
            <div className="pricing-price">
              <span className="price-text">Custom Pricing</span>
            </div>
          </div>
          <div className="pricing-features">
            <div className="feature">
              <svg className="check-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#28A745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Team Collaboration Tools</span>
            </div>
            <div className="feature">
              <svg className="check-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#28A745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Advanced Analytics</span>
            </div>
            <div className="feature">
              <svg className="check-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#28A745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Dedicated Support</span>
            </div>
            <div className="feature">
              <svg className="check-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#28A745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Custom Integration</span>
            </div>
          </div>
          <button className="cta-button enterprise-button">Contact Sales</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Price