import { Link } from "react-router-dom";

const Navbar = () => {
    return (
      <nav className="navbar">
        <a href="#" className="logo">MoodSpace</a>
        <div className="links">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>
    )  
}

export default Navbar