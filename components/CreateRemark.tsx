'use client';

import { useState } from 'react';
import {
  getFirestore,
  addDoc,
  collection,
  Timestamp,
} from '@firebase/firestore';

import CircleArrowRightSVG from '@/components/svg/CircleArrowRightSVG';

import styles from './CreateRemark.module.css';

// Component
export interface CreateRemarkProps {
  onSuccess?: () => void;
}
export const CreateRemark = ({ onSuccess }: CreateRemarkProps) => {
  // State
  const [remark, setRemark] = useState('');

  // Handlers
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (!remark) return;

    (async () => {
      const firestore = getFirestore();
      await addDoc(collection(firestore, 'remarks'), {
        content: remark,
        timestamp: Timestamp.fromDate(new Date()),
      });
    })();

    // TODO: Success and Error Handling
    // This is not real success.
    if (onSuccess) onSuccess();
  };

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = ({ currentTarget }) => {
    setRemark(currentTarget.value);
  };

  return (
    <section className={styles.createRemark}>
      <div className={styles.remark}>
        <form onSubmit={handleSubmit}>
          <textarea
            className={styles.textarea}
            placeholder="Say something remarkable..."
            maxLength={140}
            onChange={handleChange}
          />
          <button className={styles.button}>
            <CircleArrowRightSVG height={24} width={24} alt="arrow right" fill="rgb(var(--primary-rgb))" />
          </button>
        </form>
      </div>
    </section>
  )
}