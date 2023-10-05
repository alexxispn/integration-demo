import { Button } from "../../components/Button/Button";
import { useUsers } from "../../hooks/useUsers";
import { UserTable } from "../../components/UserTable/UserTable";

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
      <UserTable users={users} deleteUser={deleteUser} />
      <Button
        text="Add"
        onClick={() => addUser({ id: "1", name: "Pepa" })}
      />
    </>
  );
};
