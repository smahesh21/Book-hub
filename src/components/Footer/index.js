import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="responsive-footer">
      <button type="button" className="footer-buttons">
        <FaGoogle size={18} />
      </button>
      <button type="button" className="footer-buttons">
        <FaTwitter size={18} />
      </button>
      <button type="button" className="footer-buttons">
        <FaInstagram size={18} />
      </button>
      <button type="button" className="footer-buttons">
        <FaYoutube size={18} />
      </button>
    </div>
    <p className="contact-us-heading">Contact Us</p>
  </div>
)
export default Footer
