import type { Remark, Like } from '@/types';

/* Tallies the likes for each remark, and sorts by the tallies. */
export const sortRemarksByLikes = (remarks: Remark[], likes: Like[]): Remark[] => {
  // Tally.
  const tallies = likes.reduce((tallyRecord: Map<string, number>, like) => {
    const weight = like.vote ? 1 : -1;
    const newTally = tallyRecord.has(like.remarkId) ? (tallyRecord.get(like.remarkId) || 0) + weight : weight;
    tallyRecord.set(like.remarkId, newTally);
    return tallyRecord;
  }, new Map());

  // Associate tallies to their remarks.
  const remarksWithTallies = remarks.map((remark): [Remark, number] => tallies.has(remark.id) ? [remark, tallies.get(remark.id) || 0] : [remark, 0]);

  // Sort remarks by tally, descending.
  const sortedWithTallies = remarksWithTallies.sort(([_, tallyA], [__, tallyB] ) => tallyB - tallyA);

  // Remove the tallies and return just the sorted remarks.
  return sortedWithTallies.map(([remark]) => remark);
}
