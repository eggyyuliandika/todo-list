import { useState } from "react";
import Image from "next/image";

const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();

    // Mengcopy isi state todos ke variable newTodos
    const newTodos = [...todos];
    newTodos.push({ task: inputValue, isDone: false });
    setTodos(newTodos);
    setInputValue("");
  };

  const onNextDay = (currentIndex) => {
    currentIndex = currentIndex + 1;
    if (currentIndex === 7) {
      currentIndex = 0;
    }
    setSelectedDayIndex(currentIndex);
  };

  const onPrevDay = (currentIndex) => {
    currentIndex = currentIndex - 1;
    if (currentIndex === 0) {
      currentIndex = 6;
    }
    setSelectedDayIndex(currentIndex);
  };

  const onToogleCompletion = (index) => {
    const newTodos = [...todos];
    const selectedTodo = { ...newTodos[index] };
    newTodos[index] = { task: selectedTodo.task, isDone: !selectedTodo.isDone };

    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    console.log(newTodos);
  };

  const deleteAllTodo = () => {
    setTodos([]);
  };

  return (
    <div className="display">
      <h1 className="title">TO-DO LIST</h1>
      <div className="app">
        <div>
          <div className="flex-item">
            <button
              className="icon-left"
              onClick={() => onPrevDay(selectedDayIndex)}
            >
              <Image
                width="20px"
                height="20px"
                src="/icon/left-arrow.png"
                alt="delete"
              />
            </button>
            <div className="day">{days[selectedDayIndex]}</div>
            <button
              className="icon-right"
              onClick={() => onNextDay(selectedDayIndex)}
            >
              <Image
                className="icon"
                width="20px"
                height="20px"
                src="/icon/next.png"
                alt="right"
              />
            </button>
          </div>
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
        </div>

        <div className="display-button">
          <button className="button1" onClick={() => deleteAllTodo()}>
            Clear All To-Do
          </button>
        </div>

        {todos.map((todo, index) => {
          return (
            <div>
              <div className="todo-item">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "20px auto 20px",
                    alignItems: "center",
                  }}
                >
                  <div
                    onClick={() => onToogleCompletion(index)}
                    className="checked"
                  >
                    <Image
                      width="24px"
                      height="24px"
                      src="/icon/square.png"
                      alt="checklist"
                    />
                  </div>
                  <div
                    className="label"
                    style={{
                      padding: "0px 12px",
                      textDecoration: todo.isDone ? "line-through" : "none",
                    }}
                  >
                    {todo.task}
                  </div>
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
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
