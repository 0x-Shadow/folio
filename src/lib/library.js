import { read, write } from './storage';
import { mockBookshelves } from '../data/mockBookshelves';

const SHELVES_KEY = 'folio_shelves_v1';
const GOALS_KEY = 'folio_goals_v1';

export const DEFAULT_GOAL = 12;

// First run for any account seeds the demo shelves so the app
// is useful immediately. Afterwards everything the user does persists.
const seedShelves = () =>
  mockBookshelves
    .filter((entry) => entry.userId === 1)
    .map(({ bookId, shelf, progress }) => ({
      bookId,
      shelf,
      ...(progress ? { progress } : {}),
      dateAdded: new Date().toISOString(),
    }));

export const getShelves = (userId) => {
  const all = read(SHELVES_KEY, {});
  if (!userId) return [];
  if (!all[userId]) {
    all[userId] = seedShelves();
    write(SHELVES_KEY, all);
  }
  return all[userId];
};

export const addToShelf = (userId, bookId, shelf) => {
  const all = read(SHELVES_KEY, {});
  const mine = all[userId] ?? seedShelves();
  const existing = mine.find((entry) => entry.bookId === bookId);
  if (existing) {
    existing.shelf = shelf;
  } else {
    mine.push({ bookId, shelf, dateAdded: new Date().toISOString() });
  }
  all[userId] = mine;
  return write(SHELVES_KEY, all);
};

export const setProgress = (userId, bookId, progress) => {
  const all = read(SHELVES_KEY, {});
  const mine = all[userId] ?? [];
  const entry = mine.find((e) => e.bookId === bookId);
  if (entry) entry.progress = progress;
  all[userId] = mine;
  return write(SHELVES_KEY, all);
};

export const getGoal = (userId) => {
  const goals = read(GOALS_KEY, {});
  return goals[userId]?.target ?? DEFAULT_GOAL;
};

export const setGoal = (userId, target) => {
  const goals = read(GOALS_KEY, {});
  goals[userId] = { target };
  return write(GOALS_KEY, goals);
};
