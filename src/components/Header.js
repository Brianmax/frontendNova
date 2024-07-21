import { Link } from "react-router-dom";
import '../styles/Header.css';
const Header = () => {
    return (
        <nav className="navBar">
            <h1>System</h1>
            <div className="links">
                <Link to="/dashboard">Home</Link>
                <Link to={`/users`}>Usuarios</Link>
                <Link to={`/updateUser`}>Actualizar Perfil</Link>
                <Link to={'/'}>Logout</Link>
            </div>
        </nav>
    );
}
export default Header;