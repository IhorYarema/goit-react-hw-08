import css from './HomePage.module.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';

export default function HomePage() {
  const user = useSelector(selectUser);
  return (
    <>
      <h1>Welcome, {user.name}</h1>
      <div className={css.container}>
        <h1 className={css.title}>
          Phonebook welcome page{' '}
          <span role="img" aria-label="Greeting icon" className={css.span}>
            💁‍♀️
          </span>
        </h1>
      </div>
    </>
  );
}
