import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  loginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  loginFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const loginUrl = 'https://apis.ccbp.in/login'
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.loginSuccess(data.jwt_token)
    } else {
      this.loginFailure(data.error_msg)
    }
  }

  renderUsernameContainer = () => {
    const {username} = this.state
    return (
      <div className="inputs-container">
        <label htmlFor="username" className="label">
          Username*
        </label>
        <br />
        <input
          type="text"
          id="username"
          value={username}
          className="input-element"
          placeholder="Username"
          onChange={this.onChangeUsername}
        />
      </div>
    )
  }

  renderPasswordContainer = () => {
    const {password} = this.state
    return (
      <div className="inputs-container">
        <label htmlFor="password" className="label">
          Password*
        </label>
        <br />
        <input
          type="password"
          id="password"
          value={password}
          className="input-element"
          placeholder="Password"
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    /* console.log(errorMsg) */
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="book-hub-login-page">
        <div className="login-responsive-container">
          <div className="login-page-left-side-section">
            <img
              src="https://res.cloudinary.com/diocftr6t/image/upload/v1651933010/Rectangle_1467Login-Image_krfcap.png"
              className="login-page-image"
              alt="website login"
            />
          </div>
          <div className="login-page-right-side-section">
            <div className="login-card">
              <img
                src="https://res.cloudinary.com/diocftr6t/image/upload/v1651940745/Group_7731Website_Logo_o1zltx.png"
                className="login-website-logo"
                alt="login website logo"
              />
              <form onSubmit={this.onSubmitForm} className="form-container">
                {this.renderUsernameContainer()}
                {this.renderPasswordContainer()}
                {showErrorMsg ? (
                  <p className="error-message">{errorMsg}</p>
                ) : null}
                <button type="submit" className="submit-button">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Login
