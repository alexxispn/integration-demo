import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserItem } from './UserItem';
import userEvent from '@testing-library/user-event';

const mockDeleteUser = jest.fn();

const user = {
  id: '1',
  name: 'John Doe',
};

describe('UserItem', () => {
  it('should render user name and delete button', () => {
    render(<UserItem user={user} deleteUser={mockDeleteUser} />);
    const userName = screen.getByText(user.name);
    const deleteButton = screen.getByText('Delete');

    expect(userName).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  it('should call deleteUser when delete button is clicked', () => {
    render(<UserItem user={user} deleteUser={mockDeleteUser} />);
    const deleteButton = screen.getByText('Delete');

    userEvent.click(deleteButton);

    expect(mockDeleteUser).toHaveBeenCalledWith(user.id);
  });
});
