import { createContext } from 'react';

// The auth context object lives in its own file so this module exports no
// components — that is what keeps Vite's Fast Refresh working.
// The provider is in AuthContext.jsx, the hook in hooks/useAuth.js.
export const AuthContext = createContext(null);
