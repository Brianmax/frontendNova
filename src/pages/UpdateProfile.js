import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import Header from '../components/Header';
import '../styles/UpdateProfile.css';

const UpdateProfile = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);  // Nuevo estado para el mensaje de éxito
    const token = localStorage.getItem('authToken');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación de que todos los campos tengan contenido
        if (!nombre || !apellido || !usuario || !email || !password) {
            setError('Todos los campos deben ser completados.');
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:3001/api/v1/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    nombre,
                    apellido,
                    usuario,
                    email,
                    password
                })
            });

            if (response.status === 404) {
                throw new Error('El usuario no existe');
            }

            if (response.status === 400) {
                const errorData = await response.json();
                throw new Error(errorData.errors.join(' '));
            }

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            const data = await response.json();
            setSuccessMessage('La actualización se hizo correctamente.');
            setError(null);
            console.log(data);
        } catch (error) {
            setError(error.message);
            setSuccessMessage(null);  // Limpiar el mensaje de éxito en caso de error
            console.error('Error:', error);
        }
    };

    const getUsuario = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:3001/api/v1/users/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            const data = await response.json();
            setNombre(data.nombre);
            setApellido(data.apellido);
            setUsuario(data.usuario);
            setEmail(data.email);
        } catch (error) {
            setError(error.message);
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getUsuario();
    }, [token]);

    return (
        <div className="update">
            <Header />
            <form className="update-form" onSubmit={handleSubmit}>
                <h1>Update Profile</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                <div>
                    <input
                        type="text"
                        name="Nombre"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    <small>El nombre es requerido y debe ser una cadena de texto sin números ni caracteres especiales.</small>
                </div>
                <div>
                    <input
                        type="text"
                        name="Apellido"
                        placeholder="Apellido"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                    />
                    <small>El apellido es requerido y debe ser una cadena de texto sin números ni caracteres especiales.</small>
                </div>
                <div>
                    <input
                        type="text"
                        name="Usuario"
                        placeholder="Usuario"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                    />
                    <small>El usuario es requerido y debe ser una cadena de texto sin números ni caracteres especiales.</small>
                </div>
                <div>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <small>El email es requerido y debe tener un formato válido (ejemplo@dominio.com).</small>
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <small>La contraseña es requerida, debe ser una cadena de texto entre 8 y 40 caracteres, contener al menos una letra mayúscula y un número.</small>
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default UpdateProfile;