import React from 'react';
import '../styles/UserDetail.css';

const UserDetail = ({ user }) => {
    return (
        <div className="user-detail">
            <p><span className="label">Nombre:</span> {user.nombre}</p>
            <p><span className="label">Apellido:</span> {user.apellido}</p>
            <p><span className="label">Usuario:</span> {user.usuario}</p>
            <p><span className="label">Email:</span> {user.email}</p>
            <p><span className="label">Password Encriptado:</span> {user.password}</p>
        </div>
    );
}

export default UserDetail;
