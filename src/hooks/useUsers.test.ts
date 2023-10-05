import { renderHook } from '@testing-library/react-hooks';
import * as userService from '../services/userService';
import { useUsers } from './useUsers';

jest.mock('../services/userService');

describe('useUsers', () => {
  it('should return users as empty array on first update', () => {
    const { result } = renderHook(() => useUsers());
    const { users } = result.current;
    expect(users).toEqual([]);
  });

  it('should return the users on successful fetch', async () => {
    const userData = [{ id: '1', name: 'John Doe' }];
    jest.spyOn(userService, 'getUsers').mockResolvedValue(userData);

    const { result, waitForNextUpdate } = renderHook(() => useUsers());

    await waitForNextUpdate();

    const { users } = result.current;
    expect(users).toEqual(userData);
  });

  it('should add a user', () => {
    const { result } = renderHook(() => useUsers());
    const { addUser } = result.current;

    addUser({ id: '20', name: 'Other User' });

    const { users } = result.current;
    expect(users).toHaveLength(1);
    expect(users[0]).toEqual({ id: '20', name: 'Other User' });
  });

  it('should filter users by name', () => {
    const { result } = renderHook(() => useUsers());
    const { setFilter, addUser } = result.current;

    addUser({ id: '20', name: 'John Doe' });
    addUser({ id: '21', name: 'Jane Smith' });
    addUser({ id: '22', name: 'Alice Johnson' });

    setFilter('Alice');

    const { users } = result.current;

    expect(users).toHaveLength(1);
    expect(users[0]).toEqual({ id: '22', name: 'Alice Johnson' });
  });
  it('should filter users by name case-insensitively', () => {
    const { result } = renderHook(() => useUsers());
    const { setFilter, addUser } = result.current;

    addUser({ id: '20', name: 'John Doe' });
    addUser({ id: '21', name: 'Jane Smith' });
    addUser({ id: '22', name: 'Alice Johnson' });

    setFilter('ALICE');

    const { users } = result.current;

    expect(users).toHaveLength(1);
    expect(users[0]).toEqual({ id: '22', name: 'Alice Johnson' });
  });
});
