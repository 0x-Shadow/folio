import { createContext } from 'react';

// Shared auth primitives. This module intentionally exports no
// components so Fast Refresh rules stay happy — the provider lives
// in AuthContext.jsx and the hook in hooks/useAuth.js.
export const AuthContext = createContext(null);

export const GUEST_USER = { id: 'guest', name: 'Guest Reader', username: 'guest' };
