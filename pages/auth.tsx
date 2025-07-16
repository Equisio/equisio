import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleAuth = async () => {
    setError('');
    const { error } = isRegister
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) return setError(error.message);
    router.push('/my_account');
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">{isRegister ? 'Create Account' : 'Login'}</h1>

      <input
        type="email"
        placeholder="Email"
        className="w-full mb-2 p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full mb-4 p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleAuth}
        className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 rounded text-white font-bold"
      >
        {isRegister ? 'Sign Up' : 'Login'}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <p className="mt-4 text-center text-sm">
        {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button onClick={() => setIsRegister(!isRegister)} className="text-blue-500 underline">
          {isRegister ? 'Login' : 'Sign up'}
        </button>
      </p>
    </div>
  );
}
