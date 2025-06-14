import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import css from './LoginForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export const LoginForm = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Required field'),
    password: Yup.string()
      .min(6, 'Minimum 6 characters')
      .required('Required field'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(logIn(values)).unwrap();
      resetForm();
    } catch (error) {
      console.log('login error:', error);
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.form} autoComplete="off">
          <label className={css.label}>Email</label>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" className={css.error} />

          <label className={css.label}>Password </label>
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" className={css.error} />

          <button type="submit" disabled={isSubmitting} className={css.button}>
            Log In
          </button>
        </Form>
      )}
    </Formik>
  );
};
