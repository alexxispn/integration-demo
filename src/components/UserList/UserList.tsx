import { Button } from "../Button/Button";
import { useUsers } from "../../hooks/useUsers";


export interface User {
  id: string;
  name: string;
}

export const UserList = () => {
  const { users, addUser, setFilter, filter, deleteUser } = useUsers()

  if (!users) {
    return null;
  }

  return (
    <>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {users.map((user: User) => (
          <li key={user.id}>
            <p>{user.name}</p>
            <Button text="Delete" onClick={deleteUser(user.id)} />
          </li>
        ))}
      </ul>

      <Button
        text="Add"
        onClick={() => addUser({ id: "1", name: "Pepa" })}
      />
    </>
  );
};

