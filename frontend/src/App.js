import React, { useState, useEffect } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState('');
  const [durations, setDurations] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const handleAddTask = () => {
    if (currentTask.trim() !== '') {
      setTasks([...tasks, currentTask]);
      setCurrentTask('');
      setDurations([...durations, '']);
      setSchedules([...schedules, '']);
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);

    const updatedDurations = [...durations];
    updatedDurations.splice(index, 1);
    setDurations(updatedDurations);

    const updatedSchedules = [...schedules];
    updatedSchedules.splice(index, 1);
    setSchedules(updatedSchedules);
  };

  const handleDurationChange = (index, value) => {
    const updatedDurations = [...durations];
    updatedDurations[index] = value;
    setDurations(updatedDurations);
  };

  const handleScheduleChange = (index, value) => {
    const updatedSchedules = [...schedules];
    updatedSchedules[index] = value;
    setSchedules(updatedSchedules);
  };

  const showNotification = (task) => {
    // Check if the browser supports notifications
    if ('Notification' in window && Notification.permission === 'granted') {
      // Create a notification
      new Notification(`It's time for ${task}!`);
    }
  };
  useEffect(() => {
    // Request permission for notifications
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    // Set reminders for each task
    tasks.forEach((task, index) => {
      const trimmedTask = task.trim();
      if (trimmedTask !== '') {
        const taskParts = trimmedTask.split(':');
        if (taskParts.length === 2) {
          const [taskName, taskTime] = taskParts;
          const timeParts = taskTime.split('.');
          if (timeParts.length === 2) {
            const [hour, minute] = timeParts;

            const now = new Date();
            const taskDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);

            if (taskDate > now) {
              const timeDifference = taskDate.getTime() - now.getTime();
              setTimeout(() => showNotification(taskName), timeDifference);
            }
          }
        }
      }
    });
  }, [tasks]);


  return (
    <div>
      <h1>Time Management App</h1>
      <div>
        <input
          type="text"
          value={currentTask}
          onChange={(e) => setCurrentTask(e.target.value)}
          placeholder="Enter a task..."
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span>{task}</span>
            <input
              type="text"
              value={durations[index]}
              onChange={(e) => handleDurationChange(index, e.target.value)}
              placeholder="Duration"
            />
            <input
              type="text"
              value={schedules[index]}
              onChange={(e) => handleScheduleChange(index, e.target.value)}
              placeholder="Schedule"
            />
            <button onClick={() => handleDeleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
