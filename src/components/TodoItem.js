import React, { useState } from "react";
import { RiCloseCircleLine, RiPencilLine } from "react-icons/ri";
import { BiCheckCircle } from "react-icons/bi";

export default function TodoItem(props) {
	const [value, setValue] = useState(props.todo.text); // 초기값을 입력받은 todo객체의 text요소!
	const [isUpdating, setIsUpdating] = useState(false); // 처음은 false

	return (
		<div className={props.todo.completed ? "todo-row complete" : "todo-row"}>
			<BiCheckCircle
				className="icon"
				onClick={() => props.completeTodo(props.todo.id)}
			/>
			<div className="todo-value-container" > 
				{isUpdating ? (
					<input value={value} onChange={(e) => setValue(e.target.value)} />
				) : (
					value
				)}
			</div>
			<RiPencilLine
				className="icon"
				onClick={() => {
					setIsUpdating((prev) => !prev);
					if (isUpdating === true) { //false라고 하면 위의 setIsUpdating이 비동기로 작동하므로 true로 먼저 동작하도록 만든다
						props.editTodo(props.todo.id, { ...props.todo, text: value });
					}
				}}
			/>
			<RiCloseCircleLine
				className="icon"
				onClick={() => props.removeTodo(props.todo.id)}
			/>
		</div>
	);
}
