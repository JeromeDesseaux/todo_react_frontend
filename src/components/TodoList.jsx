import { List, Skeleton } from 'antd';
import React from "react";

// import reqwest from 'reqwest';
import axios from "axios";

const fakeDataUrl = "http://localhost:8000/todos/";

export default class LoadMoreList extends React.Component {
  state = {
    initLoading: true,
    loading: false,
    data: [],
    list: [],
  };

  async componentDidMount() {
      const todos = await this.getData();
      this.setState({
          initLoading: false,
          data: todos
    });
  }

  getData = async () => {
      return await axios.get(fakeDataUrl).then(res => {
          return res.data;
      });
  };

  updateTodo = async (todo) => {
      todo.done = !todo.done;
      await axios.put(fakeDataUrl+todo._id, todo);
      this.props.reload();
  }


  deleteTodo = async (todo) => {
      await axios.delete(fakeDataUrl+todo._id);
      this.props.reload();
  }

  render() {
    const { loading, todos } = this.props;

    return (
      <List
        className="demo-loadmore-list"
        loading={loading}
        itemLayout="horizontal"
        dataSource={todos}
        renderItem={item => (
          <List.Item
             // eslint-disable-next-line
            actions={[<a onClick={() => this.updateTodo(item)} key="list-loadmore-edit">done</a>, <a onClick={() => this.deleteTodo(item)} key="list-loadmore-more">delete</a>]}
          >
            <Skeleton title={true} loading={false} active>
              <div style={{flex:1}} className={(item.done ? 'done' : '')}>{item.name}</div>
            </Skeleton>
          </List.Item>
        )}
      />
    );
  }
}