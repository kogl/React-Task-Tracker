import { useState, useEffect } from "react";


import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";
import AddTask from "./components/AddTask";



function App() {
	const [showAddTask, setShowAddTask] = useState(false)
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const getTasks = async () => {
			const tasksFromServer = await fetchTasks()
			setTasks(tasksFromServer)
		}
		getTasks()
	}, [])

	//fetch Tasks 
	const fetchTasks = async () => {
		const res = await fetch('http://localhost:1640/tasks')
		const data = await res.json()
		return data
	}


	//fetch Task 
	const fetchTask = async (id) => {
		const res = await fetch(`http://localhost:1640/tasks/${id}`)
		const data = await res.json()
		return data
	}

	//deleteTask
	const deleteTask = async (id) => {
		await fetch(`http://localhost:1640/tasks/${id}`, {
			method: 'DELETE'
		})

		setTasks(tasks.filter((task) => task.id !== id))
	}

	// reminder
	const toggleReminder = async (id) => {
		const taskToToggle = await fetchTask(id)
		const updateTask = { ...taskToToggle, reminder: !taskToToggle.reminder }


		const res = await fetch(`http://localhost:1640/tasks/${id}`, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(updateTask)
		})

		const data = await res.json()

		setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))

	}


	// add task 

	const addTask = async (task) => {
		const res = await fetch('http://localhost:1640/tasks', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(task)
		})


		const data = await res.json

		setTasks([...tasks, data])


		const id = Math.floor(Math.random() * 10000 + 1)
		const newTask = { id, ...task }

		setTasks([...tasks, newTask])
		console.log(id);
	}

	return (
		<div className="container">
			<Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
			{showAddTask && <AddTask onAdd={addTask} />}
			{tasks.length > 0 ? < Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks to show'
			}
		</div>
	);
}

export default App;
