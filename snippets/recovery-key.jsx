import { useState } from 'react';

export const RecoveryKey = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ loading: false, message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) return;

    setStatus({ loading: true, message: '' });
    setEmail(''); // Clean input

    try {
      await fetch('http://intranet.agroop.net/external-api/access/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch (err) {}
  };

  return (
    <div className="max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu e-mail"
          className="w-full border px-3 py-2 rounded-lg"
          required
        />

        <button
          type="submit"
          disabled={status.loading}
          className="
          bg-[var(--primary-color)]
          px-text-sm font-medium text-white dark:!text-zinc-950 bg-zinc-900 hover:bg-zinc-700 dark:bg-zinc-100 hover:dark:bg-zinc-300 rounded-full px-3.5 py-1.5 not-prose4
          py-2
          rounded-lg
          font-medium
          transition-all
          duration-200
          hover:opacity-90
          hover:-translate-y-[1px]
          disabled:opacity-50
          inline-block
        ">
          {status.loading ? 'Enviando...' : 'Enviar'}
        </button>

        {status.message && <p className="mt-3 text-sm text-green-500">{status.message}</p>}
      </form>
    </div>
  );
};
