import { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import {
	addTodoToJSONServer,
	completeTodoJSONServer,
	editTodoToJSONServer,
	removeTodoToJSONServer,
} from "./api/apis";

function App() {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		fetch("http://localhost:3001/todos")
			.then((response) => response.json())
			.then((data) => {
				const sortedTodos = data.sort((a, b) => b.id - a.id);
				setTodos(sortedTodos);
			});
	}, []);

	const addTodo = (text) => {
		// App.js에서 text는 input
		let id = todos.length + 1;
		// console.log(`todos.length: ${todos.length}`);

		// if (todos.length > 0) {
		// 	id = todos[0].id + 1;
		// 	// 첫번째 요소를 얻고, 그리고 그 아이디를 얻어서 플러스1을 한다 >> 첫번째 요소를 얻기 때문에 왜냐면 그게 가장 최신의 것
		// 	// 우리가 새로운 요소를 생성할 때 이걸 사용하도록 실제로 변경하는 이유이다.
		// 	// 맨 위에 있는 요소가 가장 최신 todo 그래서 그렇다
		// }
		let todo = { id, text, completed: false };
		let newTodos = [todo, ...todos];
		console.log(newTodos);
		addTodoToJSONServer(todo).then((_) => {
			setTodos(newTodos);
		});

		// todos state를 update해주었으니
		// 서버에 있는 todos
	};

	const removeTodo = (id) => {
		// (async () => {
		// 	try{
		// 		const data = await removeTodoToJSONServer(id);
		// 		let updatedTodos = [...todos].filter((todo) => todo.id !== id); // 통과하는 모든 요소를 모아 새로운 배열로 반환
		// 		// id같지 않은것들을 배열로 만들어서 updatedTodos에 넣음 (내가 지금 선택한 id를 가진애를 삭제할거니까)
		// 		setTodos(updatedTodos);
		// 	}catch(err) {
		// 	}
		// })()

		removeTodoToJSONServer(id)
			.then((res) => {
				let updatedTodos = [...todos].filter((todo) => todo.id !== id); // 통과하는 모든 요소를 모아 새로운 배열로 반환
				// id같지 않은것들을 배열로 만들어서 updatedTodos에 넣음 (내가 지금 선택한 id를 가진애를 삭제할거니까)
				setTodos(updatedTodos);
			})
			.catch((err) => {
				console.error(err);
			});
		// removeTodoToJSONServer(id,setTodos);
	};

	const completeTodo = (id) => {
		// console.log(id);
		// 완성 체크 (css수정하기)
		const found = todos.find((a) => a.id === id); //주어진 판별 함수를 만족하는 첫 번째 요소의 값을 반환
		completeTodoJSONServer(found).then((res) => {
			let updatedTodos = todos.map((todo) => {
				//배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환
				if (todo.id === id) {
					todo.completed = !todo.completed; // 그 todo안의 요소인 completed를 false => true / true => false로 변환한다
				}
				// todos목록에서 내가 원하는 todo와 id가 같으면 작동하는데, 기존에 체크가 안되어있었으면 체크가 되도록 true를 주고, 체크가 되어있던 아이면 체크가 안되도록 false로 변환을 해준다
				return todo; // map에서 반환하는 값은 선택한 todo
			});

			setTodos(updatedTodos);
		});
		//새로운 배열로 반환한 값을 setTodos에 넣어서 todos목록을 바꾼다
	};

	const editTodo = (id, newText) => {
		const index = todos.findIndex((a) => a.id === id);
		const left = todos.slice(0, index);
		const right = todos.slice(index + 1);

		const newTodos = [...left, newText, ...right];

		setTodos(newTodos);
		console.log(newTodos);

		editTodoToJSONServer(newText);

		// editTodo를 map만을 사용해서 진행하는 방법
		// todos [1,2,3,4] => (2,5) => newArr [1,2,5,4]
		// editTodo = (id, newText) => {
		// const newArr = todos.map(a=>{
		//	if(a.id === id){
		//	return newText;
		//}
		// return a;
		//})
		//}
	};

	return (
		<div className="todo-app">
			<h1>Todo List</h1>
			<TodoForm addTodo={addTodo} />
			{todos.map((todo) => {
				return (
					<TodoItem
						editTodo={editTodo}
						removeTodo={removeTodo}
						completeTodo={completeTodo}
						todo={todo}
						key={todo.id}
					/>
				);
			})}
		</div>
	);
}

export default App;
