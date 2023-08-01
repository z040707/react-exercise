import { Component } from "react";
import styled, { css } from "styled-components";

const Wrapper = styled.div`
  position: relative;
  width: 60px;
  height: 30px;
  padding: 4px;
  box-shadow: inset 0 0 4px #999;
  border-radius: 15px;
  ${(props) => {
    css`
      background-color: ${props.checked ? "red" : "#fff"};
    `;
  }}
  .case {
    position: absolute;
    width: 22px;
    height: 22px;
    left: 4px;
    top: 4px;
    border-radius: 50%;
    background-color: #999;
    transition: 0.5s;
  }
  .case.on {
    left: 34px;
    background-color: #72b5f0;
  }
`;

class Switch extends Component {
  constructor(props) {
    super(props);
    // 如果外部传递的值只是希望作为组件的默认值使用
    // 不参与组件的逻辑计算
    // 如果希望将 props 的值作为组件默认值使用时
    // 将外部传递的 props 转换为组件自身的 state
    // 避免在计算时触发修改 props 对象属性
    this.state = {
      checked: !this.props.defaultChecked,
    };
  }

  toggle() {
    this.setState(({ checked }) => {
      // 在修改状态时，执行 props 传递的函数。向外传递组件内的值
      this.props.onChange(!checked);

      // 修改组件自己的状态
      return {
        checked: !checked,
      };
    });
  }

  render() {
    let { checked } = this.state;

    return (
      <Wrapper checked={checked} onClick={() => this.toggle()}>
        <div className={`case ${checked ? "on" : ""}`}></div>
      </Wrapper>
    );
  }
}

export default () => {
  let onChange = (value) => {
    console.log("switch 的值是", value);
  };

  return <Switch defaultChecked onChange={onChange}></Switch>;
};
