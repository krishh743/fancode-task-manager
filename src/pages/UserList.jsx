import React from 'react';
import './UserList.css'; 
const UserList = ({ users }) => {
  if (users.length === 0) {
    return <p>No users found with more than 50% completed tasks.</p>;
  }

  return (
    <div className="user-list">
      {users.map(user => (
        <div className="card" key={user.id}>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Completed Tasks Percentage:</strong> {user.completedPercentage.toFixed(2)}%</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
