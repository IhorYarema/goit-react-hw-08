import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactForm from '../../components/ContactForm/ContactForm';
import SearchBox from '../../components/SearchBox/SearchBox';
import ContactList from '../../components/ContactList/ContactList';
import { fetchContacts } from '../../redux/contacts/operations';
import { selectIsLoading } from '../../redux/contacts/selectors';
import css from './ContactsPage.module.css';

export default function TasksPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <h1 className={css.title}>Your phonebook</h1>
      <div className={css.loading}>{isLoading && 'Request in progress...'}</div>
      <ContactForm className={css.myContactForm} />
      <SearchBox className={css.mySearchBox} />
      <ContactList className={css.myContactList} />
    </>
  );
}
