import { test } from 'node:test';
import assert from 'node:assert/strict';
import { addTask, columns, createInitialTasks } from './board.js';

test('o exemplo começa com seis tarefas e IDs únicos nas três listas', () => {
  const lists = createInitialTasks();
  const tasks = Object.values(lists).flat();
  assert.deepEqual(Object.keys(lists), columns.map((column) => column.id));
  assert.equal(tasks.length, 6);
  assert.equal(new Set(tasks.map((task) => task.id)).size, 6);
});

test('adicionar uma tarefa atualiza A fazer sem alterar os dados originais', () => {
  const lists = createInitialTasks();
  const result = addTask(lists, '  Nova tarefa  ', 'task-7');
  assert.equal(lists.todo.length, 3);
  assert.deepEqual(result.todo.at(-1), { id: 'task-7', title: 'Nova tarefa' });
  assert.equal(result.doing, lists.doing);
  assert.equal(addTask(lists, '   ', 'task-8'), lists);
});

test('reiniciar o exemplo cria listas independentes', () => {
  const first = createInitialTasks();
  first.todo.pop();
  assert.equal(createInitialTasks().todo.length, 3);
});
