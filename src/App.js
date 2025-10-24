
import React, { useState, useEffect } from 'react';

// Utilidad para manejar cookies
function setCookie(name, value, days = 7) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

import './App.css';
import AuthPage from './AuthPage';
import HeaderExtras from './HeaderExtras';

// ...existing code...
// ...existing code...

function App() {
    // ...existing code...

    // Refrescar token si el usuario está activo
    const refreshToken = async () => {
        if (!token) return;
        try {
            const res = await fetch(process.env.REACT_APP_API_URL + '/refresh-token', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            if (res.ok) {
                const data = await res.json();
                setToken(data.token);
                setCookie('token', data.token, 1);
            }
        } catch { }
    };

    // Función general para enviar cualquier acción/evento
    const sendEvent = async (token, type, data) => {
        if (!token) return;
        await fetch(process.env.REACT_APP_API_URL + '/event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ type, data })
        });
        await refreshToken(); // Refresca el token tras cada acción
    };
    const [page, setPage] = useState('home');
    const [user, setUser] = useState(null);
    const [profileForm, setProfileForm] = useState({ nombre: '', nick: '', curso: '' });
    const [token, setToken] = useState(getCookie('token') || '');

    // Navegación global
    const goTo = (newPage) => {
        setPage(newPage);
        // Enviar evento de actividad cada vez que navega
        sendEvent(token, 'navigate', { page: newPage });
    };

    // Guardar token y usuario tras login y navegar a perfil
    const handleLogin = (data) => {
        if (data.token && data.user) {
            setToken(data.token);
            setCookie('token', data.token, 7);
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
    const [sessionExpired, setSessionExpired] = useState(false);
    // Mantener usuario online enviando evento cada 30 segundos
    useEffect(() => {
        if (!token || !user) return;
        const interval = setInterval(() => {
            sendEvent(token, 'active', { page });
        }, 30000); // 30 segundos
        return () => clearInterval(interval);
    }, [token, user, page]);

    // Validar sesión al cargar la app y enviar evento al cargar perfil
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
                        // Enviar evento de actividad al cargar perfil
                        sendEvent(token, 'active', { page });
                        setSessionExpired(false);
                    } else if (res.status === 401 || res.status === 403) {
                        setUser(null);
                        setToken('');
                        setCookie('token', '', -1);
                        setSessionExpired(true);
                    }
                    // Si es otro error, no expulsar al usuario
                } catch {
                    // Error de red, no expulsar al usuario
                }
            }
        };
        fetchUser();
    }, [token]);

    return (
        <div className="main-container">
            {/* Header fijo */}
            <header className="header" style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/favicon.ico" alt="favicon" style={{ height: 28, width: 28, marginLeft: 14, marginRight: 18, borderRadius: 6, boxShadow: '0 1px 4px #2222' }} />
                <HeaderExtras />
                {user && (
                    <button
                        onClick={() => {
                            setUser(null);
                            setToken('');
                            setCookie('token', '', -1); // Eliminar cookie
                            goTo('home');
                        }}
                        style={{ marginLeft: 'auto', marginRight: 16, padding: '6px 16px', borderRadius: 6, border: 'none', background: '#e74c3c', color: 'white', fontWeight: 600, cursor: 'pointer' }}
                    >
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
                            {sessionExpired && (
                                <div style={{ color: 'red', marginBottom: 12, fontWeight: 600 }}>
                                    Tu sesión ha expirado. Por favor, inicia sesión de nuevo.
                                </div>
                            )}
                            <AuthPage onLogin={handleLogin} goTo={goTo} />
                        </div>
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                            <img src="/logo-grande.png.png" alt="Logo grande" style={{ maxWidth: 320, width: '100%', borderRadius: 18, boxShadow: '0 4px 24px #2222' }} />
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center', marginTop: 32, minHeight: 320, gap: '32px', boxSizing: 'border-box' }}>
                        <div className="block" style={{ flex: 1, textAlign: 'left', padding: '48px 0 48px 14px', background: '#fff', borderRadius: 18, boxShadow: '0 2px 16px #2221', boxSizing: 'border-box' }}>
                            <h2>Datos personales</h2>
                            <div style={{ maxWidth: 340 }}>
                                <p><b>Nombre:</b> {user.nombre ? user.nombre : '-'}</p>
                                <p><b>Nick:</b> {user.nick ? user.nick : '-'}</p>
                                <p><b>Curso:</b> {user.curso ? user.curso : '-'}</p>
                                <p><b>Email:</b> {user.email ? user.email : '-'}</p>
                                <p><b>Tipo de usuario:</b> {user.tipoUsuario ? user.tipoUsuario : '-'}</p>
                                <p><b>Centro:</b> {user.tipoCentro ? user.tipoCentro : '-'} - {user.nombreCentro ? user.nombreCentro : '-'}</p>
                            </div>
                        </div>
                        <div className="block" style={{ flex: 1, textAlign: 'left', padding: '48px 16px 48px 0', background: '#fff', borderRadius: 18, boxShadow: '0 2px 16px #2221', boxSizing: 'border-box' }}>
                            <h2>Trofeos conseguidos</h2>
                            <div style={{ maxWidth: 340 }}>
                                <p>No tienes trofeos aún.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
