// import { useState } from "react";
import { useState } from "react";

const AddTask = ({ onAdd }) => {
	const [text, setText] = useState("");
	const [day, setDay] = useState("");
	const [reminder, setReminder] = useState(false);

	const onSubmit = (e) => {
		e.preventDefault();

		if (!text) {
			alert("you must write a text");
			return;
		}
		onAdd({ text, day, reminder });

		setText("");
		setDay("");
		setReminder(false);
	};

	return (
		<form className="add-form" onSubmit={onSubmit}>
			<div className="form-control">
				<label> task</label>
				<input
					type="text"
					name=""
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder="Add Task"
					id=""
				/>
			</div>
			<div className="form-control">
				<label> day</label>
				<input
					type="text"
					name=""
					placeholder="Add Day And Time"
					value={day}
					onChange={(e) => setDay(e.target.value)}
				/>
			</div>

			<div className="form-control form-control-check">
				<label> Set Reminder</label>
				<input
					type="checkbox"
					checked={reminder}
					value={reminder}
					onChange={(e) => setReminder(e.currentTarget.checked)}
				/>
			</div>
			<input type="submit" value="save task" className="btn" />
		</form>
	);
};
// export default AddTask;
export  default AddTask
