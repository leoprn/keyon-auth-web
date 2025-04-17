import Image from "next/image";
import Logo from "@/components/Logo";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white">
      <div className="text-center">
        <div className="mb-12">
          <Logo />
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Bienvenido a KeyOn
        </h1>

        <p className="text-lg text-gray-600 mb-10">
          La solución inteligente para el control de accesos.
        </p>
      </div>
    </main>
  );
}
