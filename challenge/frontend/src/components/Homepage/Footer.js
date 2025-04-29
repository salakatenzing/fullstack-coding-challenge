import React from "react";
import '../../styles/Homepage.css'

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-row">
       
        <div className="footer-column">
          <h3>Visit the Council</h3>
          <p>
            We're located at <a href="https://www.google.com/maps/search/?api=1&query=New+York+City+Hall
">
              New York City Hall
            </a>. Offices at{" "}
            <a href="https://www.google.com/maps/place/250+Broadway,+New+York,+NY+10007/">
              250 Broadway
            </a> too.
          </p>
        </div>

     
        <div className="footer-column">
          <h3>About</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><a href="https://council.nyc.gov/events/">Events</a></li>
            <li><a href="https://council.nyc.gov/about/">What We Do</a></li>
           
          </ul>
        </div>

     
        <div className="footer-column">
          <h3>Legislation</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><a href="https://legistar.council.nyc.gov/Legislation.aspx">Legislation</a></li>
            <li><a href="https://council.nyc.gov/testify/">Testify</a></li>
          </ul>
        </div>

        
        <div className="footer-column">
          <h3>Press & News</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><a href="https://council.nyc.gov/press/">Press Releases</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        COPYRIGHT ©{currentYear} NEW YORK CITY COUNCIL
      </div>
    </footer>
  );
}

export default Footer;
