import { User } from '../../types/User';

export const UserItem = ({ user, deleteUser }: { user: User; deleteUser: any }) => {
  return (
    <li>
      <p>{user.name}</p>
      <button onClick={() => deleteUser(user.id)}>Delete</button>
    </li>
  );
}


