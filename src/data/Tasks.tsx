

export interface Task {
    id: number;
    title: string;
    description: string;
    category: string;
    priority: string;
    done: boolean;


    startTime: string | null;
    endTime: string | null;
    duration: number;

}

export const initialTasks: Task[]=[
    {
        id:1,
        title: "Preparar classe Ionic",
        description: "Preparar exemples",
        category: "UVIC",
        priority: "Alta",
        done: false,
        startTime: null,
        endTime: null,
        duration: 0
    },


    {
        id:2,
        title: "Revisar practiques",
        description: "Corregir les entregues",
        category: "Feina",
        priority: "Mitjana",
        done: false,
        startTime: null,
        endTime: null,
        duration: 0
    }
]