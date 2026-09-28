import { useState } from 'react';
import { read, write, remove } from '../lib/storage';
import { AuthContext, GUEST_USER } from './auth';

const USERS_KEY = 'folio_users_v1';
const SESSION_KEY = 'folio_session_v1';

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => read(SESSION_KEY, null));

  const users = read(USERS_KEY, {});
  const user = userId === 'guest' ? GUEST_USER : users[userId] ?? null;

  const signUp = (name, username) => {
    const cleanName = name.trim();
    const cleanUsername = username.trim().toLowerCase();
    if (!cleanName || !cleanUsername) return { error: 'Name and username are required.' };
    const all = read(USERS_KEY, {});
    const taken =
      Object.values(all).some((u) => u.username === cleanUsername) ||
      cleanUsername === 'guest';
    if (taken) return { error: 'That username is already taken.' };
    const newUser = {
      id: `u-${Date.now()}`,
      name: cleanName,
      username: cleanUsername,
      createdAt: new Date().toISOString(),
    };
    all[newUser.id] = newUser;
    if (!write(USERS_KEY, all)) return { error: 'Could not save your account on this device.' };
    write(SESSION_KEY, newUser.id);
    setUserId(newUser.id);
    return { user: newUser };
  };

  const signIn = (username) => {
    const cleanUsername = username.trim().toLowerCase();
    const all = read(USERS_KEY, {});
    const found = Object.values(all).find((u) => u.username === cleanUsername);
    if (!found) return { error: 'No account found with that username.' };
    write(SESSION_KEY, found.id);
    setUserId(found.id);
    return { user: found };
  };

  const continueAsGuest = () => {
    write(SESSION_KEY, 'guest');
    setUserId('guest');
  };

  const signOut = () => {
    remove(SESSION_KEY);
    setUserId(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isGuest: userId === 'guest', signUp, signIn, continueAsGuest, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
