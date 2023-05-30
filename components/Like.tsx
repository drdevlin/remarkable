'use client';

import {
  collection,
  query,
  where,
  addDoc,
  updateDoc,
  doc,
  Timestamp,
} from '@firebase/firestore';
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire';

import ThumbsUpSVG from '@/components/svg/ThumbsUpSVG';
import ThumbsDownSVG from '@/components/svg/ThumbsDownSVG';

import styles from './Like.module.css';

import type { CollectionReference } from '@firebase/firestore';
import type { Remark, Like } from '@/types';

// Helpers
const selectedColour = 'rgb(var(--dark-rgb))';
const unselectedColour = 'rgb(var(--primary-rgb))';

// Component
export interface LikeComponentProps {
  remark: Remark;
}
export const LikeComponent = ({ remark }: LikeComponentProps) => {
  // Context
  const { data: user } = useUser(); 
  const firestore = useFirestore();

  // Queries
  /* Likes */
  const likesCollection = collection(firestore, 'likes') as CollectionReference<Like>;
  // Filter by current user.
  const likesQuery = query(likesCollection, where('userId', '==', user?.uid || ''));
  const { data: likes } = useFirestoreCollectionData(likesQuery, { idField: 'id' });
  // Get the like for this remark.
  const likeForRemark = likes ? likes.find((like) => like.remarkId === remark.id) : undefined;
  /* Note:
     We want to filter the likes by remark on the frontend and not in the query.
     This is because the query is cached and thus not re-requested for every remark.
     Filtering by remark in the query would create distinct queries and requests
     for each remark, rather than just one.
  */

  // Handlers
  const handleClick = (vote: boolean): React.MouseEventHandler<HTMLButtonElement> => (event) => {
    event.preventDefault();

    if (!user?.uid) return;

    (async () => {
      if (likeForRemark) {
        await updateDoc(doc(firestore, 'likes', likeForRemark.id), {
          vote,
          timestamp: Timestamp.fromDate(new Date()),
        });
      } else {
        await addDoc(collection(firestore, 'likes'), {
          userId: user.uid,
          remarkId: remark.id,
          vote,
          timestamp: Timestamp.fromDate(new Date()),
        });
      } 
    })();
    // TODO: Error Handling
  };

  // Calculated Props
  const isThumbsUp = likeForRemark?.vote;
  const isThumbsDown = likeForRemark && !likeForRemark.vote;
  const thumbsUpFill = isThumbsUp ? selectedColour : unselectedColour;
  const thumbsDownFill = isThumbsDown ? selectedColour : unselectedColour;

  return (
    <div className={styles.like}>
      <button className={styles.button} onClick={handleClick(true)}>
        <ThumbsUpSVG height={24} width={24} alt="thumbs up" fill={thumbsUpFill} />
      </button>
      <button className={styles.button} onClick={handleClick(false)}>
        <ThumbsDownSVG height={24} width={24} alt="thumbs down" fill={thumbsDownFill} />
      </button>
    </div>
  );
};
