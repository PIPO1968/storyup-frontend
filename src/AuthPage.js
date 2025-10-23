import React, { useState } from 'react';

const cursos = [
    '3º ESO', '4º ESO', '5º ESO', '6º ESO', '7º ESO', '8º ESO', '1º INST', '2º INST'
];

export default function AuthPage({ onLogin }) {
    const [mode, setMode] = useState('login'); // 'login' o 'register'
    const [form, setForm] = useState({
        nombre: '', apellido: '', nick: '', email: '', password: '', tipoUsuario: '', tipoCentro: '', nombreCentro: '', curso: ''
    });
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleLogin = async e => {
        e.preventDefault();
        setMensaje(''); setError('');
        try {
            const res = await fetch(process.env.REACT_APP_API_URL + '/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: form.email, password: form.password })
            });
            const data = await res.json();
            if (res.ok) {
                setMensaje('¡Login correcto!');
                if (onLogin) onLogin(data);
            } else {
                setError(data.error || 'Error al iniciar sesión');
            }
        } catch (err) {
            setError('Error de red');
        }
    };

    const handleRegister = async e => {
        e.preventDefault();
        setMensaje(''); setError('');
        try {
            const res = await fetch(process.env.REACT_APP_API_URL + '/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (res.ok) {
                setMensaje('¡Registro exitoso! Ahora puedes iniciar sesión.');
                setMode('login');
                setForm({ nombre: '', apellido: '', nick: '', email: '', password: '', tipoUsuario: '', tipoCentro: '', nombreCentro: '', curso: '' });
            } else {
                setError(data.error || 'Error al registrar');
            }
        } catch (err) {
            setError('Error de red');
        }
    };

    return (
        <div className="block" style={{ maxWidth: 500, margin: '40px auto' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                <button onClick={() => { setMode('login'); setMensaje(''); setError(''); }} style={{ marginRight: 8, fontWeight: mode === 'login' ? 700 : 400 }}>Login</button>
                <button onClick={() => { setMode('register'); setMensaje(''); setError(''); }} style={{ fontWeight: mode === 'register' ? 700 : 400 }}>Registro</button>
            </div>
            {mode === 'login' ? (
                <form onSubmit={handleLogin}>
                    <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
                    <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
                    <button type="submit" style={{ width: '100%', marginTop: 8 }}>Iniciar sesión</button>
                </form>
            ) : (
                <form onSubmit={handleRegister}>
                    <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
                    <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
                    <input name="nick" placeholder="Nick" value={form.nick} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
                    <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
                    <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
                    <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                        <select name="tipoUsuario" value={form.tipoUsuario} onChange={handleChange} required style={{ flex: 1 }}>
                            <option value="">Alumno o Docente</option>
                            <option value="Alumno">Alumno</option>
                            <option value="Docente">Docente</option>
                        </select>
                        <select name="tipoCentro" value={form.tipoCentro} onChange={handleChange} required style={{ flex: 1 }}>
                            <option value="">CEIP o IES</option>
                            <option value="CEIP">CEIP</option>
                            <option value="IES">IES</option>
                        </select>
                        <input name="nombreCentro" placeholder="Nombre del centro" value={form.nombreCentro} onChange={handleChange} required style={{ flex: 2 }} />
                    </div>
                    <select name="curso" value={form.curso} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }}>
                        <option value="">Selecciona curso</option>
                        {cursos.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <button type="submit" style={{ width: '100%', marginTop: 8 }}>Registrarse</button>
                </form>
            )}
            {mensaje && <div style={{ color: 'green', marginTop: 8 }}>{mensaje}</div>}
            {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
        </div>
    );
}
