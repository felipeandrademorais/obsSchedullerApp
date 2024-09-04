import React, { CSSProperties, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obsPassword, obsIp, obsPort } from '../../constants';
import OBSService from '../../service/OBSService';
import { Aviso } from '../../components/Aviso';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const Settings: React.FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [aviso, setAviso] = useState<string | null>(null);
  const [ip, setIp] = useState<string>(localStorage.getItem(obsIp) ?? '');
  const [port, setPort] = useState<string>(localStorage.getItem(obsPort) ?? '');
  const [password, setPassword] = useState<string>(
    localStorage.getItem(obsPassword) ?? '',
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);

    event.preventDefault();
    localStorage.setItem(obsIp, ip);
    localStorage.setItem(obsPort, port);
    localStorage.setItem(obsPassword, password);

    await OBSService.connect()
      .then((response) => {
        if (response instanceof Error) {
          setAviso(
            'Houve um erro ao conectar ao OBS. Verifique se as informações estão corretas.',
          );
        } else {
          alert('Conectado com sucesso!');
          navigate('/');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div style={styles.formContainer}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1>Configurações</h1>
        <label style={styles.label} htmlFor="ip">
          OBS IP:
          <input
            id="ip"
            type="text"
            placeholder="ex: 192.168.68.117"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            style={styles.input}
          />
        </label>
        <label style={styles.label} htmlFor="porta">
          OBS PORTA:
          <input
            id="porta"
            type="text"
            placeholder="ex: 4455"
            value={port}
            onChange={(e) => setPort(e.target.value)}
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
            {loading ? <LoadingSpinner /> : 'Conectar'}
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
      <div style={{ marginTop: '2rem' }}>
        {aviso && <Aviso message={aviso} />}
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    position: 'relative',
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
