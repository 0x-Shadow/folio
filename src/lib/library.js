import { read, write } from './storage';
import { mockBookshelves } from '../data/mockBookshelves';

const SHELVES_KEY = 'folio_shelves_v1';
const GOALS_KEY = 'folio_goals_v1';

const DEFAULT_GOAL = 12;

// A brand-new account starts with a few books already shelved so the app is
// useful immediately. Everything the reader does afterwards is saved.
const seedShelves = () =>
  mockBookshelves.map(({ bookId, shelf }) => ({
    bookId,
    shelf,
    dateAdded: new Date().toISOString(),
  }));

export const getShelves = (userId) => {
  const allShelves = read(SHELVES_KEY, {});
  if (!userId) return [];
  if (!allShelves[userId]) {
    allShelves[userId] = seedShelves();
    write(SHELVES_KEY, allShelves);
  }
  return allShelves[userId];
};

export const addToShelf = (userId, bookId, shelf) => {
  const allShelves = read(SHELVES_KEY, {});
  const mine = allShelves[userId] ?? seedShelves();
  const existing = mine.find((entry) => entry.bookId === bookId);

  if (existing) {
    existing.shelf = shelf; // a book can only be on one shelf at a time
  } else {
    mine.push({ bookId, shelf, dateAdded: new Date().toISOString() });
  }

  allShelves[userId] = mine;
  return write(SHELVES_KEY, allShelves);
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
