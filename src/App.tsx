import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Navigate, Route } from 'react-router-dom';

import Home from './pages/Home';
import AddTaskPage from './pages/AddTaskPage';
import SummaryPage from './pages/SummaryPage';

import {
  addCircleOutline,
  listOutline,
  star,
  statsChartOutline,
} from 'ionicons/icons';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import TaskPage from './pages/TaskPage';
import { useEffect, useState } from 'react';

import {Task,initialTasks} from './data/Tasks'

import './app.css'



setupIonicReact();

function App () {
  const [tasks, setTasks] = useState<Task[]>(() => {

    const saved = localStorage.getItem('TaskFlow-stats');

    if (saved) {
      try{
        return JSON.parse(saved) as Task[];
      } catch{
        return initialTasks;
      }
    }
    return initialTasks;
  });

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const startTimer = (id: number) =>{
    const anyRunning = tasks.some(
      task => task.startTime !==null && task.endTime === null
    );

    if (anyRunning) return;

    const start = new Date().toISOString();

    setTasks(prev => 
      prev.map(task => 
        task.id === id && !task.done ?{
          ...task,
          startTime: start,
          endTime: null
        }
        : task
      )
    );
  };

  const stopTimer = (id: number) => {
    const end = new Date();

    setTasks((prev) =>
      prev.map((task) => {
        if (
          task.id !== id ||
          task.startTime === null ||
          task.endTime !== null
        ) {
          return task;
        }

        const startMs = new Date(task.startTime).getTime();

        const elapsed = Math.max(
          0,
          Math.floor((end.getTime() - startMs) / 1000)
        );

        return {
          ...task,
          endTime: end.toISOString(),
          duration: task.duration + elapsed
        };
      })
    );
  };


  const toggleTask = (id:number) => {
    setTasks(prev => prev.map(task => task.id === id ? {...task, done: !task.done} : task))
  }

  const addTask= (newTask: Task) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  }
  return(
    <IonApp className="taskflow-app">
      <IonReactRouter>

        <IonTabs>

          <IonRouterOutlet>
            <Route path="/tasks"  element={ <TaskPage 
                                              tasks={tasks}  
                                              toggleTask={toggleTask}
                                              startTimer={startTimer}
                                              stopTimer={stopTimer}
                                              now={now}
                                               /> }/>
            <Route path="/add" element={<AddTaskPage 
                addTask={addTask}
            />} />
            <Route path="/summary" element={<SummaryPage />} />
            <Route path="/" element={<Navigate to="/tasks" />} />
          </IonRouterOutlet>

          <IonTabBar className='ion-tab-bar' slot="bottom">

            <IonTabButton tab="tasks" href="/tasks">
              <IonIcon icon={listOutline} />
              <IonLabel>Tasques</IonLabel>
            </IonTabButton>

            <IonTabButton tab="add" href="/add">
              <IonIcon icon={addCircleOutline} />
              <IonLabel>Afegir</IonLabel>
            </IonTabButton>

            <IonTabButton tab="summary" href="/summary">
              <IonIcon icon={statsChartOutline} />
              <IonLabel>Resum</IonLabel>
            </IonTabButton>

          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )

};

export default App;
