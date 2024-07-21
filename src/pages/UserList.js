import React, { useEffect, useState } from 'react';
import UserDetail from '../components/UserDetail';
import Header from '../components/Header';
import '../styles/UserList.css';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('authToken');

    const getUsers = async () => {
        try {
            const response = await fetch(`https://backend-node-weathered-waterfall-3385.fly.dev/api/v1/users?page=${page}&limit=10`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            const data = await response.json();
            setUsers(data.users); // Asegúrate de que esto coincide con la estructura de la respuesta
            setTotalPages(data.totalPages);
        } catch (error) {
            setError(error.message);
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getUsers();
    }, [page]);

    return (
        <div className="users-list-container">
            <Header />
            <div className="users-list-header">
                <h1>Users List</h1>
            </div>
            {error && <p style={{color: 'red'}}>Error: {error}</p>}
            <ul>
                {users.map(user => (
                    <UserDetail key={user.id} user={user} />
                ))}
            </ul>
            <div className="pagination">
                <button onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))} disabled={page === 1}>
                    Previous
                </button>
                <span>{page} of {totalPages}</span>
                <button onClick={() => setPage(prevPage => Math.min(prevPage + 1, totalPages))} disabled={page === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default UsersList;
