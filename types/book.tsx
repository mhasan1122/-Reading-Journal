// types/book.ts
export type BookStatus = 'To Read' | 'Reading' | 'Finished';

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  notes?: string;
  status: BookStatus;
  createdAt: string;
  finishedAt?: string;
  coverImage?: string;
}

export type SortOption = 'title' | 'rating' | 'createdAt';
export type SortOrder = 'asc' | 'desc';
