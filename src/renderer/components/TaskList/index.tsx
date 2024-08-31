import React, { CSSProperties } from 'react';
import { Task } from '../../types';

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.taskHeader}>Tarefas Agendadas</h2>
      {tasks.map((task) => (
        <div key={task.id} style={styles.taskItem}>
          <p style={styles.taskName}>{task.name}</p>
          <p>Tipo: {task.type}</p>
          <p>Horário: {new Date(task.scheduledTime).toLocaleTimeString()}</p>
        </div>
      ))}
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #ccc',
    borderRadius: '15px',
    padding: '0 20px',
    backgroundColor: '#f9f9f9',
    color: '#333',
    gap: '20px',
    margin: '20px',
    maxWidth: '600px',
    height: '100%',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  taskItem: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: 'white',
  },
  taskHeader: {
    textAlign: 'center',
  },
  taskName: {
    fontWeight: 'bold',
  },
};

export default TaskList;
