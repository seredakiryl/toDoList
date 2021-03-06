import { Checkbox, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React, { ChangeEvent, useCallback } from "react";
import EditableSpan from "./EditableSpan";
import { TaskType } from "./TodolistWithTasks";

type TaskPropsType = {
    key: string
    task: TaskType
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {

    const onClickHandler = () => props.removeTask(props.task.id, props.todolistId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.task.id, newIsDoneValue, props.todolistId);
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId);
    }, [props.task.id, props.todolistId])


    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={props.task.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan title={props.task.title} setNewTitle={onTitleChangeHandler} />
        <IconButton onClick={onClickHandler}>
            <Delete />
        </IconButton>
    </div>


})