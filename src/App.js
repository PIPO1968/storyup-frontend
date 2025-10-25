import React, { useState, useEffect } from 'react';
import HeaderExtras from './HeaderExtras';
import AuthPage from './AuthPage';

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

export default App;

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

function App() {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(getCookie('token') || '');
    const [sessionExpired, setSessionExpired] = useState(false);
    const goTo = () => { };

    // Recuperar usuario automáticamente si hay token
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
                            nick: data.nick || '-',
                            curso: data.curso || '-',
                            email: data.email || '-',
                            tipoUsuario: data.tipoUsuario || '-',
                            tipoCentro: data.tipoCentro || '-',
                            nombreCentro: data.nombreCentro || '-'
                        });
                        setSessionExpired(false);
                        // Enviar evento de actividad al backend para marcar online
                        await fetch(process.env.REACT_APP_API_URL + '/event', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + token
                            },
                            body: JSON.stringify({ type: 'active', data: { page: 'perfil' } })
                        });
                    } else if (res.status === 401 || res.status === 403) {
                        setUser(null);
                        setToken('');
                        setCookie('token', '', -1);
                        setSessionExpired(true);
                    }
                } catch {
                    // Error de red, no expulsar al usuario
                }
            }
        };
        fetchUser();
    }, [token]);

    // Al hacer login, guardar token y usuario
    const handleLogin = (userData) => {
        if (userData.token) {
            setToken(userData.token);
            setCookie('token', userData.token, 7);
        }
        setUser({
            nombre: userData.nombre || '-',
            nick: userData.nick || '-',
            curso: userData.curso || '-',
            email: userData.email || '-',
            tipoUsuario: userData.tipoUsuario || '-',
            tipoCentro: userData.tipoCentro || '-',
            nombreCentro: userData.nombreCentro || '-'
        });
    };

    return (
        <div className="main-container" style={{ width: '100%', margin: 0, padding: 0 }}>
            {/* Header fijo */}
            <header className="header" style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/favicon.ico" alt="favicon" style={{ height: 28, width: 28, marginLeft: 14, marginRight: 18, borderRadius: 6, boxShadow: '0 1px 4px #2222' }} />
                <HeaderExtras />
            </header>
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
                    <div>
                        {/* Sidebar: mostrar siempre si hay usuario logueado */}
                        <nav className="sidebar" style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '24px 0' }}>
                            <a href="#" style={{ margin: '0 16px' }} onClick={() => goTo('home')}>Historias</a>
                            <a href="#" style={{ margin: '0 16px' }} onClick={() => goTo('create')}>Crea tu Historia</a>
                            <a href="#" style={{ margin: '0 16px' }} onClick={() => goTo('news')}>Noticias</a>
                            <a href="#" style={{ margin: '0 16px' }} onClick={() => goTo('contests')}>Concursos</a>
                            <a href="#" style={{ margin: '0 16px' }} onClick={() => goTo('stats')}>Estadísticas</a>
                            <a href="#" style={{ margin: '0 16px' }} onClick={() => goTo('trophies')}>Trofeos</a>
                            <a href="#" style={{ margin: '0 16px' }} onClick={() => goTo('learn')}>Aprende con Pipo</a>
                            <a href="#" style={{ margin: '0 16px' }} onClick={() => goTo('profile')}>Perfil</a>
                        </nav>
                        <div style={{ width: '100%', padding: '48px 0 0 0', boxSizing: 'border-box', background: 'transparent' }}>
                            <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center', minHeight: 320, gap: '32px', boxSizing: 'border-box', width: '100%', margin: '0 auto' }}>
                                <div className="block" style={{ width: '50%', minWidth: 320, textAlign: 'left', padding: '48px 0 48px 24px', marginLeft: '32px', background: '#fff', borderRadius: 18, boxShadow: '0 2px 16px #2221', boxSizing: 'border-box' }}>
                                    <h2>Datos personales</h2>
                                    <div style={{ maxWidth: 340 }}>
                                        <p><b>Nombre:</b> {user.nombre ? user.nombre : '-'}</p>
                                        <p><b>Nick:</b> {user.nick ? user.nick : '-'}</p>
                                        <p><b>Curso:</b> {user.curso ? user.curso : '-'}</p>
                                        <p><b>Email:</b> {user.email ? user.email : '-'}</p>
                                        <p><b>Tipo de usuario:</b> {user.tipoUsuario ? user.tipoUsuario : '-'}</p>
                                        <p><b>Centro:</b> {user.tipoCentro ? user.tipoCentro : '-'} - {user.nombreCentro ? user.nombreCentro : '-'}</p>
                                        {/* Subidor de avatar */}
                                        <form
                                            onSubmit={async (e) => {
                                                e.preventDefault();
                                                const fileInput = e.target.elements.avatar;
                                                if (!fileInput.files.length) return;
                                                const formData = new FormData();
                                                formData.append('avatar', fileInput.files[0]);
                                                const res = await fetch(process.env.REACT_APP_API_URL + '/me/avatar', {
                                                    method: 'POST',
                                                    headers: {
                                                        'Authorization': 'Bearer ' + token
                                                    },
                                                    body: formData
                                                });
                                                if (res.ok) {
                                                    const data = await res.json();
                                                    setUser(u => ({ ...u, avatar: data.avatarUrl }));
                                                } else {
                                                    alert('Error al subir el avatar');
                                                }
                                            }}
                                            style={{ marginTop: 16 }}
                                        >
                                            <label style={{ fontWeight: 500 }}>Avatar:</label><br />
                                            <input type="file" name="avatar" accept="image/*" style={{ marginBottom: 8 }} />
                                            <button type="submit" style={{ padding: '6px 16px', borderRadius: 6, border: 'none', background: '#3949ab', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>Subir avatar</button>
                                            {user.avatar && (
                                                <div style={{ marginTop: 12 }}>
                                                    <img src={user.avatar} alt="Avatar" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', boxShadow: '0 1px 6px #2222' }} />
                                                </div>
                                            )}
                                        </form>
                                    </div>
                                </div>
                                <div className="block" style={{ width: '50%', minWidth: 320, textAlign: 'left', padding: '48px 24px 48px 0', background: '#fff', borderRadius: 18, boxShadow: '0 2px 16px #2221', boxSizing: 'border-box' }}>
                                    <h2 style={{ textAlign: 'center' }}>Trofeos conseguidos</h2>
                                    <div style={{ maxWidth: 340, margin: '0 auto', textAlign: 'center' }}>
                                        <p>No tienes trofeos aún.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="block" style={{ width: 'calc(100% - 16px)', margin: '32px 0 0 auto', padding: '48px 32px', background: '#fff', borderRadius: 18, boxShadow: '0 2px 16px #2221', boxSizing: 'border-box', minWidth: 320, maxWidth: 1400 }}>
                                <h2 style={{ textAlign: 'center' }}>Chat</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                                    <div style={{ width: '100%', maxWidth: 700, height: 260, background: '#f3f6fa', borderRadius: 12, marginBottom: 24, overflowY: 'auto', padding: 16, boxShadow: '0 1px 6px #2221' }}>
                                        {/* Aquí se mostrarán los mensajes del chat */}
                                        <div style={{ color: '#888', textAlign: 'center', marginTop: 80 }}>
                                            No hay mensajes aún.
                                        </div>
                                    </div>
                                    <form style={{ display: 'flex', width: '100%', maxWidth: 700 }} onSubmit={e => e.preventDefault()}>
                                        <input type="text" placeholder="Escribe tu mensaje..." style={{ flex: 1, padding: '12px 16px', borderRadius: 8, border: '1px solid #dbe2ea', fontSize: 16, marginRight: 12 }} />
                                        <button type="submit" style={{ padding: '12px 24px', borderRadius: 8, border: 'none', background: '#3949ab', color: '#fff', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Enviar</button>
                                    </form>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center', minHeight: 220, gap: '32px', boxSizing: 'border-box', width: '100%', margin: '32px auto 0 auto' }}>
                                <div className="block" style={{ width: '50%', minWidth: 320, textAlign: 'center', padding: '48px 0', background: '#fff', borderRadius: 18, boxShadow: '0 2px 16px #2221', boxSizing: 'border-box' }}>
                                    <h2>Crear Noticia</h2>
                                    <p>Contenido del bloque para crear una noticia.</p>
                                </div>
                                <div className="block" style={{ width: '50%', minWidth: 320, textAlign: 'center', padding: '48px 0', background: '#fff', borderRadius: 18, boxShadow: '0 2px 16px #2221', boxSizing: 'border-box' }}>
                                    <h2>Crear Concurso</h2>
                                    <p>Contenido del bloque para crear un concurso.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
