import { useState, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from '../auth';
import styles from './LoginPage.module.css';

type LocationState = { from?: { pathname: string } } | null;

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Where RequireAuth bounced the user from, if anywhere.
  const from = (location.state as LocationState)?.from?.pathname ?? '/dashboard';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      setError('Enter your email and password.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    try {
      await login(email.trim(), password);
      // `replace` so Back can't return to the login form once signed in.
      navigate(from, { replace: true });
    } catch {
      setError('Invalid email or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <h1 className={styles.title}>Welcome back</h1>

        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className={styles.input}
          type="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          placeholder="you@example.com"
          autoCapitalize="none"
          autoCorrect="off"
          autoComplete="email"
        />

        <label className={styles.label} htmlFor="password">
          Password
        </label>
        <input
          id="password"
          className={styles.input}
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          placeholder="Password"
          autoComplete="current-password"
        />

        {error ? (
          <p className={styles.error} role="alert">
            {error}
          </p>
        ) : null}

        <button
          className={styles.button}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in…' : 'Log In'}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
