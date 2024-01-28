import { useSelector } from 'react-redux';
import { selectUser } from '../redux/auth/selectors';
import { Link } from 'react-router-dom';

const styles = {
  container: {
    minHeight: '800px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0',
  },
  title: {
    fontWeight: 500,
    fontSize: 40,
    textAlign: 'center',
  },
};

export const Home = () => {
  const user = useSelector(selectUser);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to the Phonebook!</h1>
      <h1 style={styles.title}>
        {user.name ? `Glad to see you, ${user.name}` : 'Dear guest, please '}
        {!user.name && (
          <>
            <Link to="/auth">log in</Link>
            {` `} to access contacts.
          </>
        )}
      </h1>
    </div>
  );
};
