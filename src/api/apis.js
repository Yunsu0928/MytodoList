export const addTodoToJSONServer = (newTodo) => {
	return fetch("http://localhost:3001/todos", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			...newTodo,
		}),
	})
		.then((response) => {
			console.log("response", response);
			return response.json();
		})
		.then((data) => console.log(data))
		.catch((err) => console.error(err));
};

export const removeTodoToJSONServer = (id) => {
	// fetch("http://localhost:3000/" + todo.id, {
	// 	method: "DELETE",
	// }).then((response) => response.json()).then(res => {
	// 	action(res);
	// })
	return fetch("http://localhost:3001/todos/" + id, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	}).then((response) => response.json());
};
// promise

export const editTodoToJSONServer = (todo) => {
	fetch("http://localhost:3001/todos/" + todo.id, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ text: todo.text }),
	}).then((response) => response.json());
};

export const completeTodoJSONServer = (todo) => {
	return fetch("http://localhost:3001/todos/" + todo.id, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ completed: !todo.completed }),
	}).then((response) => response.json());
};
