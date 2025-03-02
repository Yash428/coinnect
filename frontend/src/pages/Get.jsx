import React from "react";
import "../styles/Get.css";
import { Link } from "react-router-dom";

function Get() {
  return (
    <>
      <nav className="GetPage_navbar">
        <div className="GetPage_navbar-container">
          <ul className="GetPage_navbar-menu">
            <li>
              <Link to="/about" className="GetPage_navbar-link">
                ABOUT US
              </Link>
            </li>
            <li>
              <Link to="/price" className="GetPage_navbar-link">
                PRICE
              </Link>
            </li>
            <li>
              <Link to="/" className="GetPage_navbar-link">
                HOME
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="GetPage_Main_Container">
        <div className="GetPage_Container3">
          <h2 className="GetPage_Contact">Get In Touch</h2>
          <p className="GetPage_Contact_p1">
            If you have any questions or need further information, feel free to
            contact us through the form below or reach us directly at:
          </p>
          <div className="GetPage_div_p">
            <p className="GetPage_Contact_p2">
              <strong>Address:</strong> CHARUSAT Campus, 139, Highway, off Nadiad ,   Gujarat
            </p>
            <p className="GetPage_Contact_p2">
              <strong>Phone:</strong> +91 7016773091
            </p>
            <p className="GetPage_Contact_p2">
              <strong>Email:</strong> coinnect0902@gmail.com
            </p>
          </div>
        </div>
        <div className="GetPage_Container4">
          <label>Name:</label>
          <input type="text" className="GetPage_input" required />
          <label>Email:</label>
          <input type="email" className="GetPage_input" />
          <label>Message:</label>
          <textarea className="GetPage_textarea"></textarea>
          <button type="submit" className="GetPage_button">
            Submit
          </button>
        </div>
      </div>

      <div className="GetPage_social-media">
        <p>
          Follow <label className="GetPage_us">us on</label>
        </p>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="GetPage_tw"
        >
          Twitter
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
      </div>
    </>
  );
}

export default Get;