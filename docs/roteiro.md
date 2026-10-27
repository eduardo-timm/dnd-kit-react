# Roteiro da apresentação

Duração sugerida: 5 a 7 minutos. Deixe o projeto aberto no navegador e o código aberto no editor.

## 1. Apresentação do tema

“Nosso trabalho é sobre gerenciamento de listas com drag and drop usando dnd-kit e React. Drag and drop significa arrastar e soltar. Criamos um quadro simples para demonstrar como mudar a ordem e a lista de uma tarefa.”

## 2. Para que serve o pacote

“O dnd-kit oferece recursos para criar elementos arrastáveis e áreas que recebem esses elementos. Ele pode ser usado em quadros de tarefas, listas de prioridades e outras interfaces que precisam reorganizar itens.”

“O pacote cuida da interação, enquanto o React mantém os dados e atualiza a tela.”

## 3. Demonstração da página

1. Mostre as três listas e as seis tarefas iniciais.
2. Digite **Apresentar o projeto** e clique em **Adicionar**.
3. Mova **Preparar os slides** para o primeiro lugar em **A fazer**.
4. Mova a mesma tarefa para **Em andamento**.
5. Mova a única tarefa de **Concluído** para outra lista e depois de volta. Explique que uma lista vazia também precisa ser um destino válido.
6. Arraste outro cartão e pressione **Esc**. Mostre que ele volta à posição anterior.
7. Se houver tempo, demonstre o teclado: Tab até os pontinhos, Espaço, seta e Espaço.

## 4. Explicação do código

Abra os arquivos nesta ordem:

**`src/lib/board.js`**

“Temos um objeto com os arrays `todo`, `doing` e `done`. Cada cartão possui um identificador e um título. A ordem dos elementos no array é a ordem mostrada na tela.”

**`src/components/TaskCard.jsx`**

“O hook `useSortable` recebe o identificador, a posição e a lista do cartão. Ligamos `ref` ao cartão e `handleRef` ao botão com os pontinhos. A configuração `clone` mantém uma cópia visual enquanto o React move o cartão original.”

**`src/components/BoardColumn.jsx`**

“O hook `useDroppable` transforma a lista em um destino. Ele fica na lista inteira para que possamos soltar tarefas mesmo quando ela está vazia.”

**`src/App.jsx`**

“O `DragDropProvider` envolve as listas. No início do arraste, guardamos o estado atual. Durante o arraste, `move()` calcula a nova distribuição dos cartões e `setTasks` atualiza a tela. Se o usuário cancelar, recuperamos o estado anterior.”

## 5. Encerramento

“Com esse exemplo, mostramos a organização de tarefas em listas usando o dnd-kit. Para manter a demonstração simples, os dados ficam na memória e reiniciam quando recarregamos a página. Em um projeto maior, poderíamos salvar essa ordem em um banco de dados.”

## Perguntas que podem aparecer

**O dnd-kit salva as tarefas?** Não. O estado e a persistência são responsabilidades da aplicação.

**Por que cada cartão precisa de um id?** Para identificar o mesmo cartão mesmo depois de mudar sua posição ou lista.

**O que acontece ao pressionar Esc?** A aplicação restaura o estado guardado antes do arraste.

**Por que existe `useDroppable` na lista?** Para aceitar cartões inclusive quando não há outro cartão servindo de destino.
