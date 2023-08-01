import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../less/04-select.less"; // 引入样式文件

// TransitionGroup:当需要完成一组动画时，需要将多个 CSSTransition 放入到一个 TransitionGroup 中来完成动画。TransitionGroup 本身并不定义任何的动画行为。内部列表项的具体动画效果仍取决于单个过渡组件。

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      filteredOptions: [],
    };
  }

  handleInputChange = (e) => {
    const value = e.target.value;
    const { options } = this.props;

    let filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );

    this.setState({
      inputValue: value,
      filteredOptions: filteredOptions,
    });
  };

  handleSelectOption = (value) => {
    this.setState({
      inputValue: value,
      filteredOptions: [],
    });

    this.props.onChange(value);
  };

  render() {
    const { inputValue, filteredOptions } = this.state;

    return (
      <div className="wrapper">
        <input
          type="text"
          value={inputValue}
          onChange={this.handleInputChange}
        />
        {inputValue && filteredOptions.length === 0 && (
          <div className="ul">数据为空</div>
        )}
        {filteredOptions.length > 0 && (
          <TransitionGroup component="ul" className="ul select-list">
            {/* component:定义 TransitionGroup 组件默认渲染完成的标签，默认值为 div。若设置为 null，则不渲染成标签 */}
            {filteredOptions.map((option) => (
              <CSSTransition key={option} timeout={300} classNames="fade">
                <li onClick={() => this.handleSelectOption(option)}>
                  {option}
                </li>
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </div>
    );
  }
}

export default () => {
  let option = ["zzz", "xxx", "ccc", "zxc"];

  let change = (value) => {
    console.log(value);
  };

  return (
    <>
      <Select options={option} onChange={change} />
    </>
  );
};
