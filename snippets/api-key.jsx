import React, { useEffect, useState } from 'react';

export default function ApiKey() {
  const [loading, setLoading] = useState(true);
  const [apiKey, setApiKey] = useState(null);
  const [error, setError] = useState(null);

  const token = new URLSearchParams(window.location.search).get('token');

  useEffect(() => {
    if (!token) {
      setError('Token não encontrado.');
      setLoading(false);
      return;
    }

    fetch(`https://intranet.agroop.net/external-api/access?token=${token}`, {
      method: 'POST',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Token inválido ou expirado.');
        return res.json();
      })
      .then((data) => {
        setApiKey(data.apiKey);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [token]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    alert('API Key copiada com sucesso!');
  };

  if (loading) return <p>A validar token...</p>;

  if (error)
    return (
      <div>
        <p style={{ color: 'red' }}>{error}</p>
        <p>
          Clique em <strong>Recuperar chave</strong> e introduza o seu e-mail para gerar novo token.
        </p>
      </div>
    );

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>A sua API Key:</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={apiKey}
          readOnly
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        />
        <button
          onClick={copyToClipboard}
          style={{
            padding: '10px 15px',
            background: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}>
          Copiar
        </button>
      </div>
    </div>
  );
}
