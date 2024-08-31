import React, { useState, useEffect, CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import OBSService from '../../service/OBSService';
import ScheduleService from '../../service/ScheduleService';

export const SwitchScene = () => {
  const [selectedScene, setSelectedScene] = useState<string>('');
  const [scenes, setScenes] = useState<any[]>([]);
  const [time, setTime] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchScenes();
  }, []);

  const fetchScenes = async () => {
    setIsLoading(true);
    try {
      const availableScenes = await OBSService.getScenes();
      console.log('availableScenes: ', availableScenes);
      setScenes(availableScenes);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch scenes:', error);
      setIsLoading(false);
    }
  };

  const scheduleTime = new Date();
  const [hours, minutes] = time.split(':').map(Number);
  scheduleTime.setHours(hours, minutes, 0, 0);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    ScheduleService.createSchedule(selectedScene, {
      date: scheduleTime,
      task: () => OBSService.switchScene(selectedScene),
      type: 'Trocar de Cena',
    });
    alert('Troca de cena agendada com sucesso!');
    navigate('/');
  };

  return (
    <div style={styles.formContainer}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1>Trocar de Cena</h1>
        <label style={styles.label}>
          Selecione a cena desejada:
          <select
            value={selectedScene}
            onChange={(e) => setSelectedScene(e.target.value)}
            style={styles.select}
            disabled={isLoading}
          >
            {scenes.map((scene) => (
              <option key={scene.sceneIndex} value={scene.sceneName}>
                {scene.sceneName}
              </option>
            ))}
          </select>
          {isLoading && <span style={styles.loading}>Loading...</span>}
        </label>
        <label style={styles.label}>
          Hora de troca:
          <input
            type="time"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
            style={styles.input}
          />
        </label>
        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.button}>
            Agendar
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
  select: {
    padding: '8px',
    border: 'none',
    borderRadius: '5px',
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
