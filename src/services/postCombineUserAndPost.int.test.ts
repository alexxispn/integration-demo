import fs from 'fs'; // Importa fs
import { postCombineUserAndPost } from './postCombineUserAndPost';

jest.mock('./userService', () => ({
  getUserById: jest.fn(),
}));

jest.mock('./postService', () => ({
  getPostById: jest.fn(),
}));

describe('postCombineUserAndPost', () => {
  beforeAll(() => {
    const filePath = './src/db/fakeDB.json';
    fs.writeFileSync(filePath, '[]', 'utf-8');
  });

  afterAll(() => {
    const filePath = './src/db/fakeDB.json';
    fs.writeFileSync(filePath, '[]', 'utf-8');
  });

  it('should combine user and post data and write to fakeDB.json', async () => {

    jest.spyOn(require('./userService'), 'getUserById').mockResolvedValue({ id: '1', name: 'John Doe' });
    jest.spyOn(require('./postService'), 'getPostById').mockResolvedValue({ userId: '1', title: 'Example Post' });
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

    expect(require('./userService').getUserById).toHaveBeenCalledWith('1');
    expect(require('./postService').getPostById).toHaveBeenCalledWith('1');

    expect(result).toEqual(expectedUserWithPost);
  });
});
