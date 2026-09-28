import { useState } from 'react';
import { read, write, remove } from '../lib/storage';
import { AuthContext } from './auth';

const USERS_KEY = 'folio_users_v1';
const SESSION_KEY = 'folio_session_v1';

// A guest still gets a shelf and a goal — the account just isn't saved.
const GUEST_USER = { id: 'guest', name: 'Guest Reader', username: 'guest' };

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => read(SESSION_KEY, null));

  const users = read(USERS_KEY, {});
  const user = userId === GUEST_USER.id ? GUEST_USER : (users[userId] ?? null);

  const signUp = (name, username) => {
    const cleanName = name.trim();
    const cleanUsername = username.trim().toLowerCase();
    if (!cleanName || !cleanUsername) return { error: 'Name and username are required.' };

    const allUsers = read(USERS_KEY, {});
    const taken =
      Object.values(allUsers).some((u) => u.username === cleanUsername) ||
      cleanUsername === GUEST_USER.username;
    if (taken) return { error: 'That username is already taken.' };

    const newUser = {
      id: `u-${Date.now()}`,
      name: cleanName,
      username: cleanUsername,
      createdAt: new Date().toISOString(),
    };

    allUsers[newUser.id] = newUser;
    if (!write(USERS_KEY, allUsers)) return { error: 'Could not save your account on this device.' };

    write(SESSION_KEY, newUser.id);
    setUserId(newUser.id);
    return { user: newUser };
  };

  const signIn = (username) => {
    const cleanUsername = username.trim().toLowerCase();
    const found = Object.values(read(USERS_KEY, {})).find((u) => u.username === cleanUsername);
    if (!found) return { error: 'No account found with that username.' };

    write(SESSION_KEY, found.id);
    setUserId(found.id);
    return { user: found };
  };

  const continueAsGuest = () => {
    write(SESSION_KEY, GUEST_USER.id);
    setUserId(GUEST_USER.id);
  };

  const signOut = () => {
    remove(SESSION_KEY);
    setUserId(null);
  };

  // Pages greet the reader by first name, so work it out once here.
  const firstName = user ? user.name.split(' ')[0] : '';

  return (
    <AuthContext.Provider value={{ user, firstName, signUp, signIn, continueAsGuest, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
