import { List, Skeleton } from 'antd';
import React from "react";

import config from '../config/config';

// import reqwest from 'reqwest';
import axios from "axios";

const fakeDataUrl = config.endpointUrl;

export default class LoadMoreList extends React.Component {
  state = {
    initLoading: true,
  };

  async componentDidMount() {
      this.setState({
          initLoading: false,
    });
  }

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