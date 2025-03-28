"use client";

import { useEffect, useState } from "react";

// ✅ Define la interfaz para los datos de la API
interface Post {
  id: number;
  description: string;
  created_at: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]); // ⬅️ Agrega el tipo aquí
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch("https://vistazo.laravel.cloud/api/v1/posts?user[eq]=2")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setPosts(data.data); // ✅ Ahora TypeScript reconoce el tipo
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
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 text-black">
      <h1 className="text-2xl text-black-600 font-bold mb-4  text-center">Aqui solo hay chisme</h1>

      {loading && <p className="text-gray-600">Cargando datos...</p>}
      {error && <p className="text-red-500">Error al cargar los datos</p>}

      <ul className="w-full max-w-md bg-white shadow-lg p-4 rounded-lg">
        {posts.map((post) => (
          <li key={post.id} className="border-b last:border-none py-2">
            <p className="text-gray-600">{post.description}</p>
            <small className="text-gray-500">{post.created_at}</small>
          </li>
        ))}
      </ul>
    </main>
  );
}
