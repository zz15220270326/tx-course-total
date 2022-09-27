class Component {
  constructor(props = {}) {
    this.props = props || {};
    this.state = {};
    this.components = props.components || [];

    let t = setTimeout(() => {
      this.componentDidMount();
      clearTimeout(t);
      t = null;
    }, 100);
  }
  /**
   * @return {HTMLElement} 
   */
  render() {
    throw new Error('you should impliment the render function !');
  }

  setState(newState, callback) {
    if (Object.prototype.toString.call(newState) === '[object Object]') {
      this.state = Object.assign(this.state, newState);
    }
    if (Object.prototype.toString.call(newState) === '[object Function]') {
      this.state = Object.assign(this.state, newState());
    }
    if (typeof callback === 'function') {
      callback();
    }
  }

  bindEvent() {}

  componentDidMount() {
    // console.log('component is mounted!!!');
  }
}

export default Component;
