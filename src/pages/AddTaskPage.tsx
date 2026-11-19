import { IonHeader, IonTitle, IonToolbar,IonPage,IonContent, IonCardHeader, IonCardContent,IonCardTitle, IonCard, IonBadge, IonItem
    , IonInput, IonTextarea, IonSelect,IonSelectOption,IonButton,IonText
} from "@ionic/react"

import { useState} from 'react'
import {Task} from '../data/Tasks'

import {useNavigate} from 'react-router-dom'

interface AddTaskPageProps {
    addTask: (task: Task) => void;
}

interface TaskForm {
    title: string;
    description: string;
    category: string;
    priority: string;
    done: boolean;
}

const initialForm: TaskForm = {
    title: '',
    description: '',
    category:'',
    priority:'Mitjana',
    done: false
}
function AddTaskPage({ addTask }: AddTaskPageProps) {

    const navigate =useNavigate();

    const [form, setForm]= useState<TaskForm>(initialForm);

    const [errors, setErrors] = useState({
        title:'',
        description:'',
        category:''
    });

    const handleChange = (
        field: keyof TaskForm,
        value: string
    ) => {
        setForm(prev => ({
            ...prev,
            [field]: value
        }));

        if (field in errors) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors = {
            title: '',
            description: '',
            category: ''
        };

        if (form.title.trim() === '') {
            newErrors.title = 'El títol és obligatori';
        } else if ( form.title.trim().length < 3 ){
            newErrors.title = 'Mínim 3 caracters';
        }

        if (form.description.trim() === ''){
            newErrors.description = 'La descripció és obligatoria';
        }

        if(form.category==='') {
            newErrors.category = 'Selecciona una categoria '
        }

        setErrors (newErrors);

        return Object.values(newErrors).every(
            error =>error === ''
        );
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const newTask: Task = {
            id: Date.now(),
            title: form.title.trim(),
            description: form.description.trim(),
            category:form.category,
            priority:form.priority,
            done: form.done,
            startTime: null,
            endTime:null,
            duration: 0
        };

        addTask(newTask);
        console.log('Nova tasca creada', newTask);

        setForm({...initialForm})

        setErrors ({
            title:'',
            description:'',
            category: ''
        });

        navigate ('/tasks')
    }

    const handleReset = () => {
        setForm({...initialForm}),
        setErrors ({
            title:'',
            description:'',
            category:''
        });
    };
 return(
        <IonPage className="add-task-page">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Afegir Tasca
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className = 'ion-padding'>
                <IonCard className="task-form-card">
                    <IonCardHeader>
                        <IonCardTitle>
                            Nova Tasca 
                        </IonCardTitle>
                    </IonCardHeader>
                <IonCardContent>
                    <form onSubmit={handleSubmit} noValidate>
                        <IonItem>
                            <IonInput
                             label= "title" 
                             labelPlacement="stacked"
                              placeholder = " Ex: Preparar examen"
                               value= {form.title} 
                               onIonInput={(e) => handleChange(
                                'title', 
                                e.detail.value ?? ''
                               )}
                            />
                        </IonItem>
                        {errors .title && (
                            <IonText color="danger">
                                <p> {errors.title}</p>
                            </IonText>
                        )}


                        <IonItem>
                            <IonTextarea
                                label="Descripció"
                                labelPlacement="stacked"
                                placeholder="Ex: Preparar els apunts del tema"
                                value={form.description}
                                autoGrow
                                onIonInput={(e) =>
                                    handleChange(
                                        'description',
                                        e.detail.value ?? ''
                                    )
                                }
                            />
                        </IonItem>
                        {errors .description && (
                            <IonText color="danger">
                                <p> {errors.description}</p>
                            </IonText>
                        )}

                        <IonItem>
                            <IonSelect
                                label="Categoria"
                                labelPlacement="stacked"
                                placeholder="Selecciona una categoria"
                                value={form.category}
                                onIonChange={(e) =>
                                    handleChange('category', e.detail.value ?? '')
                                }
                            >
                                <IonSelectOption value="Estudis">Estudis</IonSelectOption>
                                <IonSelectOption value="Feina">Feina</IonSelectOption>
                                <IonSelectOption value="Personal">Personal</IonSelectOption>
                            </IonSelect>
                        
                        </IonItem>

                        {errors .category && (
                            <IonText color="danger">
                                <p> {errors.category}</p>
                            </IonText>
                        )}

                        <IonItem>
                            <IonSelect
                                label="Prioritat"
                                labelPlacement="stacked"
                                value={form.priority}
                                onIonChange={(e) =>
                                    handleChange('priority', e.detail.value ?? '')
                                }
                            >
                                <IonSelectOption value="Baixa">Baixa</IonSelectOption>
                                <IonSelectOption value="Mitjana">Mitjana</IonSelectOption>
                                <IonSelectOption value="Alta">Alta</IonSelectOption>
                            </IonSelect>
                        </IonItem>

                        <div className="form-actions">
                            <IonButton type="submit">
                                Guardar Tasca
                            </IonButton>
                            <IonButton
                                type="button"
                                fill="outline"
                                color="medium"
                                onClick={handleReset}
                            >
                                Netejar
                            </IonButton>
                        </div>

                    </form>
                </IonCardContent>
                </IonCard>
            </IonContent>
            

        </IonPage>
    )
}

export default AddTaskPage;
