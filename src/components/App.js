import React from 'react';
import './App.css';

import { connect } from 'react-redux';
import { Row, Col, Input, Button } from 'antd';
import { CloseOutlined, CheckCircleOutlined } from '@ant-design/icons';


const App = (props) => {
  const { fetching, todos, fetchTodos, deleteTodo, error } = props

  return (
    <div className='App'>
      <div className='boards'>
        {todos ? (
          <div className='tasks' >
            <h2 className='App-intro'>Todo List</h2>
            {todos.map((todo) => (
              <Row className='task' key={todo.id}>
                <Col span={1}>
                  <input type='checkbox' defaultChecked={todo.isCompleted} />
                </Col>
                <Col span={19}>
                  <Col>
                    {todo.createdAt}
                  </Col>
                  <Col>
                    <Input
                      className='textarea-input'
                      value={todo.taskName}
                    />
                  </Col>
                </Col>
                <Col span={4} className='button'>
                  <Button><CheckCircleOutlined /></Button>
                  <Button onClick={() => console.log('delete', todo.id)}><CloseOutlined /></Button>
                </Col>
              </Row>
            ))}
          </div>
        ) : (
            <h2 className='App-intro'>No Todo List</h2>
          )}

        {fetching ? (
          <button disabled>Fetching...</button>
        ) : (
            <button onClick={fetchTodos}>Fetch Todo List</button>
          )}

        {error && <p style={{ color: 'red' }}>Something went wrong!</p>}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    fetching: state.fetching,
    todos: state.todos,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTodos: () => dispatch({ type: 'API_CALL_REQUEST' })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);