'use client';

import { useState } from 'react';
import { useUser } from 'reactfire';

import { LikeComponent } from '@/components/Like';

import styles from './Remark.module.css';

import type { Remark } from '@/types';

// Component
export interface RemarkComponentProps {
  remark: Remark
}
export const RemarkComponent = ({ remark }: RemarkComponentProps) => {
  // Context
  const { data: user } = useUser();

  // State
  const [shouldOverrideLikeStyle, setShouldOverrideLikeStyle] = useState(false);

  // Handlers
  const handleRemarkClick: React.MouseEventHandler<HTMLElement> = () => {
    // Toggle.
    setShouldOverrideLikeStyle(!shouldOverrideLikeStyle);
  };

  const handleRemarkMouseOut: React.MouseEventHandler<HTMLElement> = () => {
    // Turn off.
    setShouldOverrideLikeStyle(false);
  };

  // Calculated Props
  const likeStyleOverride = shouldOverrideLikeStyle ? { style: { display: 'block' } } : {};

  return (
    <article
      className={styles.remark}
      onClick={handleRemarkClick}
      onMouseOut={handleRemarkMouseOut}
    >
      <p className={styles.content}>{remark.content}</p>
      {user?.uid && (
        <div className={styles.like} {...likeStyleOverride}>
          <LikeComponent remark={remark} />
        </div>
      )}
    </article>
  );
};