import { User } from '../../types/User';
import { UserItem } from '../UserItem/UserItem';

export const UserTable = ({ users, deleteUser }: { users: User[]; deleteUser: any }) => {
  return (
    <ul>
      {users.map((user: User) => (
        <UserItem user={user} deleteUser={() => { }} key={user.id} />
      ))}
    </ul>
  );
}
