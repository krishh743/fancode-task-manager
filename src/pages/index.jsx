import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserList from './UserList';

const UsersCompletedTask = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('http://jsonplaceholder.typicode.com/users');
        const todosResponse = await axios.get('http://jsonplaceholder.typicode.com/todos');

        const fancodeUsers = usersResponse.data.filter(user => {
          const { lat, lng } = user.address.geo;
          return lat > -40 && lat < 5 && lng > 5 && lng < 100;
        });

        const usersWithTodos = fancodeUsers.map(user => {
          const userTodos = todosResponse.data.filter(todo => todo.userId === user.id);
          const completedTasks = userTodos.filter(todo => todo.completed).length;
          const totalTasks = userTodos.length;
          const completedPercentage = (completedTasks / totalTasks) * 100;

          return {
            ...user,
            completedPercentage,
          };
        });

        const filteredUsers = usersWithTodos.filter(user => user.completedPercentage > 50);

        setUsers(filteredUsers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>FanCode Users with More Than 50% Completed Tasks</h1>
      {loading ? <p>Loading...</p> : <UserList users={users} />}
    </div>
  );
};

export default UsersCompletedTask;
