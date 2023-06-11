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
      setDurations([...durations, 40]);
      setSchedules([...schedules, 50]);
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
            <span>{task}</span><br></br>
            <span>  Duration: {durations[index]}</span><br></br>
            <span>  Schedule: {schedules[index]}</span>
            <button style={{ marginLeft: 30 }} onClick={() => handleDeleteTask(index)}>Delete</button>
          </li>
        ))}
    </ul>
    </div >
  );
};

export default App;

// import React, { useState, useEffect } from 'react';

// const App = () => {
//   const [tasks, setTasks] = useState([]);
//   const [currentTask, setCurrentTask] = useState('');
//   const [durations, setDurations] = useState([]);
//   const [schedules, setSchedules] = useState([]);

//   fetch('http://localhost:9292/todos')
//     .then(response => {
//       if (!response.ok) { throw response }
//       return response.json()  //we only get here if there is no error
//     })
//     .then(data => setTasks(data))
//     .catch(err => {
//       console.log(err)
//     });

//   const handleAddTask = () => {
//     if (currentTask.trim() !== '') {
//       fetch('http://localhost:9292/todos', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ title: currentTask }),
//       })
//         .then(response => response.json())
//         .then(data => {
//           setTasks([...tasks, data]);
//           setCurrentTask('');
//         }).catch(err => {
//           setTasks([...tasks, currentTask]);
//           setCurrentTask('');
//           setDurations([...durations, '']);
//           setSchedules([...schedules, '']);
//         });
//     }
//   };

//   // const handleAddTask = () => {
//   //   if (currentTask.trim() !== '') {
//   //     setTasks([...tasks, currentTask]);
//   //     setCurrentTask('');
//   //     setDurations([...durations, '']);
//   //     setSchedules([...schedules, '']);
//   //   }
//   // };

//   const handleDeleteTask = (id, index) => {
//     fetch(`http://localhost:9292/todos/${id}`, {
//       method: 'DELETE',
//     })
//       .then(() => {
//         const updatedTasks = tasks.filter(task => task.id !== id);
//         setTasks(updatedTasks);
//       }).catch(err => {
//         const updatedTasks = [...tasks];
//         updatedTasks.splice(index, 1);
//         setTasks(updatedTasks);

//         const updatedDurations = [...durations];
//         updatedDurations.splice(index, 1);
//         setDurations(updatedDurations);

//         const updatedSchedules = [...schedules];
//         updatedSchedules.splice(index, 1);
//         setSchedules(updatedSchedules);
//       });
//   };

//   // const handleDeleteTask = (index) => {
//   //   const updatedTasks = [...tasks];
//   //   updatedTasks.splice(index, 1);
//   //   setTasks(updatedTasks);

//   //   const updatedDurations = [...durations];
//   //   updatedDurations.splice(index, 1);
//   //   setDurations(updatedDurations);

//   //   const updatedSchedules = [...schedules];
//   //   updatedSchedules.splice(index, 1);
//   //   setSchedules(updatedSchedules);
//   // };

//   const handleDurationChange = (index, value) => {
//     const updatedDurations = [...durations];
//     updatedDurations[index] = value;
//     setDurations(updatedDurations);
//   };

//   const handleScheduleChange = (index, value) => {
//     const updatedSchedules = [...schedules];
//     updatedSchedules[index] = value;
//     setSchedules(updatedSchedules);
//   };

//   const showNotification = (task) => {
//     // Check if the browser supports notifications
//     if ('Notification' in window && Notification.permission === 'granted') {
//       // Create a notification
//       new Notification(`It's time for ${task}!`);
//     }
//   };
//   useEffect(() => {
//     // Request permission for notifications
//     if ('Notification' in window && Notification.permission !== 'granted') {
//       Notification.requestPermission();
//     }

//     // Set reminders for each task
//     tasks.forEach((task, index) => {
//       const trimmedTask = task.trim();
//       if (trimmedTask !== '') {
//         const taskParts = trimmedTask.split(':');
//         if (taskParts.length === 2) {
//           const [taskName, taskTime] = taskParts;
//           const timeParts = taskTime.split('.');
//           if (timeParts.length === 2) {
//             const [hour, minute] = timeParts;

//             const now = new Date();
//             const taskDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);

//             if (taskDate > now) {
//               const timeDifference = taskDate.getTime() - now.getTime();
//               setTimeout(() => showNotification(taskName), timeDifference);
//             }
//           }
//         }
//       }
//     });
//   }, [tasks]);

// console.log(tasks)
//   return (
//     <div>
//       <h1>Time Management App</h1>
//       <div>
//         <input
//           type="text"
//           value={currentTask}
//           onChange={(e) => setCurrentTask(e.target.value)}
//           placeholder="Enter a task..."
//         />
//         <button onClick={handleAddTask}>Add Task</button>
//       </div>
//       <ul>
//         {tasks.map((task, index) => (
//           <li key={task.id}>
//             <span>{task}</span>
//             <button onClick={() => handleDeleteTask(task)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default App;
