import { Timestamp } from 'firebase/firestore';
import { sortRemarksByLikes } from './sortRemarksByLikes';

import type { Remark, Like } from '../types';

const testTimestamp = Timestamp.fromDate(new Date());
const testRemarks: Remark[] = [
  {
    id: 'A',
    content: 'first',
    timestamp: testTimestamp,
  },
  {
    id: 'B',
    content: 'second',
    timestamp: testTimestamp,
  },
  {
    id: 'C',
    content: 'third',
    timestamp: testTimestamp,
  },
  {
    id: 'D',
    content: 'forth',
    timestamp: testTimestamp,
  },
  {
    id: 'E',
    content: 'fifth',
    timestamp: testTimestamp,
  },
];

describe('sortRemarksByLikes(remarks: Remark[], likes: Like[]): Remark[]', () => {
  it('sorts by likes', () => {
    /* Let's suppose that
       C has 2 likes,
       B has 1 like,
       A has 0 likes,
       E has 1 dislike,
       D has 2 dislikes. */
    const likes: Like[] = [
      {
        id: 'irrelevant',
        remarkId: 'C',
        userId: 'irrelevant',
        vote: true,
        timestamp: testTimestamp,
      },
      {
        id: 'irrelevant',
        remarkId: 'C',
        userId: 'irrelevant',
        vote: true,
        timestamp: testTimestamp,
      },
      {
        id: 'irrelevant',
        remarkId: 'B',
        userId: 'irrelevant',
        vote: true,
        timestamp: testTimestamp,
      },
      {
        id: 'irrelevant',
        remarkId: 'E',
        userId: 'irrelevant',
        vote: false,
        timestamp: testTimestamp,
      },
      {
        id: 'irrelevant',
        remarkId: 'D',
        userId: 'irrelevant',
        vote: false,
        timestamp: testTimestamp,
      },
      {
        id: 'irrelevant',
        remarkId: 'D',
        userId: 'irrelevant',
        vote: false,
        timestamp: testTimestamp,
      },
    ];

    // Remarks should be sorted C, B, A, E, D.
    const expected: Remark[] = [
      {
        id: 'C',
        content: 'third',
        timestamp: testTimestamp,
      },
      {
        id: 'B',
        content: 'second',
        timestamp: testTimestamp,
      },
      {
        id: 'A',
        content: 'first',
        timestamp: testTimestamp,
      },
      {
        id: 'E',
        content: 'fifth',
        timestamp: testTimestamp,
      },
      {
        id: 'D',
        content: 'forth',
        timestamp: testTimestamp,
      },
    ];

    // Let's see what happens.
    const result = sortRemarksByLikes(testRemarks, likes);

    expect(result).toMatchObject(expected);
  });
});
