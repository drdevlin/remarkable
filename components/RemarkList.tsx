'use client';

import {
  collection,
  query,
  where,
  Timestamp,
} from '@firebase/firestore';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { sortRemarksByLikes } from '@/utils/sortRemarksByLikes';

import { RemarkComponent } from '@/components/Remark';

import styles from './RemarkList.module.css';

import type { CollectionReference } from '@firebase/firestore';
import type { Remark , Like } from '@/types';

// Component
interface RemarkListProps {
  /* Remarks are sorted by number of likes.
     The start date indicates when likes will start to be counted.
     This allows for a kind of like-activity filter.
     No start date indicates an all-time like count. */
  startDate?: Date;
}
export const RemarkList = ({ startDate }: RemarkListProps) => {
  // Context
  const firestore = useFirestore();

  // Queries
  /* Remarks */
  const remarksCollection = collection(firestore, 'remarks') as CollectionReference<Remark>;
  const remarksQuery = query(remarksCollection);
  const { data: remarks } = useFirestoreCollectionData(remarksQuery, { idField: 'id' });

  /* Likes */
  const likesCollection = collection(firestore, 'likes') as CollectionReference<Like>;
  const likesQuery = startDate ? (
    // Filter by start date.
    query(likesCollection, where('timestamp', '>=', Timestamp.fromDate(startDate)))
  ) : (
    // No filter.
    query(likesCollection) 
  );
  const { data: likes } = useFirestoreCollectionData(likesQuery, { idField: 'id' });

  // Calculated Props
  const sortedRemarks = remarks && likes ? sortRemarksByLikes(remarks, likes) : [];

  return (
    <section className={styles.remarkList}>
      {sortedRemarks.map((remark) => <RemarkComponent key={remark.id} remark={remark} />)}
    </section>
  );
};
