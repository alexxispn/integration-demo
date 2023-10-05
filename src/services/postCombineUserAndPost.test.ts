import { postCombineUserAndPost } from './postCombineUserAndPost';


jest.mock('./userService', () => ({
  getUserById: jest.fn(),
}));

jest.mock('./postService', () => ({
  getPostById: jest.fn(),
}));

jest.mock('fs', () => ({
  writeFileSync: jest.fn(),
}));


afterEach(() => {
  jest.clearAllMocks();
});

describe('postCombineUserAndPost', () => {
  it('should combine user and post data and write to fakeDB.json', async () => {
    jest.spyOn(require('./userService'), 'getUserById').mockResolvedValue({ id: '1', name: 'John Doe' });
    jest.spyOn(require('./postService'), 'getPostById').mockResolvedValue({ userId: '1', title: 'Example Post' });
    jest.spyOn(require('fs'), 'writeFileSync').mockImplementation(() => { });

    const expectedUserWithPost = {
      user: {
        id: '1',
        name: 'John Doe',
        posts: [
          {
            userId: '1',
            title: 'Example Post',
          },
        ],
      },
    };

    const dbPath = './src/db/fakeDB.json';
    const result = await postCombineUserAndPost('1', '1', dbPath);

    expect(result).toEqual(expectedUserWithPost);
  });

  describe('errors', () => {
    it('should throw an error if getUserById fails', async () => {
      jest.spyOn(require('./userService'), 'getUserById').mockRejectedValue(new Error('getUserById failed'));

      await expect(postCombineUserAndPost('1', '1')).rejects.toThrow('getUserById failed');
    });
  });
});
