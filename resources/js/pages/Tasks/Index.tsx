import { useForm, router } from '@inertiajs/react';
import { SyntheticEvent } from 'react';

interface Task {
    id: number;
    title: string;
    completed: boolean;
}

interface Props {
    tasks: Task[];
}

export default function Index({ tasks }: Props) {
    const { data, setData, post, processing, reset } = useForm({
        title: '',
    });

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        post('/tasks', { onSuccess: () => reset() });
    }

    return (
        <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 20px' }}>
            <h1>My Tasks</h1>

            <form onSubmit={handleSubmit}>
                <input
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    placeholder="Add a new task..."
                    style={{ width: '70%', marginRight: 8, padding: 8 }}
                />
                <button disabled={processing} type="submit">
                    Add
                </button>
            </form>

            <ul style={{ marginTop: 24, listStyle: 'none', padding: 0 }}>
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            marginBottom: 12,
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => router.patch(`/tasks/${task.id}`)}
                        />
                        <span
                            style={{
                                textDecoration: task.completed
                                    ? 'line-through'
                                    : 'none',
                            }}
                        >
                            {task.title}
                        </span>
                        <button
                            onClick={() => router.delete(`/tasks/${task.id}`)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
