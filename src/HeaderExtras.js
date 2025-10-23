import React, { useEffect, useState } from 'react';

const idiomas = [
    { code: 'es', label: 'Español' },
    { code: 'en', label: 'Inglés' },
    { code: 'fr', label: 'Francés' },
    { code: 'de', label: 'Alemán' }
];

export default function HeaderExtras() {
    const [usuarios, setUsuarios] = useState(0);
    const [online, setOnline] = useState(0);
    const [fecha, setFecha] = useState(new Date());
    const [idioma, setIdioma] = useState('es');

    // Simulación de usuarios y online (luego se conectará a backend)
    useEffect(() => {
        setUsuarios(42); // Simulado
        setOnline(7);   // Simulado
    }, []);

    // Actualizar reloj cada segundo
    useEffect(() => {
        const timer = setInterval(() => setFecha(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Cambio de idioma (solo visual, sin traducción real aún)
    const handleIdioma = e => setIdioma(e.target.value);

    return (
        <>
            <span style={{ marginLeft: 24, fontWeight: 500 }}>Usuarios inscritos: {usuarios}</span>
            <span style={{ marginLeft: 16, color: '#388e3c' }}>Online: {online}</span>
            <span style={{ margin: '0 auto', fontFamily: 'monospace', fontSize: 16 }}>
                {fecha.toLocaleDateString()} {fecha.toLocaleTimeString()}
            </span>
            <select value={idioma} onChange={handleIdioma} style={{ marginLeft: 'auto', marginRight: 16, padding: 4, borderRadius: 6 }}>
                {idiomas.map(i => <option key={i.code} value={i.code}>{i.label}</option>)}
            </select>
        </>
    );
}
