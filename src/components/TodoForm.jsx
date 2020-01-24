import React from "react";
import { Form, Icon, Input, Button } from 'antd';
import Axios from "axios";

class TodoForm extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        await Axios.post(this.props.url, {
            name: values.todo,
            done: false
        });
        this.props.submit();
        this.props.form.resetFields();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('todo', {
            rules: [{ required: true, message: 'Please input your todo!' }],
          })(
            <Input
              prefix={<Icon type="book" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Write here your todo"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Add
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedTodoForm = Form.create({ name: 'todo_form' })(TodoForm);

export default WrappedTodoForm;
