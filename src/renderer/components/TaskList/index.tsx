import React, { CSSProperties } from 'react';
import { Task } from '../../types';

interface TaskListProps {
  tasks: Task[];
  onDelete: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.taskHeader}>Tarefas Agendadas</h2>
      {tasks.map((task) => (
        <div key={task.id} style={styles.taskItem}>
          <p style={styles.taskName}>{task.name}</p>
          <p>Tipo: {task.type}</p>
          <p>Horário: {new Date(task.scheduledTime).toLocaleTimeString()}</p>
          <button
            onClick={() => onDelete(task.name)}
            style={styles.deleteButton}
          >
            &#x2715;
          </button>
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
    width: '100%',
    maxWidth: '750px',
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
    position: 'relative',
  },
  taskHeader: {
    textAlign: 'center',
  },
  taskName: {
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: '2px',
    margin: 0,
    top: '-10px',
    right: '-10px',
    cursor: 'pointer',
    backgroundColor: '#ff4d4d',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    position: 'absolute',
    fontSize: '10px',
    width: '20px',
    height: '20px',
  },
};

export default TaskList;
