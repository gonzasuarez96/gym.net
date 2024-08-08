// HOOKS
import { Link, useLocation } from 'react-router-dom';
// COMPONENTS
import login from '../../public/Nav/usuario.png';
// STYLE
import style from './NavBar.module.css';
import { useState, useEffect } from 'react';

// Define routes for different roles
const ROUTES = {
  HOME: '/',
  DASHBOARD_ADMIN: '/dashboardAdmin',
  DASHBOARD_CLIENT: '/dashboardClient',
  MEMBRESIA: '/membresia',
  ACTIVIDADES: '/actividades',
  CONTACTANOS: '/contacto',
};

// Determine the route for Dashboard based on user role
const getDashboardRoute = (role) => {
  if (role === 'admin') return ROUTES.DASHBOARD_ADMIN;
  if (role === 'user') return ROUTES.DASHBOARD_CLIENT;
  return ROUTES.HOME; // Default route if no role or unknown role
};

const NavItem = ({ to, label, isActive }) => (
  <li className={`${style.item} ${isActive ? style.active : ''}`}>
    <Link to={to} aria-current={isActive ? 'page' : undefined}>
      {label}
    </Link>
  </li>
);

const NavBar = ({ openModal }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    console.log(storedUser);
  }, []);

  // Get the route for Dashboard based on user role
  const dashboardRoute = user ? getDashboardRoute(user.role) : ROUTES.HOME;

  return (
    <header className={style.navbar}>
      <Link to={ROUTES.HOME} className={style.title}>
        GYMFit!
      </Link>
      <button
        className={style.menuButton}
        onClick={toggleMenu}
        aria-label="Menu"
      >
        ☰
      </button>
      <nav className={`${style.container} ${isMenuOpen ? style.menuOpen : ''}`}>
        <ul className={style.items}>
          <NavItem
            to={ROUTES.MEMBRESIA}
            label="Membresías"
            isActive={location.pathname === ROUTES.MEMBRESIA}
          />
          <NavItem
            to={ROUTES.ACTIVIDADES}
            label="Actividades"
            isActive={location.pathname === ROUTES.ACTIVIDADES}
          />
          <NavItem
            to={ROUTES.CONTACTANOS}
            label="Contáctanos"
            isActive={location.pathname === ROUTES.CONTACTANOS}
          />
          <NavItem
            to={dashboardRoute}
            label="Dashboard"
            isActive={location.pathname === dashboardRoute}
          />
          {user ? (
            <li className={style.login} aria-label="Usuario">
              {user.name}
            </li>
          ) : (
            <li
              className={style.login}
              onClick={openModal}
              role="button"
              aria-label="Login / Registrate"
            >
              <img src={login} alt="Icono de usuario" className={style.user} />
              Login / Registrate
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
