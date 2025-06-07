import css from './RegisterPage.module.css';
import { RegisterForm } from '../../components/RegistrationForm/RegistrationForm';

export default function RegisterPage() {
  return (
    <>
      <title>Registration</title>
      <RegisterForm className={css.registerPage} />
    </>
  );
}
