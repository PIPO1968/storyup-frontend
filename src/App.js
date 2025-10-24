
import React, { useState, useEffect } from 'react';


import './App.css';
import AuthPage from './AuthPage';
import HeaderExtras from './HeaderExtras';

// Función general para enviar cualquier acción/evento
async function sendEvent(token, type, data) {
    if (!token) return;
    await fetch(process.env.REACT_APP_API_URL + '/event', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ type, data })
    });
}



function App() {
    const [page, setPage] = useState('home');
    const [user, setUser] = useState(null);
    const [profileForm, setProfileForm] = useState({ nombre: '', nick: '', curso: '' });
    const [token, setToken] = useState('');

    // Navegación global
    const goTo = (newPage) => setPage(newPage);

    // Guardar token y usuario tras login y navegar a perfil
    const handleLogin = (data) => {
        if (data.token && data.user) {
            setToken(data.token);
            setUser({
                nombre: data.user.nombre || '-',
                apellido: data.user.apellido || '-',
                nick: data.user.nick || '-',
                email: data.user.email || '-',
                tipoUsuario: data.user.tipoUsuario || '-',
                tipoCentro: data.user.tipoCentro || '-',
                nombreCentro: data.user.nombreCentro || '-',
                curso: data.user.curso || '-',
            });
            setProfileForm({
                nombre: data.user.nombre || '',
                nick: data.user.nick || '',
                curso: data.user.curso || ''
            });
            goTo('profile');
        }
    };

    // Validar sesión al cargar la app
    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                try {
                    const res = await fetch(process.env.REACT_APP_API_URL + '/me', {
                        headers: { 'Authorization': 'Bearer ' + token }
                    });
                    if (res.ok) {
                        const data = await res.json();
                        useEffect(() => {
                            const fetchUser = async () => {
                                if (token) {
                                    try {
                                        const res = await fetch(process.env.REACT_APP_API_URL + '/me', {
                                            headers: { 'Authorization': 'Bearer ' + token }
                                        });
                                        if (res.ok) {
                                            const data = await res.json();
                                            setUser({
                                                nombre: data.nombre || '-',
                                                apellido: data.apellido || '-',
                                                nick: data.nick || '-',
                                                email: data.email || '-',
                                                tipoUsuario: data.tipoUsuario || '-',
                                                tipoCentro: data.tipoCentro || '-',
                                                nombreCentro: data.nombreCentro || '-',
                                                curso: data.curso || '-',
                                            });
                                            setProfileForm({
                                                nombre: data.nombre || '',
                                                nick: data.nick || '',
                                                curso: data.curso || ''
                                            });
                                        } else {
                                            setUser(null);
                                            setToken('');
                                        }
                                    } catch {
                                        setUser(null);
                                        setToken('');
                                    }
                                }
                            };
                            fetchUser();
                        }, [token]);
                        goTo('home');
                    }} style={{ marginLeft: 'auto', marginRight: 16, padding: '6px 16px', borderRadius: 6, border: 'none', background: '#e74c3c', color: 'white', fontWeight: 600, cursor: 'pointer' }}>
                        Cerrar sesión
                    </button>
                )}
            </header>
            {/* Sidebar: mostrar siempre si hay usuario logueado */}
            {user && (
                <nav className="sidebar">
                    <a href="#" style={{ margin: '0 16px' }} onClick={() => goTo('home')}>Historias</a>
                    <a href="#" style={{ margin: '0 16px' }} onClick={() => goTo('create')}>Crea tu Historia</a>
                    <a href="#" style={{ margin: '0 16px' }} onClick={() => goTo('news')}>Noticias</a>
                    <a href="#" style={{ margin: '0 16px' }} onClick={() => goTo('contests')}>Concursos</a>
                    <a href="#" style={{ margin: '0 16px' }} onClick={() => goTo('stats')}>Estadísticas</a>
                    <a href="#" style={{ margin: '0 16px' }} onClick={() => goTo('trophies')}>Trofeos</a>
                    <a href="#" style={{ margin: '0 16px' }} onClick={() => goTo('learn')}>Aprende con Pipo</a>
                    <a href="#" style={{ margin: '0 16px' }} onClick={() => goTo('profile')}>Perfil</a>
                </nav>
            )}
            <div className="page-content">
                {!user ? (
                    <div style={{ display: 'flex', gap: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 40 }}>
                        <div style={{ flex: 1, minWidth: 320, maxWidth: 420 }}>
                            <AuthPage onLogin={handleLogin} goTo={goTo} />
                        </div>
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                            <img src="/logo-grande.png.png" alt="Logo grande" style={{ maxWidth: 320, width: '100%', borderRadius: 18, boxShadow: '0 4px 24px #2222' }} />
                        </div>
                    </div>
                ) : (
                    <div className="block" style={{ maxWidth: 500, margin: '40px auto', textAlign: 'center' }}>
                        <h2>Perfil de usuario</h2>
                        <div style={{ textAlign: 'left', margin: '0 auto', maxWidth: 340 }}>
                            <label><b>Nombre:</b> <input name="nombre" value={profileForm.nombre} onChange={async e => {
                                const value = e.target.value;
                                setProfileForm(f => ({ ...f, nombre: value }));
                                await fetch(process.env.REACT_APP_API_URL + '/me', {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': 'Bearer ' + token
                                    },
                                    body: JSON.stringify({ ...profileForm, nombre: value })
                                });
                                setUser(u => ({ ...u, nombre: value }));
                            }} /></label><br />
                            <label><b>Nick:</b> <input name="nick" value={profileForm.nick} onChange={async e => {
                                const value = e.target.value;
                                setProfileForm(f => ({ ...f, nick: value }));
                                await fetch(process.env.REACT_APP_API_URL + '/me', {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': 'Bearer ' + token
                                    },
                                    body: JSON.stringify({ ...profileForm, nick: value })
                                });
                                setUser(u => ({ ...u, nick: value }));
                            }} /></label><br />
                            <label><b>Curso:</b> <input name="curso" value={profileForm.curso} onChange={async e => {
                                const value = e.target.value;
                                setProfileForm(f => ({ ...f, curso: value }));
                                await fetch(process.env.REACT_APP_API_URL + '/me', {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': 'Bearer ' + token
                                    },
                                    body: JSON.stringify({ ...profileForm, curso: value })
                                });
                                setUser(u => ({ ...u, curso: value }));
                            }} /></label><br />
                            <p><b>Email:</b> {user.email ? user.email : '-'}</p>
                            <p><b>Tipo de usuario:</b> {user.tipoUsuario ? user.tipoUsuario : '-'}</p>
                            <p><b>Centro:</b> {user.tipoCentro ? user.tipoCentro : '-'} - {user.nombreCentro ? user.nombreCentro : '-'}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
