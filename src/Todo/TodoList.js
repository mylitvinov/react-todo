import React from "react";
// import PropTypes from "prop-types";
import TodoItem from "./TodoItem";

// создаем стили для ul и кладем в константу
const styles = {
  ul: {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
};

/* функция TodoList( возвращает jsx код, компонента. 
props - входящие параметры, объект. В данном случае todos атрибут со 
значением {todos} заданным в файле App.js. 
*/
function TodoList(props) {
  return (
    <ul style={styles.ul}>
      {props.todos.map((todo, index) => {
        return (
          <TodoItem
            todo={todo}
            key={todo.id}
            index={index}
            onChange={props.onToggle}
          />
        );
      })}
    </ul>
  );
}

// Библиотека PropTypes, объект. Задаем валидацию для входящих параметров.
// TodoList.PropTypes = {
//   todos: PropTypes.arrayOf(PropTypes.object).isRequired
// }

export default TodoList;
