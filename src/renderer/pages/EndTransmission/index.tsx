import React, { useState, CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import ScheduleService from '../../service/ScheduleService';
import OBSService from '../../service/OBSService';

export const EndTransmission = () => {
  const [eventName, setEventName] = useState('');
  const [endTime, setEndTime] = useState('');
  const navigate = useNavigate();

  const scheduleTime = new Date();
  const [hours, minutes] = endTime.split(':').map(Number);
  scheduleTime.setHours(hours, minutes, 0, 0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    ScheduleService.createSchedule(eventName, {
      date: scheduleTime,
      task: () => OBSService.endTransmission(),
      type: 'Encerrar Transmissão',
    });
    alert('Encerramento agendado com sucesso!');
    navigate('/');
  };

  return (
    <div style={styles.formContainer}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1>Encerrar Transmissão</h1>
        <label style={styles.label}>
          Nome do Evento:
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Hora do Encerramento:
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
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
