import { useState } from "react";

const TodoDetails = () => {
    const [state, setState] = useState({
        task_title: '',
        task_description: '',
        used_technology: [],
        task_status: '', // radio button
        task_priority: '',
        task_start_date: null,
        task_end_date: null
    });

    const handleChange = (event) => {
        const { id, value, type, checked } = event.target;

        if (type === "checkbox") {
            if (checked) {
                setState((prev) => ({
                    ...prev,
                    used_technology: [...prev.used_technology, value]
                }));
            } else {
                setState((prev) => ({
                    ...prev,
                    used_technology: prev.used_technology.filter((tech) => tech !== value)
                }));
            }
        } else {
            setState((prev) => ({
                ...prev,
                [id]: value
            }));
        }
    };

    const ValidateForm = (event) => {
        event.preventDefault();
        if (handleValidation()) {
            formSubmitClick();
        } else {
            console.log("Form validation failed");
        }
    };

    const handleValidation = () => {
        const { task_title, task_description, task_priority, task_start_date, task_end_date, task_status } = state;

        if (!task_title || !task_description || !task_priority || !task_start_date || !task_end_date || !task_status) {
            alert("Please fill in all fields.");
            return false;
        }
        return true;
    };

    const formSubmitClick = async () => {
        const requestData = {
            task_title: state.task_title,
            task_description: state.task_description,
            used_technology: JSON.stringify(state.used_technology),
            task_status: state.task_status,
            task_priority: state.task_priority,
            task_start_date: state.task_start_date,
            task_end_date: state.task_end_date
        };

        try {
            const baseUrl = `http://localhost:5000`;
            const response = await fetch(`${baseUrl}/api/v1/add-task`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            const result = await response.json();
            console.log("Form submitted successfully:", result);
            // alert("Task added successfully!");
        } catch (error) {
            console.error("Error submitting the form:", error);
            // alert("Error adding task.");
        }
    };

    return (
        <>
            <form>
                <label>Task Title</label>
                <input
                    type="text"
                    id="task_title"
                    name="task_title"
                    value={state.task_title}
                    placeholder="Task Title"
                    onChange={handleChange}
                />

                <label>Task Description</label>
                <textarea
                    id="task_description"
                    name="task_description"
                    value={state.task_description}
                    placeholder="Task Description"
                    onChange={handleChange}
                />

                {/* Task Status - Radio Buttons */}
                <label>Task Status</label>
                <label>
                    <input
                        type="radio"
                        id="task_status"
                        name="task_status"
                        value="Started"
                        checked={state.task_status === "Started"}
                        onChange={handleChange}
                    /> Started
                </label>
                <label>
                    <input
                        type="radio"
                        id="task_status"
                        name="task_status"
                        value="Not Started"
                        checked={state.task_status === "Not Started"}
                        onChange={handleChange}
                    /> Not Started
                </label>
                <label>
                    <input
                        type="radio"
                        id="task_status"
                        name="task_status"
                        value="In Progress"
                        checked={state.task_status === "In Progress"}
                        onChange={handleChange}
                    /> In Progress
                </label>
                <label>
                    <input
                        type="radio"
                        id="task_status"
                        name="task_status"
                        value="Completed"
                        checked={state.task_status === "Completed"}
                        onChange={handleChange}
                    /> Completed
                </label>

                {/* Technology Checkboxes */}
                <label>Technology</label>
                <label>
                    <input
                        type="checkbox"
                        id="used_technology"
                        name="used_technology"
                        value="React JS"
                        checked={state.used_technology.includes("React JS")}
                        onChange={handleChange}
                    /> React JS
                </label>
                <label>
                    <input
                        type="checkbox"
                        id="used_technology"
                        name="used_technology"
                        value="Node JS"
                        checked={state.used_technology.includes("Node JS")}
                        onChange={handleChange}
                    /> Node JS
                </label>
                <label>
                    <input
                        type="checkbox"
                        id="used_technology"
                        name="used_technology"
                        value="AWS"
                        checked={state.used_technology.includes("AWS")}
                        onChange={handleChange}
                    /> AWS
                </label>
                <label>
                    <input
                        type="checkbox"
                        id="used_technology"
                        name="used_technology"
                        value="MySQL"
                        checked={state.used_technology.includes("MySQL")}
                        onChange={handleChange}
                    /> MySQL
                </label>

                {/* Task Priority */}
                <label>Task Priority</label>
                <select id="task_priority" name="task_priority" value={state.task_priority} onChange={handleChange}>
                    <option value="">Select priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>

                {/* Task Dates */}
                <label>Task Start Date</label>
                <input
                    type="date"
                    id="task_start_date"
                    name="task_start_date"
                    value={state.task_start_date || ''}
                    onChange={handleChange}
                />

                <label>Task End Date</label>
                <input
                    type="date"
                    id="task_end_date"
                    name="task_end_date"
                    value={state.task_end_date || ''}
                    onChange={handleChange}
                />

                <button type="submit" onClick={ValidateForm}>Submit</button>
            </form>
        </>
    );
};

export default TodoDetails;
