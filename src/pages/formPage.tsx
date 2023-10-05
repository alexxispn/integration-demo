import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import UserPostForm from './UserPostForm';

const FormPage = () => {
  const [associations, setAssociations] = useState([]);
  const users = [
    { id: '1', name: 'Usuario 1' },
    { id: '2', name: 'Usuario 2' },
    // Agrega más usuarios según sea necesario
  ];
  const posts = [
    { id: '1', title: 'Post 1' },
    { id: '2', title: 'Post 2' },
    // Agrega más posts según sea necesario
  ];

  const handleAssociate = (user, post) => {
    // Realiza la asociación y guarda los datos en el estado o en un archivo JSON
    const newAssociation = { user, post };
    setAssociations([...associations, newAssociation]);
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/form">Formulario</Link>
            </li>
          </ul>
        </nav>
        <Route
          path="/"
          exact
          render={() => (
            <div>
              <h1>Página Principal</h1>
              <ul>
                {associations.map((association, index) => (
                  <li key={index}>
                    Usuario: {association.user.name}, Post: {association.post.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        />
        <Route
          path="/form"
          render={() => (
            <UserPostForm users={users} posts={posts} onAssociate={handleAssociate} />
          )}
        />
      </div>
    </Router>
  );
};

export default FormPage;
