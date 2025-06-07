import css from './RegisterPage.module.css';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';

export default function RegisterPage() {
  return (
    <>
      <title className={css.title}>Registration</title>
      <RegisterForm />
    </>
  );
}
