
import React from 'react';


import './App.css';
import Register from './Register';
import HeaderExtras from './HeaderExtras';


import { useState } from 'react';

function App() {
    const [page, setPage] = useState('home');
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
                {page === 'home' ? (
                    <>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32, marginBottom: 40 }}>
                            <div className="block" style={{ background: 'linear-gradient(135deg,#e3f0ff 60%,#f9fafc 100%)', border: '1.5px solid #b3c6e6' }}>
                                <h3 style={{ color: '#1a237e', marginBottom: 8 }}>Historias</h3>
                                <p style={{ color: '#2d3a4a' }}>Descubre y lee historias creadas por los usuarios de la comunidad escolar.</p>
                            </div>
                            <div className="block" style={{ background: 'linear-gradient(135deg,#fffbe3 60%,#f9fafc 100%)', border: '1.5px solid #e6dcb3' }}>
                                <h3 style={{ color: '#b28900', marginBottom: 8 }}>Noticias</h3>
                                <p style={{ color: '#4a3a2d' }}>Infórmate de las novedades, eventos y noticias relevantes de tu centro y otros.</p>
                            </div>
                            <div className="block" style={{ background: 'linear-gradient(135deg,#ffe3e3 60%,#f9fafc 100%)', border: '1.5px solid #e6b3b3' }}>
                                <h3 style={{ color: '#b21a1a', marginBottom: 8 }}>Concursos</h3>
                                <p style={{ color: '#4a2d2d' }}>Participa en concursos de escritura, creatividad y retos escolares para ganar trofeos.</p>
                            </div>
                            <div className="block" style={{ background: 'linear-gradient(135deg,#e3ffe3 60%,#f9fafc 100%)', border: '1.5px solid #b3e6b3' }}>
                                <h3 style={{ color: '#1ab21a', marginBottom: 8 }}>Estadísticas</h3>
                                <p style={{ color: '#2d4a2d' }}>Consulta estadísticas de participación, historias publicadas y logros de la comunidad.</p>
                            </div>
                            <div className="block" style={{ background: 'linear-gradient(135deg,#e3e3ff 60%,#f9fafc 100%)', border: '1.5px solid #b3b3e6' }}>
                                <h3 style={{ color: '#1a1ab2', marginBottom: 8 }}>Trofeos</h3>
                                <p style={{ color: '#2d2d4a' }}>Visualiza los trofeos y reconocimientos obtenidos por los usuarios y clases.</p>
                            </div>
                            <div className="block" style={{ background: 'linear-gradient(135deg,#e3f9ff 60%,#f9fafc 100%)', border: '1.5px solid #b3e6e6' }}>
                                <h3 style={{ color: '#1a7eb2', marginBottom: 8 }}>Aprende con Pipo</h3>
                                <p style={{ color: '#2d3a4a' }}>Accede a recursos educativos, juegos y actividades para aprender de forma divertida.</p>
                            </div>
                        </div>
                        <Register />
                    </>
                ) : page === 'register' ? (
                    <Register />
                ) : null}
            </div>
        </div>

    );
}

export default App;
