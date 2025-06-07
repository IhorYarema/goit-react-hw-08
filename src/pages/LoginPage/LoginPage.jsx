import css from './LoginPage.module.css';
import { LoginForm } from '../../components/LoginForm/LoginForm';

export default function LoginPage() {
  return (
    <>
      <title>Login</title>
      <LoginForm className={css.loginForm} />
    </>
  );
}
