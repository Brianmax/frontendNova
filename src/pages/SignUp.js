import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUp.css'

const SignUp = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:3001/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre: e.target.Nombre.value,
                    apellido: e.target.Apellido.value,
                    usuario: e.target.Usuario.value,
                    email: e.target.email.value,
                    password: e.target.password.value
                })
            });
            if (!response.ok) {
                throw new Error("Error en la solicitud");
            }

            const data = await response.json();
            setToken(data.token);
            console.log(data.token);
            localStorage.setItem("authToken", data.token);
            navigate("/dashboard");
        } catch (error) {
            setError(error.message);
            console.error("Error:", error);
        }
    }

    return (
        <div className="signup-container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
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
                        type="email"
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
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;