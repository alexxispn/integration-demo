import { postCombineUserAndPost } from './postCombineUserAndPost';
import { MockConfig } from '../test/factories/MockConfig';

const mockedFetch = {
  json: () => Promise.resolve({ id: '1', name: 'John Doe' }),
  status: 200,
};

MockConfig({ mockFetch: jest.fn(() => Promise.resolve(mockedFetch)) });

describe('postCombineUserAndPost', () => {
  it('should combine user and post data and write to fakeDB.json', async () => {
    const expectedUserWithPost = {
      user: {
        id: '1',
        name: 'John Doe',
        posts: [
          {
            id: '1',
            name: 'John Doe',
          },
        ],
      },
    };

    const dbPath = './src/db/fakeDB.json';
    const result = await postCombineUserAndPost('1', '1', dbPath);

    expect(result).toEqual(expectedUserWithPost);
  });
})
