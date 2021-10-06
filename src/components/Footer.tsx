import React from 'react'
import { Link } from 'react-router-dom';

function Footer():JSX.Element {
  return (
    <div id="footer" className="mt-5">
      <div className="container py-5 px-0">
        <div id="footer-flex" className="d-flex justify-content-between">
          <div className="footer-section">
            <h6>About</h6>
            <p>
              <em>Plantome</em> is an ecommerce website that makes it easy for you to buy plants for
              your home. 
            </p>
            <p>
              This website is an internal project for the Cognizant Digital Experience North America Team.
            </p>
            <p><strong>© Haley Lee 2021 🌱</strong></p>
          </div>
          <div className="footer-section">
            <h6>Shop Plants</h6>
            <ul className="footer-list">
              <li><Link to="/plants" className="footer-nav-link">all plants</Link></li>
              <li><Link to="/plants/best-seller" className="footer-nav-link">best seller</Link></li>
              <li><Link to="/plants/sale" className="footer-nav-link">sale</Link></li>
              <li><Link to="/plants/beginner" className="footer-nav-link">beginner</Link></li>
              <li><Link to="/plants/low-maintenance" className="footer-nav-link">low-maintenance</Link></li>
              <li><Link to="/plants/tropical"className="footer-nav-link">tropical</Link></li>
            </ul>
          </div>
          {/* <div className="footer-section">
            <h6>Information</h6>
            <ul className="footer-list">
              <li>about</li>
              <li>contact</li>
              <li>terms and conditions</li>
              <li>shipping and delivery</li>
              <li>private policy</li>
            </ul>
          </div> */}
          <div className="footer-section p-0">
            <h6>Contact</h6>
            <p>Haley Lee</p>
            <table>
              <tbody>
                <tr>
                  <td>📞</td>
                  <td><a href="tel:904-576-3213">904-576-3213</a></td>
                </tr>
                <tr>
                  <td>📧</td>
                  <td><a href="mailto: haleyalee@gmail.com">haleyalee@gmail.com</a></td>
                </tr>
                <tr>
                  <td></td>
                  <td><a href="mailto: haley.lee@cognizant.com">haley.lee@cogniant.com</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;
