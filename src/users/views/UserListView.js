import React, { useState, useEffect } from 'react';
import { call } from '../api/userApi';

function UserListView() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await call('/users/allusers', 'GET');
      console.log('Fetched users:', response);
      setUsers(response);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAdminRole = async (email) => {
    try {
      await call('/users/setRole', 'POST', { email });
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error('Failed to toggle admin role:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Roles</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email}>
              <td>{user.email}</td>
              <td>{user.realName}</td>
              <td>{user.roleSet ? Array.from(user.roleSet).join(', ') : 'No roles'}</td>
              <td>
                <button onClick={() => toggleAdminRole(user.email)}>
                  {user.roleSet && user.roleSet.includes('ADMIN') ? 'Remove Admin' : 'Make Admin'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserListView;