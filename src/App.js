import React, { useEffect } from "react";
import TodoList from "./Todo/TodoList";
import Context from "./context";
// import AddTodo from "./Todo/AddTodo";
import Loader from "./Loader";
import Modal from "./Modal/Modal";

const AddTodo = React.lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(import("./Todo/AddTodo"));
      }, 3000); // Показываем надпись Loading ... , "ленивая" загрузка, вообще на продакшене лучше не использовать, только для проверки
    })
);

function App() {
  let [todos, setTodos] = React.useState([
    // { id: 1, comleted: false, title: "Купить хлеб" },
    // { id: 2, comleted: false, title: "Купить масло" },
    // { id: 3, comleted: false, title: "Купить молоко" },
  ]);

  const [loading, setLoading] = React.useState(true);

  // Берем с сервера значения для массива todos, исползуем хук  useEffect
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((response) => response.json())
      .then((todos) => {
        setTimeout(() => {
          setTodos(todos);
          setLoading(false);
        }, 2000);
      });
  }, []);

  function toggleTodo(id) {
    setTodos(
      (todos = todos.map((todo) => {
        if (todo.id === id) {
          todo.comleted = !todo.comleted;
        }
        return todo;
      }))
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function addTodo(title) {
    setTodos(
      todos.concat([
        {
          title,
          id: Date.now(),
          completed: false,
        },
      ])
    );
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1>React tutorial</h1>
        <Modal />

        <React.Suspense fallback={<p>Loading ... </p>}>
          <AddTodo onCreate={addTodo} />
        </React.Suspense>

        {loading && <Loader />}
        {todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo} />
        ) : loading ? null : (
          <p>No Todos!</p>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
