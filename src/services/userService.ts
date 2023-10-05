export const getUsers = async (): Promise<any> => {
    const response = await fetch(
        'https://jsonplaceholder.typicode.com/users', {
        method: 'GET',
    })
    return response.json()
}
export const getUserById = async (userId: string): Promise<any> => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    return response.json();
};
