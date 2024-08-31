import React, { useState, useEffect, CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from '../../components/TaskList';
import ScheduleService from '../../service/ScheduleService';
import { Task } from '../../types';
import { Aviso } from '../../components/Aviso';
import { obsPassword, obsUrl } from '../../constants';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    loadScheduledTasks();
  }, []);

  const loadScheduledTasks = () => {
    const upcomingTasks = ScheduleService.listUpcomingJobs();
    setTasks(upcomingTasks);
  };

  return (
    <div style={styles.container}>
      <h1>OBS Task Scheduler</h1>
      {localStorage.getItem(obsUrl) === null ||
        (localStorage.getItem(obsPassword) === null && <Aviso />)}
      <div style={styles.buttonsContainer}>
        <div style={styles.buttonGroup}>
          <button onClick={() => navigate('/start-transmission')}>
            Iniciar Transmissão
          </button>
          <button onClick={() => navigate('/switch-scene')}>
            Trocar de Cena
          </button>
          <button onClick={() => navigate('/end-transmission')}>
            Encerrar Transmissão
          </button>
          <button
            className="config"
            style={{ marginTop: '30px' }}
            onClick={() => navigate('/settings')}
          >
            Configurações
          </button>
        </div>
        <TaskList tasks={tasks} />
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    maxWidth: '950px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  buttonsContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    gap: '13px',
    margin: '20px',
    height: '100%',
  },
};

export default Home;
