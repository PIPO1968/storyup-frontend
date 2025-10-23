import React from 'react';
import './App.css';

function App() {
    return (
        <div className="main-container">
            {/* Header fijo */}
            <header className="header">
                {/* Aquí irá el logo, usuarios, reloj, selector de idioma */}
                <span style={{ fontWeight: 'bold', fontSize: 22, marginLeft: 16 }}>StoryUp</span>
            </header>
            {/* Sidebar horizontal (excepto en login/registro) */}
            <nav className="sidebar">
                {/* Aquí irán los links de navegación */}
                <a href="#" style={{ margin: '0 16px' }}>Historias</a>
                <a href="#" style={{ margin: '0 16px' }}>Crea tu Historia</a>
                <a href="#" style={{ margin: '0 16px' }}>Noticias</a>
                <a href="#" style={{ margin: '0 16px' }}>Concursos</a>
                <a href="#" style={{ margin: '0 16px' }}>Estadísticas</a>
                <a href="#" style={{ margin: '0 16px' }}>Trofeos</a>
                <a href="#" style={{ margin: '0 16px' }}>Aprende con Pipo</a>
                <a href="#" style={{ margin: '0 16px' }}>Perfil</a>
            </nav>
            {/* Contenido de la página */}
            <div className="page-content">
                <div className="block">
                    <h2>Bienvenido a StoryUp</h2>
                    <p>Red social para centros escolares.</p>
                </div>
            </div>
        </div>
    );
}

export default App;
