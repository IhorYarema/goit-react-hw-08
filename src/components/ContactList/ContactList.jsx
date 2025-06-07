import Contact from '../Contact/Contact';
import css from './ContactList.module.css';
import { useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce';
import {
  selectIsLoading,
  selectError,
  selectContacts,
} from '../../redux/contacts/selectors';
import { selectFilter } from '../../redux/filters/selectors';

export default function ContactList() {
  const filter = useSelector(selectFilter);
  const [debouncedFilter] = useDebounce(filter, 500);

  const contacts = useSelector(selectContacts);
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const filteredContacts = contacts?.filter(contact =>
    contact?.name?.toLowerCase().includes(debouncedFilter?.toLowerCase() || '')
  );

  return (
    <ul className={css.list}>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {filteredContacts?.map(contact => (
        <li key={contact.id} className={css.item}>
          <Contact contact={contact} />
        </li>
      ))}
    </ul>
  );
}
