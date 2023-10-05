export const MockConfig = ({ mockWriteFileSync, mockFetch }: { mockWriteFileSync?: jest.Mock, mockFetch?: jest.Mock } = {}) => {
  jest.mock('fs', () => ({
    writeFileSync: mockWriteFileSync || jest.fn(),
  }));
  global.fetch = mockFetch || jest.fn();
};
