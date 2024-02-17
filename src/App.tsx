import { FC, useEffect, useState } from "react";
import "overlayscrollbars/overlayscrollbars.css";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import axios from "axios";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const App: FC = (): JSX.Element => {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Todo[]>(
          "https://jsonplaceholder.typicode.com/todos"
        );
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="max-w-[820px]">
        <OverlayScrollbarsComponent>
          <div className="w-[800px] h-[500px]">
            {todos.map((todo, index) => (
              <div key={index} className="flex w-[800px] p-2 bg-red-600 mt-2">
                <input
                  className="w-[36px] h-[36px]"
                  type="checkbox"
                  defaultChecked={todo.completed}
                />
                <p
                  style={{
                    textDecorationLine: todo.completed
                      ? "line-through"
                      : "none",
                  }}
                  className="text-3xl ml-2"
                >
                  {todo.id}. {todo.title}
                </p>
              </div>
            ))}
          </div>
        </OverlayScrollbarsComponent>
      </div>
    </>
  );
};

export default App;
