import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserItem } from './UserItem';
import userEvent from '@testing-library/user-event';

const user = {
  id: '1',
  name: 'John Doe',
};

describe('UserItem Integration Test', () => {
  it('should call deleteUser when delete button is clicked', () => {

    const mockDeleteUser = jest.fn();

    render(<UserItem user={user} deleteUser={mockDeleteUser} />);

    expect(screen.getByText(user.name)).toBeInTheDocument();

    const deleteButton = screen.getByText('Delete');
    userEvent.click(deleteButton);

    expect(mockDeleteUser).toHaveBeenCalledWith(user.id);
  });
});
