import css from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contacts/operations.js';
import toast from 'react-hot-toast';

export default function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const name = form.elements.name.value.trim();
    const number = form.elements.number.value.trim();

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      toast.error(`${name} is already in your phonebook.`);
      return;
    }

    try {
      await dispatch(addContact({ name, number })).unwrap();
      toast.success('Contact added successfully!');
      form.reset();
    } catch {
      toast.error('Failed to add contact. Please try again.');
    }
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
