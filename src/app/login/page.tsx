'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import PasswordInput from '@/components/input/PasswordInput';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/dashboard');
      } else {
        setError(data.message || 'Erro ao fazer login');
      }
    } catch {
      setError('Erro na requisição');
    }
  };

  const handleGoogleLogin = () => {
    router.push('/auth/google');
  };

  const handleMicrosoftLogin = () => {
    router.push('/auth/microsoft');
  };

  return (
    <div className="w-full max-w-sm space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Faça login na sua conta
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Insira seus dados abaixo para continuar
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* E-mail */}
        <div>
          <label htmlFor="email" className="sr-only">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Seu e-mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 
              placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500
              dark:border-gray-700 dark:bg-black dark:text-gray-100 dark:placeholder-gray-500"
          />
        </div>

        {/* Senha com PasswordInput controlado */}
   
          <label htmlFor="password" className="sr-only">
            Senha
          </label>
          <PasswordInput
            id="password"
            name="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            controlled
          />


        {/* Esqueci senha */}
        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-sm text-stone-600 hover:underline dark:text-stone-400"
          >
            Esqueci minha senha
          </Link>
        </div>

        {/* Botão Entrar */}
        <button
          type="submit"
          className="w-full rounded-md bg-stone-700 px-4 py-2 text-sm font-medium text-white 
            hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2
            dark:focus:ring-offset-black"
        >
          Entrar
        </button>
      </form>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* OU CONTINUE COM */}
      <div className="relative my-4 flex items-center">
        <div className="grow border-t border-gray-300 dark:border-gray-700" />
        <span className="mx-2 flex-shrink text-sm text-gray-400">OU CONTINUE COM</span>
        <div className="grow border-t border-gray-300 dark:border-gray-700" />
      </div>

      {/* Botões OAuth */}
      <div className="flex flex-col space-y-2">
        <button
          onClick={handleGoogleLogin}
          className="inline-flex w-full items-center justify-center rounded-md border 
            border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm 
            hover:bg-gray-50 focus:outline-none dark:border-gray-700 dark:bg-black dark:text-gray-100 
            dark:hover:bg-gray-800"
        >
          Continuar com Google
        </button>
        <button
          onClick={handleMicrosoftLogin}
          className="inline-flex w-full items-center justify-center rounded-md border 
            border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm 
            hover:bg-gray-50 focus:outline-none dark:border-gray-700 dark:bg-black dark:text-gray-100 
            dark:hover:bg-gray-800"
        >
          Continuar com Microsoft
        </button>
      </div>

      {/* Termos e Privacidade */}
      <p className="px-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Ao continuar, você concorda com nossos{' '}
        <Link href="/terms" className="underline">
          Termos de Serviço
        </Link>{' '}
        e nossa{' '}
        <Link href="/privacy" className="underline">
          Política de Privacidade
        </Link>
        .
      </p>

      {/* Link para cadastro */}
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Não possui conta?{' '}
        <Link
          href="/signup"
          className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:underline"
        >
          Criar conta
        </Link>
      </p>
    </div>
  );
}
