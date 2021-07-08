import './App.css';
import Header from "./Header";
import { useState} from "react";
import {connect} from "react-redux";

function App(props) {
    const [newTask, setNewTask] = useState('');

    return (
    <div className="App">
      <Header />
        <div className="input-group new-task mx-auto">
            <input type="text" className="form-control" value={newTask} placeholder={'Write new task here'} aria-label="New Task" onChange={e => setNewTask(e.target.value)}/>
            <button className="btn btn-success rounded-2" type="button" onClick={() => {props.addNewTask(newTask); setNewTask('')}}>Save</button>
        </div>

        <ul className="todo-list list-group list-group-numbered text-start">
            {props.taskList.map((el, index) =>
                <li className="list-group-item list-group-item-action" key={index}>
                    {el.done ? <s>{el.name}</s> : el.name}

                    <div className={"btn-group float-end"} role={"group"}>
                        <button type={"button"} className={"btn btn-outline-primary"} onClick={() => props.deleteTask(index)}>Delete{el.done}</button>
                        <button type={"button"} className={"btn btn-outline-primary"} onClick={() => props.taskSetStatus(el.id, true)} disabled={el.done === true ? true : false}>Done</button>
                        <button type={"button"} className={"btn btn-outline-primary"} onClick={() => props.taskSetStatus(el.id, false)} disabled={el.done === true ? false : true}>Back</button>
                    </div>
                </li>)}
        </ul>
    </div>
  );
}

const mapStateToProps = state => ({
    taskList: state.taskList,
})

const mapDispatchToProps = dispatch => ({
    addNewTask: (newTask) => dispatch({type: "ADD_NEW_TASK", payload: newTask}),
    deleteTask: (taskId) => dispatch({type: "DELETE_TASK", payload: taskId}),
    taskSetStatus: (taskId, status) => dispatch({type: "TASK_SET_STATUS", payload: {taskId, status}}),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
