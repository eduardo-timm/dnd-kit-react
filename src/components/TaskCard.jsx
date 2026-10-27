import { Feedback } from '@dnd-kit/dom';
import { useSortable } from '@dnd-kit/react/sortable';

export function TaskCard({ task, index, column }) {
  const { ref, handleRef, isDragging } = useSortable({
    id: task.id,       // Identificador único do cartão.
    index,             // Posição do cartão na lista.
    group: column,     // Lista à qual o cartão pertence.
    type: 'task',
    accept: 'task',
    // A cópia visual permite que o React mova o cartão original entre as listas.
    plugins: (defaults) => [...defaults, Feedback.configure({ feedback: 'clone' })],
  });

  return (
    <article ref={ref} className={`task ${isDragging ? 'dragging' : ''}`}>
      <span>{task.title}</span>
      <button type="button" ref={handleRef} className="drag-handle"
        aria-label={`Arrastar tarefa: ${task.title}`} title="Arrastar tarefa">⠿</button>
    </article>
  );
}
