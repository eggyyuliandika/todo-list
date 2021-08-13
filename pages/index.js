import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [todos, setTodos] = useState([]);

  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();

    // Mengcopy isi state todos ke variable newTodos
    const newTodos = [...todos];
    newTodos.push(inputValue);
    setTodos(newTodos);
    setInputValue("");
  };

  const checkTodo = (event) => {
    console.log("checked");
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);

    setTodos(newTodos);
    console.log(newTodos);
  };

  return (
    <div className="display">
      <div className="app">
        <h1 className="title">TO-DO LIST</h1>
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
          <input
            placeholder="Add your to-do..."
            className="input"
            name="value"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            value={inputValue}
          />
          <button className="primary-button" type="submit">
            <Image width="20px" height="20px" src="/icon/add.png" alt="add" />
          </button>
        </form>

        {todos.map((todo, index) => {
          return (
            <div className="todo-item" key={index + "_todo"}>
              <div>
                <p className="label">{todo}</p>
              </div>
              <div>
                <button
                  className="delete-button"
                  onClick={() => deleteTodo(index)}
                >
                  <Image
                    width="20px"
                    height="20px"
                    src="/icon/delete.png"
                    alt="delete"
                  />
                </button>
                <button className="delete-button" onClick={() => checkTodo()}>
                  <Image
                    width="20px"
                    height="20px"
                    src="/icon/checked.png"
                    alt="check"
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

{
  /* <div className="todo-item">
        <p className="label">Beli susu</p>
        <button className="delete-button">Hapus</button>
      </div>

      <div className="todo-item">
        <p className="label">Beli baju</p>
        <button className="delete-button">Hapus</button>
      </div>

      <div className="todo-item">
        <p className="label">Beli buku</p>
        <button className="delete-button">Hapus</button>
      </div> */
}
