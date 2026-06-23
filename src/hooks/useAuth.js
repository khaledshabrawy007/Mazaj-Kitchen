import useLocalStorage from './useLocalStorage';
import { SEED_USERS } from '../data/users';

/**
 * useAuth — Single Responsibility (SOLID-S)
 * All authentication logic lives here.
 * Returns state + action functions — no localStorage access in components.
 */
function useAuth() {
  const [users, setUsers] = useLocalStorage('users', SEED_USERS);
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);

  const login = (email, password) => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) return { success: false, error: 'invalidLogin' };
    setCurrentUser(user);
    return { success: true, user };
  };

  const signup = (name, email, password) => {
    if (users.find((u) => u.email === email)) {
      return { success: false, error: 'emailExists' };
    }
    const newUser = { id: `u${Date.now()}`, name, email, password, role: 'user' };
    setUsers((prev) => [...prev, newUser]);
    return { success: true };
  };

  const logout = () => setCurrentUser(null);

  return { currentUser, users, login, signup, logout };
}

export default useAuth;
