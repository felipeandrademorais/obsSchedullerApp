import React, { useState, useEffect, CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from '../../components/TaskList';
import scheduleService from '../../service/ScheduleService';
import { Task } from '../../types';
import { Aviso } from '../../components/Aviso';
import { obsPassword, obsIp } from '../../constants';
import { pubsub } from '../../service/PubSub';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const updateTasks = () => setTasks(scheduleService.listUpcomingJobs());

    pubsub.subscribe('jobScheduled', updateTasks);
    pubsub.subscribe('jobCompleted', updateTasks);
    pubsub.subscribe('jobCancelled', updateTasks);

    updateTasks();

    return () => {
      pubsub.unsubscribe('jobScheduled', updateTasks);
      pubsub.unsubscribe('jobCompleted', updateTasks);
      pubsub.unsubscribe('jobCancelled', updateTasks);
    };
  }, []);

  return (
    <div style={styles.container}>
      <h1>OBS Task Scheduler</h1>
      {localStorage.getItem(obsIp) === null ||
        (localStorage.getItem(obsPassword) === null && (
          <Aviso message={null} />
        ))}
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
        <TaskList tasks={tasks} onDelete={scheduleService.deleteSchedule} />
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    maxWidth: '1024px',
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
    width: '100%',
    height: '100%',
  },
};

export default Home;
