import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const UserPostForm = ({ users, posts, onAssociate }) => {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedPostId, setSelectedPostId] = useState('');

  const history = useHistory();

  const handleAssociate = () => {

    const user = users.find((user) => user.id === selectedUserId);
    const post = posts.find((post) => post.id === selectedPostId);

    if (user && post) {
      onAssociate(user, post);
      history.push('/');
    }
  };

  return (
    <div>
    <h2>Asociar Usuario y Post < /h2>
      <label>
        Selecciona un usuario:
  <select
          value={ selectedUserId }
  onChange = {(e) => setSelectedUserId(e.target.value)}
        >
  <option value="" > Selecciona un usuario < /option>
{
  users.map((user) => (
    <option key= { user.id } value = { user.id } >
    { user.name }
    < /option>
  ))
}
</select>
  < /label>
  < br />
  <label>
  Selecciona un post:
<select
          value={ selectedPostId }
onChange = {(e) => setSelectedPostId(e.target.value)}
        >
  <option value="" > Selecciona un post < /option>
{
  posts.map((post) => (
    <option key= { post.id } value = { post.id } >
    { post.title }
    < /option>
  ))
}
</select>
  < /label>
  < br />
  <button onClick={ handleAssociate }> Asociar < /button>
    < /div>
  );
};

export default UserPostForm;
