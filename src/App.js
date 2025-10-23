
import React from 'react';


import './App.css';
import AuthPage from './AuthPage';
import HeaderExtras from './HeaderExtras';


import { useState } from 'react';

function App() {
    const [page, setPage] = useState('home');
    const [user, setUser] = useState(null);
    return (
        <div className="main-container">
            {/* Header fijo */}
            <header className="header" style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/favicon.ico" alt="favicon" style={{ height: 28, width: 28, marginLeft: 14, marginRight: 18, borderRadius: 6, boxShadow: '0 1px 4px #2222' }} />
                <HeaderExtras />
            </header>
            {/* Sidebar solo en páginas internas (no en home ni en registro) */}
            {page !== 'home' && page !== 'register' && (
                <nav className="sidebar">
                    <a href="#" style={{ margin: '0 16px' }} onClick={() => setPage('home')}>Historias</a>
                    <a href="#" style={{ margin: '0 16px' }} onClick={() => setPage('create')}>Crea tu Historia</a>
                    <a href="#" style={{ margin: '0 16px' }} onClick={() => setPage('news')}>Noticias</a>
                    <a href="#" style={{ margin: '0 16px' }} onClick={() => setPage('contests')}>Concursos</a>
                    <a href="#" style={{ margin: '0 16px' }} onClick={() => setPage('stats')}>Estadísticas</a>
                    <a href="#" style={{ margin: '0 16px' }} onClick={() => setPage('trophies')}>Trofeos</a>
                    <a href="#" style={{ margin: '0 16px' }} onClick={() => setPage('learn')}>Aprende con Pipo</a>
                    <a href="#" style={{ margin: '0 16px' }} onClick={() => setPage('profile')}>Perfil</a>
                </nav>
            )}
            {/* Contenido de la página */}
            <div className="page-content">
                {!user ? (
                    <div style={{ display: 'flex', gap: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 40 }}>
                        <div style={{ flex: 1, minWidth: 320, maxWidth: 420 }}>
                            <AuthPage onLogin={setUser} />
                        </div>
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                            <img src="/logo-grande.png.png" alt="Logo grande" style={{ maxWidth: 320, width: '100%', borderRadius: 18, boxShadow: '0 4px 24px #2222' }} />
                        </div>
                    </div>
                ) : (
                    <div className="block" style={{ maxWidth: 500, margin: '40px auto', textAlign: 'center' }}>
                        <h2>¡Bienvenido, {user.nick || user.email}!</h2>
                        <p>Has iniciado sesión correctamente.</p>
                        {/* Aquí puedes mostrar más info de perfil o navegación */}
                    </div>
                )}
            </div>
        </div>

    );
}

export default App;
