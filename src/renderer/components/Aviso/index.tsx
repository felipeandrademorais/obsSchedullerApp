import { CSSProperties } from 'react';

export const Aviso = () => {
  return (
    <div style={styles.container}>
      <p>Você deve informar a URL e Senha do OBS na lista de configurações</p>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    padding: '20px',
    width: '100%',
    backgroundColor: '#ebeba4',
    color: '#333',
    borderRadius: '10px',
  },
};
