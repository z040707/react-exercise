import { Component } from "react";
import styled from "styled-components";
import classNames from "classnames";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 800px;
  border: 2px solid #ddd;
  border-radius: 4px;
  padding: 24px;
  margin: 0 auto;

  .form {
    display: flex;
    align-items: stretch;
    padding: 8px;
    border: 1px solid #ddd;

    input[type="text"] {
      flex-grow: 1;
      margin-right: 8px;
      padding: 0 8px;
      height: 36px;
      line-height: 36px;
    }
  }

  .list {
    padding: 8px;
    margin-top: 8px;
    border: 1px solid #ddd;
    flex-grow: 1;
    min-height: 400px;
    max-height: 600px;
    overflow: auto;

    .list-item {
      display: flex;
      padding: 4px 0;
      .do {
        height: 36px;
        line-height: 36px;
        flex-grow: 1;
        margin: 0 8px;
        border-bottom: 1px solid #ddd;
      }
      .do.done {
        text-decoration: line-through;
      }
    }
    .list-item + .list-item {
      margin-top: 8px;
    }
  }

  .footer {
    margin-top: 8px;
    padding: 8px;
    border: 1px solid #ddd;

    button {
      height: 36px;
      padding: 0 8px;
      margin-right: 8px;
    }
  }
`;

// 现代前端开发方式：
// 将项目中的数据抽离出来，辅助编写数据对应的增删改查方法

class ToDoList extends Component {
  state = {
    content: "",
    tasks: [
      { done: false, content: "xxx", id: "t_1690774584277", if: true },
      { done: true, content: "yyy", id: "t_1690774611497", if: true },
    ],
  };

  changeContent(e) {
    let value = e.target.value;
    if (value.length < 50) {
      this.setState({ content: value });
    }
  }
  changeContentO(e, index) {
    let { tasks } = this.state;
    let value = e.target.value;
    if (value.length < 50) {
      tasks[index].content = value;
      this.setState({ tasks });
    }
  }

  submit() {
    let { content, tasks } = this.state;
    content = content.trim();
    if (content) {
      tasks.unshift({
        content,
        done: false,
        id: "t_" + Date.now(),
        if: true,
      });
      this.setState({ tasks, content: "" });
    }
  }

  toggleDone(e, index) {
    let { tasks } = this.state;
    tasks[index].done = e.target.checked;
    this.setState({ tasks });
  }

  upDate(index) {
    let { tasks } = this.state;
    tasks[index].if = false;
    this.setState({ tasks });
  }

  ok(index) {
    let { tasks } = this.state;
    tasks[index].if = true;
    this.setState({ tasks });
  }

  remove(id) {
    let { tasks } = this.state;
    tasks = tasks.filter((task) => task.id !== id);
    this.setState({ tasks });
  }

  allDone() {
    let { tasks } = this.state;
    tasks.forEach((task) => (task.done = true));
    this.setState({ tasks });
  }

  removeDone() {
    let { tasks } = this.state;
    tasks = tasks.filter((task) => !task.done);
    this.setState({ tasks });
  }

  render() {
    let { content, tasks } = this.state;

    let items = tasks.map((task, index) => {
      return (
        <div className="list-item" key={task.id}>
          <input
            type="checkbox"
            checked={task.done}
            onChange={(e) => this.toggleDone(e, index)}
          />
          <p className={classNames("do", { done: task.done })}>
            {task.if ? (
              task.content
            ) : (
              <input
                type="text"
                value={task.content}
                onChange={(e) => this.changeContentO(e, index)}
              />
            )}
          </p>
          {task.if ? (
            <button onClick={() => this.upDate(index)}>编辑</button>
          ) : (
            <button onClick={() => this.ok(index)}>完成</button>
          )}
          <button onClick={() => this.remove(task.id)}>删除</button>
        </div>
      );
    });

    return (
      <Wrapper>
        <h2>备忘录</h2>
        <div className="form">
          <input
            type="text"
            value={content}
            onChange={(e) => {
              this.changeContent(e);
            }}
          />
          <button onClick={() => this.submit()}>提交</button>
        </div>
        <div className="list">{items}</div>
        <div className="footer">
          <button onClick={() => this.allDone()}>全选</button>
          <button onClick={() => this.removeDone()}>删除已完成</button>
        </div>
      </Wrapper>
    );
  }
}

export default ToDoList;
