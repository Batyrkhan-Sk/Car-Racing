import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
      <Link to="/winners">Winners</Link>
    </nav>
  );
}
