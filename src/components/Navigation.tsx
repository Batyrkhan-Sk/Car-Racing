import { Link } from 'react-router-dom';
import styles from '../styles/Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <Link to="/winners" className={styles.link}>
        Winners
      </Link>
    </nav>
  );
}
