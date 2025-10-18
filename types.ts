
export interface Memo {
  id: string;
  content: string; // HTML content
  createdAt: number;
  updatedAt: number;
  deletedAt?: number | null;
}

export type SortType = 'updatedAt' | 'title';

export type ViewType = 'list' | 'editor' | 'trash';
