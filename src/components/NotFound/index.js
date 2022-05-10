import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/diocftr6t/image/upload/v1651940898/Group_7484PageNotFound_o7uk9v.png"
      className="not-found-image"
      alt="not found"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-description">
      we are sorry, the page you requested could not be found, Please go back to
      the homepage.
    </p>

    <Link to="/" className="text-link">
      <button type="button" className="go-back-to-home-button">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
