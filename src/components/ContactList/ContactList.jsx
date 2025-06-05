import Contact from '../Contact/Contact';
import css from './ContactList.module.css';
import { useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce';
import {
  selectFilteredContacts,
  selectLoading,
  selectError,
} from '../../redux/contactsSlice';

export default function ContactList() {
  const filter = useSelector(state => state.filters.name || '');
  const [debouncedFilter] = useDebounce(filter, 500);

  const contacts = useSelector(state =>
    selectFilteredContacts(state, debouncedFilter)
  );
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  return (
    <ul className={css.list}>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {contacts.map(contact => (
        <li key={contact.id} className={css.item}>
          <Contact contact={contact} />
        </li>
      ))}
    </ul>
  );
}
