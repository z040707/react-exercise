import { Component } from "react";

import "../less/clip.less";

class Clip extends Component {
  state = {
    points: [], // [{x, y}, {x, y}]
    clipPath: "none",
  };

  shot(e) {
    // 根据鼠标的相当于被点击元素的点击坐标点
    let x = e.nativeEvent.offsetX;
    let y = e.nativeEvent.offsetY;
    this.setState(({ points }) => {
      if (points.length < 5) {
        points.push({ x, y });
      }
      return { points };
    });
  }

  clip() {
    let { points } = this.state;

    if (points.length < 5) {
      return alert("还不够 5 个点");
    }

    let path = points // [{x, y}]
      .map((point) => point.x + "px " + point.y + "px") // ["10px 20px","30px 40px"];
      .join(", "); // "10px 20px, 30px 40px"

    this.setState({
      clipPath: `polygon(${path})`,
    });
  }

  reset() {
    this.setState({
      points: [], // [{x, y}, {x, y}]
      clipPath: "none",
    });
  }

  render() {
    let { points, clipPath } = this.state;

    let dots = points.map((point, index) => {
      return (
        <span
          key={index}
          className="dot"
          style={{ left: point.x - 6 + "px", top: point.y - 6 + "px" }}
        >
          {index + 1}
        </span>
      );
    });

    return (
      <div className="clip-containar">
        <p>
          请在下面的面板中随机点击5个点，然后点击裁剪按钮，就可以得到裁剪后的效果
        </p>
        <div className="clip-bg">
          <div
            className="clip-target"
            style={{ clipPath }}
            onClick={(e) => this.shot(e)}
          >
            {dots}
          </div>
        </div>
        <button className="btn reset" onClick={() => this.reset()}>
          重置
        </button>
        <button className="btn clip" onClick={() => this.clip()}>
          裁剪
        </button>
      </div>
    );
  }
}

export default Clip;
