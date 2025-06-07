import css from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contacts/operations.js';

export default function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.elements.name.value.trim();
    const number = form.elements.number.value.trim();

    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} also in your phonebook.`);
      return;
    }

    dispatch(addContact({ name, number }));
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        className={css.input}
        type="text"
        name="name"
        placeholder="Name"
        required
      />
      <input
        className={css.input}
        type="tel"
        name="number"
        placeholder="Number"
        required
      />
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
}
