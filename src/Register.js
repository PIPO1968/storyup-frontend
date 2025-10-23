import React, { useState } from 'react';

const cursos = [
    '3º ESO', '4º ESO', '5º ESO', '6º ESO', '7º ESO', '8º ESO', '1º INST', '2º INST'
];

function Register() {
    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        nick: '',
        email: '',
        password: '',
        tipoUsuario: '',
        tipoCentro: '',
        nombreCentro: '',
        curso: ''
    });
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setMensaje('');
        setError('');
        try {
            const res = await fetch(process.env.REACT_APP_API_URL + '/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (res.ok) {
                setMensaje('¡Registro exitoso!');
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
            <h2>Registro de Usuario</h2>
            <form onSubmit={handleSubmit}>
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
            {mensaje && <div style={{ color: 'green', marginTop: 8 }}>{mensaje}</div>}
            {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
        </div>
    );
}

export default Register;
