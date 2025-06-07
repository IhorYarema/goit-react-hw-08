import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import css from './RegistrationForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Minimum 2 characters')
      .required('Required field'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Required field'),
    password: Yup.string()
      .min(6, 'Minimum 6 characters')
      .required('Required field'),
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(register(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <label className={css.label}>Username</label>
          <Field type="text" name="name" className={css.input} />
          <ErrorMessage name="name" component="div" className={css.error} />

          <label className={css.label}>Email</label>
          <Field type="email" name="email" className={css.input} />
          <ErrorMessage name="email" component="div" className={css.error} />

          <label className={css.label}>Password</label>
          <Field type="password" name="password" className={css.input} />
          <ErrorMessage name="password" component="div" className={css.error} />

          <button type="submit" disabled={isSubmitting} className={css.button}>
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
};
