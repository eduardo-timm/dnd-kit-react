# Gerenciamento de listas com dnd-kit e React

Trabalho 9: um exemplo simples de **drag and drop** (arrastar e soltar).

A aplicação tem uma única página com as listas **A fazer**, **Em andamento** e **Concluído**. É possível adicionar tarefas, mudar a ordem dos cartões e mover cartões entre listas, inclusive para uma lista vazia.

## Como executar

Instale o [Node.js](https://nodejs.org/) 22.12 ou superior (recomendado: Node 24). Na pasta do projeto, execute:

```bash
npm install
npm run dev
```

Abra o endereço exibido pelo Vite, normalmente `http://127.0.0.1:5173`.

No PowerShell, se a execução de `npm.ps1` estiver bloqueada, use `npm.cmd install` e `npm.cmd run dev`.

## Como demonstrar

1. Adicione uma tarefa pelo campo **Nova tarefa**.
2. Arraste um cartão pelos pontinhos para mudar sua posição.
3. Arraste um cartão de **A fazer** para **Em andamento**.
4. Esvazie uma lista e mova um cartão de volta para ela.
5. Inicie um arraste e pressione **Esc** para mostrar o cancelamento.
6. Use **Reiniciar exemplo** para voltar às seis tarefas originais.

Também é possível usar o teclado: **Tab** até a alça, **Espaço** para iniciar, **setas** para mover e **Espaço** para soltar.

## Código para explicar em aula

| Arquivo | Responsabilidade |
| --- | --- |
| `src/App.jsx` | Página principal, formulário, estado das listas e eventos do arraste. |
| `src/components/BoardColumn.jsx` | Lista que recebe cartões com `useDroppable`. |
| `src/components/TaskCard.jsx` | Cartão arrastável com `useSortable`. |
| `src/lib/board.js` | Tarefas iniciais e função para adicionar uma tarefa. |
| `src/styles.css` | Estilo da página. |

### O estado das listas

O estado é um objeto com um array para cada lista:

```js
{
  todo: [{ id: 'task-1', title: 'Pesquisar sobre o dnd-kit' }],
  doing: [],
  done: []
}
```

Cada cartão tem um `id` único. O `index` indica sua posição e o `group` informa sua lista. Não usamos o índice como identificador, pois a posição muda durante o arraste.

### O fluxo do arraste

- `DragDropProvider` coordena as interações da área do quadro.
- `onDragStart` guarda o estado anterior em uma referência (`useRef`).
- `onDragOver` usa `move()` para calcular a nova ordem e `setTasks` para atualizar o estado.
- `onDragEnd` mantém a mudança ou restaura o estado anterior se a operação foi cancelada ou terminou fora de um destino.

O `event.preventDefault()` em `onDragOver` desativa a reordenação automática do DOM naquele evento, deixando o React controlar os cartões. `Feedback` com `feedback: 'clone'` cria a cópia visual durante o arraste. Essas configurações evitam conflito ao mover o cartão entre componentes de listas diferentes.

As listas usam prioridade de colisão baixa. Assim, um cartão recebe preferência como destino quando o ponteiro está sobre ele, e a área da lista continua aceitando cartões quando está vazia.

## Pacotes utilizados

- **React / React DOM:** componentes e atualização da interface.
- **@dnd-kit/react 0.5.1:** `DragDropProvider`, `useDroppable` e `useSortable`.
- **@dnd-kit/helpers 0.5.1:** função `move()`.
- **@dnd-kit/dom 0.5.1:** feedback visual do arraste.
- **@dnd-kit/abstract 0.5.1:** prioridade de colisão.
- **Vite:** servidor de desenvolvimento e build.

O projeto usa a API atual de `@dnd-kit/react`. Exemplos antigos com `DndContext` e `SortableContext` usam a API legada e têm imports diferentes.

## Material do trabalho

- `docs/apresentacao-dnd-kit.pptx`: apresentação curta, editável, com oito slides.
- `docs/roteiro.md`: roteiro da fala e da demonstração.

## Limites do exemplo

Os dados ficam apenas no estado do React. Recarregar a página reinicia o exemplo. O aplicativo demonstra o pacote no front-end e dispensa servidor, banco de dados e login. A persistência em uma API pode ser uma extensão futura.

## Verificação

```bash
npm test
npm run build
```

## Referências

- [Introdução ao dnd-kit para React](https://dndkit.com/react/quickstart/)
- [Listas ordenáveis múltiplas](https://dndkit.com/react/guides/multiple-sortable-lists/)
- [useSortable](https://dndkit.com/react/hooks/use-sortable/)
- [Conceitos de ordenação e controle de estado](https://dndkit.com/concepts/sortable/)

Consulta da documentação e das versões: 26/10/2026.
