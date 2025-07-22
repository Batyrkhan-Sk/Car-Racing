import { useLocation, Link } from 'react-router-dom';
import styles from '../styles/Navigation.module.css';

export default function Navigation() {
  const location = useLocation();
  const isWinnersPage = location.pathname === '/winners';
  return (
    <nav className={styles.nav}>
      {isWinnersPage ? (
        <Link to="/" className={styles.link}>
          Garage
        </Link>
      ) : (
        <Link to="/winners" className={styles.link}>
          Winners
        </Link>
      )}
    </nav>
  );
}
