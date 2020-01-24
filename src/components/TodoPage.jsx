import React from "react";
import axios from "axios";

import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import {Typography} from "antd";

const dataUrl = "http://localhost:8000/todos/";
const { Title } = Typography;


export default class TodoPage extends React.Component {

    state = {
        loading: true,
        data: [],
        todo: "",
    };

    async componentDidMount() {
        await this.getData();
    }

    reload = async () => {
        console.log("reloading");
        await this.getData();
    }

    getData = async () => {
        const todos = await axios.get(dataUrl).then(res => {
            return res.data;
        });
        this.setState({
            loading: false,
            data: todos
        });
    };
    
    
    render() {
        const {loading, data} = this.state;
        return (
            <div>
                <Title>My Todos</Title>
                <TodoForm submit={this.reload.bind(this)} url={dataUrl}/>
                <TodoList todos={data} loading={loading} reload={this.reload.bind(this)} />
            </div>
        )
    }
}