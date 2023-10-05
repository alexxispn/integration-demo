import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserTable } from './UserTable';

const users = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
];

describe('UserTable', () => {
  it('should render a list of users', () => {
    render(<UserTable users={users} deleteUser={() => { }} />);
    users.forEach((user) => {
      expect(screen.getByText(user.name)).toBeInTheDocument();
    });
  });
});
