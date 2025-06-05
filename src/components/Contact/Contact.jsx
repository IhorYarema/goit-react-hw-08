import css from './Contact.module.css';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps';

export default function Contact({ contact }) {
  const dispatch = useDispatch();

  return (
    <div className={css.container}>
      <div className={css.text_container}>
        <p className={css.text}> {contact.name}</p>
        <p className={css.text}>{contact.number}</p>
      </div>
      <button
        className={css.btn}
        onClick={() => dispatch(deleteContact(contact.id))}
      >
        Delete
      </button>
    </div>
  );
}
