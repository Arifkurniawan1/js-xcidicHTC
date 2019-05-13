import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
class Navbar extends Component {

  onLogoutClick = e => {
    document.getElementById("logOutButton").style.display = "none";
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    var a = (this.props.auth.isAuthenticated) ? "block" : "none";
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/dashboard"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text"
            >
              <i className="material-icons">code</i>
              MERN
            </Link>
            <button
              id = "logOutButton"
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",

                marginLeft: "70%",
                position: "relative",
                display: a
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect white hoverable blue-text"
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
    );

  }
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
