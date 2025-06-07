import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations.js';
import EditContactForm from '../EditContactForm/EditContactForm.jsx';
import css from './Contact.module.css';

export default function Contact({ contact }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
    setShowModal(false);
  };

  return (
    <div className={css.container}>
      {isEditing ? (
        <EditContactForm
          contact={contact}
          onClose={() => setIsEditing(false)}
        />
      ) : (
        <>
          <div className={css.text_container}>
            <p className={css.text}>{contact.name}</p>
            <p className={css.text}>{contact.number}</p>
          </div>
          <div className={css.actions}>
            <button className={css.editBtn} onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className={css.btn} onClick={() => setShowModal(true)}>
              Delete
            </button>
          </div>
        </>
      )}

      {showModal && (
        <div className={css.modalOverlay}>
          <div className={css.modal}>
            <p>
              Are you sure you want to delete <b>{contact.name}</b>?
            </p>
            <div className={css.modalButtons}>
              <button className={css.confirmBtn} onClick={handleDelete}>
                Yes, delete
              </button>
              <button
                className={css.cancelBtn}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
