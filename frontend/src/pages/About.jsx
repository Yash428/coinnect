import React from 'react';
import "../styles/About.css"
import { Link } from 'react-router-dom';
import Image from "../assets/Image.png"
const About = () => {
  return (
    <>
    <nav className="home-navbar">
            <div className="home-navbar-container">
              <ul className="home-navbar-menu">
                <li>
                  <Link to="/" className="home-navbar-link">
                    HOME
                  </Link>
                </li>
                <li>
                  <Link to="/price" className="home-navbar-link">
                    PRICE
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
    <div class="kawruh-theme">
    <div className="kawruh-container">
      <div className="kawruh-left">
        <div className="kawruh-content">
          <span className="kawruh-subtitle">How It Started</span>
          
          <h1 className="kawruh-title">
            Our Dream is<br />
            Global Learning<br />
            Transformation
          </h1>
          
          <p className="kawruh-description">
            Kawruh was founded by Robert Anderson, a passionate lifelong learner, 
            and Maria Sanchez, a visionary educator. Their shared dream was to 
            create a digital haven of knowledge accessible to all. United by their 
            belief in the transformational power of education, they embarked on a 
            journey to build 'Kawruh.' With relentless dedication, they gathered a 
            team of experts and launched this innovative platform, creating a global 
            community of eager learners, all connected by the desire to explore, 
            learn, and grow.
          </p>
        </div>
      </div>
      
      {/* Right section */}
      <div className="kawruh-right">
        <div className="kawruh-image-container">
          <img 
            src={Image} 
            alt="Two people collaborating on a laptop" 
            className="kawruh-image"
          />
        </div>
        
        <div className="kawruh-stats-grid">
          <div className="kawruh-stat-box">
            <h2 className="kawruh-stat-number">3.5</h2>
            <p className="kawruh-stat-label">Years Experience</p>
          </div>
          
          <div className="kawruh-stat-box">
            <h2 className="kawruh-stat-number">23</h2>
            <p className="kawruh-stat-label">Project Challenge</p>
          </div>
        </div>
      </div>
    </div>
    </div>

    
    </>
  );
};

export default About;