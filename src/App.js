
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
                <img src={logoPipo} alt="Logo StoryUp" style={{ height: 44, marginLeft: 18, marginRight: 18 }} />
                <HeaderExtras />
            </header>
            import logoPipo from '../public/logo-pipo.webp';
            {/* Sidebar horizontal (excepto en login/registro) */}
            {page !== 'register' && (
                <nav className="sidebar">
                    <a href="#" style={{ margin: '0 16px' }} onClick={() => setPage('home')}>Historias</a>
                    <a href="#" style={{ margin: '0 16px' }} onClick={() => setPage('create')}>Crea tu Historia</a>
                    <a href="#" style={{ margin: '0 16px' }} onClick={() => setPage('news')}>Noticias</a>
                    <a href="#" style={{ margin: '0 16px' }} onClick={() => setPage('contests')}>Concursos</a>
                    <a href="#" style={{ margin: '0 16px' }} onClick={() => setPage('stats')}>Estadísticas</a>
                    <a href="#" style={{ margin: '0 16px' }} onClick={() => setPage('trophies')}>Trofeos</a>
                    <a href="#" style={{ margin: '0 16px' }} onClick={() => setPage('learn')}>Aprende con Pipo</a>
                    <a href="#" style={{ margin: '0 16px' }} onClick={() => setPage('profile')}>Perfil</a>
                    <a href="#" style={{ margin: '0 16px', color: '#1976d2' }} onClick={() => setPage('register')}>Registro</a>
                </nav>
            )}
            {/* Contenido de la página */}
            <div className="page-content">
                {page === 'register' ? (
                    <Register />
                ) : (
                    <div className="block">
                        <h2>Bienvenido a StoryUp</h2>
                        <p>Red social para centros escolares.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
