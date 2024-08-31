import React, { CSSProperties, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obsPassword, obsUrl } from '../../constants';

export const Settings: React.FC = () => {
  const navigate = useNavigate();

  const [url, setUrl] = useState<string>(localStorage.getItem(obsUrl) ?? '');
  const [password, setPassword] = useState<string>(
    localStorage.getItem(obsPassword) ?? '',
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem(obsUrl, url);
    localStorage.setItem(obsPassword, password);
    alert('Configurações salvas com sucesso!');
  };

  return (
    <div style={styles.formContainer}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1>Configurações</h1>
        <label style={styles.label} htmlFor="url">
          OBS URL:
          <input
            id="url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={styles.input}
          />
        </label>
        <label style={styles.label} htmlFor="password">
          OBS Senha:
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </label>
        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.button}>
            Salvar
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            style={styles.button}
          >
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '250px',
    gap: '13px',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  input: {
    padding: '8px',
    border: 'none',
    borderRadius: '5px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    cursor: 'pointer',
    backgroundColor: '#f06292',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
  },
};
