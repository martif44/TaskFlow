import { IonHeader, IonTitle, IonToolbar,IonPage,IonContent, IonCardHeader, IonCardContent,IonCardTitle, IonCard, IonBadge, IonItem, IonCheckbox
    , IonLabel, IonButton
} from "@ionic/react"
import type {Task} from '../data/Tasks';

interface TaskPageProps{
    tasks: Task[];
    toggleTask: (id:number) => void;
    startTimer: (id:number) => void;
    stopTimer: (id:number) => void;
    now:number;
}


function formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [hours, minutes, secs]
        .map((value) => String(value).padStart(2, '0'))
        .join(':');
}

function formatDate(value: string | null): string {
    if (!value) {
        return '-';
    }
    return new Date(value).toLocaleString('ca-ES');
}


function TaskPage({
    tasks,
    toggleTask,
    startTimer,
    stopTimer,
    now
}: TaskPageProps ){
     
    const filteredTasks = tasks;


    return(
        <IonPage className="tasks-page">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Les meves Tasques
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>

                <p className="task-count">
                    Mostrant {filteredTasks.length} de {tasks.length} tasques

                </p>

                {filteredTasks.map(task => {

                    const running =
                        task.startTime !==null && task.endTime === null;
                    
                    const elapsed = running && task.startTime
                        ? Math.max(
                            0,
                            Math.floor(
                            (now - new Date(task.startTime).getTime()) / 1000
                            )
                        )
                        : 0;

                    const totalSeconds = task.duration + elapsed;



                    return (
                        <IonCard key={task.id} className="task-card">
                            <IonCardHeader>
                                <IonCardTitle> {task.title}</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <p className="task-description">{task.description}</p>
                                <p className="task-badges">
                                    <IonBadge> {task.category}</IonBadge> {' '}
                                    <IonBadge color="medium">
                                        {task.priority}
                                    </IonBadge>
                                </p>

                                <IonItem lines="none" className="task-completion">
                                    <IonCheckbox 
                                        slot="start"
                                        checked={task.done}
                                        disabled={running}
                                        onIonChange={() => toggleTask(task.id)}
                                    >
                                    <IonLabel>Completada</IonLabel>
                                    </IonCheckbox>
                                </IonItem>

                                <div className="task-timer">
                                    <h2>
                                        {formatTime(totalSeconds)}
                                    </h2>
                                    <p> Inici: {formatDate(task.startTime)}</p>
                                    <p> Final: {formatDate(task.endTime)}</p>

                                    {running ? (
                                        <IonButton
                                            color="danger"
                                            expand="block"
                                            onClick={() => stopTimer(task.id)}
                                        >
                                            Aturar Crono
                                        </IonButton>

                                    ): (
                                        <IonButton
                                            expand="block"
                                            disabled={task.done}
                                            onClick={() => startTimer(task.id)}
                                        >
                                            Iniciar Crono
                                        </IonButton>
                                    )}
                                </div>
                            </IonCardContent>
                        </IonCard>                   
                    )
                })}
            </IonContent>
        </IonPage>
    )
}

export default TaskPage
