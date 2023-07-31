import { Component } from "react";

import "../less/02-memo.less";

class Memo extends Component {
  state = {
    title: "",
    lis: [
      { text: "Vue", state: true },
      { text: "React", state: false },
    ],
  };

  // 输入框
  title(e) {
    this.setState({ title: e.target.value });
  }

  // 提交
  sub() {
    let { title, lis } = this.state;
    if (!title.trim()) {
      return alert("输入不能为空");
    }
    for (let i = 0; i < lis.length; i++) {
      if (lis[i].text == title.trim()) {
        return alert("事件不能重复");
      }
    }
    lis.push({ text: title, state: false });
    title = "";
    this.setState({ lis, title });
  }

  // 复选框
  lst(e, index) {
    let { lis } = this.state;
    lis[index].state = e.target.checked;
    this.setState({ lis });
  }

  // 删除对应
  del(index) {
    let { lis } = this.state;
    lis.splice(index, 1);
    this.setState({ lis });
  }

  // 全选
  all() {
    let { lis } = this.state;
    lis.forEach((item) => (item.state = true));
    this.setState({ lis });
  }

  // 删除已完成
  delO() {
    let { lis } = this.state;
    lis = lis.filter((item) => item.state != true);
    this.setState({ lis });
  }

  render() {
    let { title, lis } = this.state;

    let li = lis.map((item, index) => {
      return (
        <li key={index}>
          <input
            type="checkbox"
            name="lis"
            id={index}
            checked={item.state}
            onChange={(e) => this.lst(e, index)}
          />
          <label htmlFor={index}>{item.text}</label>
          <button onClick={() => this.del(index)}>删除</button>
        </li>
      );
    });

    return (
      <div className="memo-containar">
        <h2>备忘录</h2>
        <hr />
        <input
          type="text"
          className="title"
          value={title}
          onChange={(e) => {
            this.title(e);
          }}
        />
        <button onClick={() => this.sub()}>提交</button>
        <hr />
        {li}
        <hr />
        <button onClick={() => this.all()}>全选</button>
        <button onClick={() => this.delO()}>删除选中项</button>
      </div>
    );
  }
}

export default Memo;
