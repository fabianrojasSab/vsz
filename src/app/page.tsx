"use client";

import { useEffect, useState } from "react";
// Importa un icono de nota musical si lo vas a usar, por ejemplo de 'react-icons'
// import { FaMusic } from 'react-icons/fa'; // Si instalas 'react-icons'

interface Post {
  id: number;
  description: string;
  created_at: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch("https://vistazo.laravel.cloud/api/v1/posts?user[eq]=2")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setPosts(data.data);
        } else {
          console.error("La API no devolvió un array:", data);
          setPosts([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="note note-1">🎵</div>
        <div className="note note-2">🎶</div>
        <div className="note note-3">🎵</div>
        <div className="note note-4">🎶</div>
        <div className="note note-5">♩</div>
        <div className="note note-6">♪</div>
      </div>

      <h1 className="relative z-10 text-4xl font-extrabold mb-8 text-yellow-300 text-center drop-shadow-lg animate-pulse-light">
        Bitácora de Instantes
      </h1>

      {loading && <p className="relative z-10 text-gray-300">Cargando instantes...</p>}
      {error && <p className="relative z-10 text-red-400">Ando trabajando para que leas mis mejores instantes</p>}

      <ul className="relative z-10 w-full max-w-md bg-gray-700 bg-opacity-70 shadow-2xl p-6 rounded-xl border border-gray-600 backdrop-blur-sm">
        {posts.map((post) => (
          <li key={post.id} className="border-b border-gray-600 last:border-none py-3">
            <p className="text-gray-200 text-lg mb-1">{post.description}</p>
            <small className="text-gray-400 text-sm">{post.created_at}</small>
          </li>
        ))}
      </ul>
    </main>
  );
}