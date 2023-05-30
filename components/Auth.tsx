'use client';

import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import styles from './Auth.module.css';

import type {
  Dispatch,
  SetStateAction,
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
} from 'react';

type AuthMethod = typeof createUserWithEmailAndPassword | typeof signInWithEmailAndPassword;

// Component
export interface AuthProps {
  onSuccess?: () => void;
}
export const Auth = ({ onSuccess }: AuthProps) => {
  // State
  const [signup, setSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handlers
  const handleChange = (setter: Dispatch<SetStateAction<string>>): ChangeEventHandler<HTMLInputElement> => ({ currentTarget }) => {
    setter(currentTarget.value);
  };

  const handleSubmit = (authMethod: AuthMethod): FormEventHandler<HTMLFormElement> => (event) => {
    event.preventDefault();

    // TODO: Improve password validation
    if (signup && password !== confirmPassword) return;

    const auth = getAuth();
    authMethod(auth, email, password);

    // TODO: Success and Error Handling
    // This is not real success.
    if (onSuccess) onSuccess();
  };

  const handleToggleClick: MouseEventHandler<HTMLButtonElement> = () => {
    // Toggle.
    setSignup(!signup);
  };

  return (
    <section className={styles.auth}>
        <form
          className={styles.form}
          onSubmit={handleSubmit(signup ? createUserWithEmailAndPassword : signInWithEmailAndPassword)}
        >
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="email"
            onChange={handleChange(setEmail)}
            required
          />
          <label className={styles.label}>Password</label>
          <input
            className={styles.input}
            type="password"
            onChange={handleChange(setPassword)}
            required
          />
          {signup && <label className={styles.label}>Confirm Password</label>}
          {signup && (
            <input
                className={styles.input}
                type="password"
                onChange={handleChange(setConfirmPassword)}
                required
            />
          )}
          <button className={styles.submit}>{signup ? 'Signup' : 'Signin'}</button>
          <button className={styles.toggle} onClick={handleToggleClick}>{signup ? 'I Already Have an Account' : 'Create Account'}</button>
        </form>
      </section>
  )
};
