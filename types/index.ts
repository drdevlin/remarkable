import { Timestamp } from '@firebase/firestore';

export interface Remark {
  id: string;
  content: string;
  timestamp: Timestamp;
}

export interface Like {
  id: string;
  remarkId: string;
  userId: string;
  vote: boolean;
  timestamp: Timestamp;
}
