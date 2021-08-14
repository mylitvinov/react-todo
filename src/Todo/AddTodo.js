import React, { useState } from "react";

function useInputValue(defaultValue = "") {
  const [value, setValue] = useState(defaultValue);

  return {
    binder: {
      value,
      onChange: (event) => setValue(event.target.value),
    },
    clear: () => setValue(""),
    value: () => value,
  };
}

function AddTodo({ onCreate }) {
  const input = useInputValue("");
  function submitHandler(event) {
    event.preventDefault();

    if (input.value().trim()) {
      onCreate(input.value());
      input.clear();
      // setValue("");
    }
  }

  return (
    <form style={{ marginBottom: "1rem" }} onSubmit={submitHandler}>
      <input {...input.binder} />
      <button type="submit"> Add todo</button>
    </form>
  );
}

export default AddTodo;
