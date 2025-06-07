import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateContact } from '../../redux/contacts/operations.js';
import toast from 'react-hot-toast';
import css from './EditContactForm.module.css';

export default function EditContactForm({ contact, onClose }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(contact.name);
  const [number, setNumber] = useState(contact.number);

  const handleSubmit = e => {
    e.preventDefault();
    if (!name.trim() || !number.trim()) {
      toast.error('Please fill all fields');
      return;
    }
    dispatch(updateContact({ id: contact.id, name, number }))
      .unwrap()
      .then(() => {
        toast.success('Contact updated');
        onClose();
      })
      .catch(() => toast.error('Failed to update contact'));
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        className={css.input}
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        className={css.input}
        value={number}
        onChange={e => setNumber(e.target.value)}
        placeholder="Number"
        required
      />
      <div className={css.buttons}>
        <button type="submit" className={css.saveBtn}>
          Save
        </button>
        <button type="button" className={css.cancelBtn} onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}
