import fs from 'fs';
import { getUserById } from './userService';
import { getPostById } from './postService';

export const postCombineUserAndPost = async (userId: string, postId: string, dbPath: string) => {
  try {
    const user = await getUserById(userId);
    const post = await getPostById(postId);

    const userWithPost = {
      user: {
        ...user,
        posts: [post],
      },
    }

    const jsonData = JSON.stringify(userWithPost, null, 2);

    fs.writeFileSync(dbPath, jsonData, 'utf-8');
    console.log('Datos combinados escritos en fakeDB.json');

    return userWithPost;
  } catch (error) {
    console.error('Error al combinar usuario y post:', error);
    throw error;
  }
};
