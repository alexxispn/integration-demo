import { useEffect, useState } from 'react';
import { getUsers } from '../services/userService';
import { User } from '../components/UserList/UserList';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    const asyncFunction = async () => {
      const response = await getUsers();
      setUsers(response);
    };

    asyncFunction();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(filter.toLowerCase())
  );

  return {
    users: filteredUsers,
    addUser: (user: User) => setUsers([...users, user]),
    filter,
    setFilter,
    deleteUser: (id: string) => setUsers(users.filter((user) => user.id !== id)),
  };
};

