import React, { Component } from 'react'
import { Button, DatePicker } from 'antd';
import './App.less';

const testHOC = (WrappedCompenent) => {
  return class HOCCompenent extends Component {
      render() {
        return (
          <>
            <WrappedCompenent />
            <div>HOCCompenent</div>
          </>
        )
      }
  }
}

@testHOC
class App extends Component {
  render() {
    return (
      <>
        <Button type="primary">PRESS ME</Button>
        <DatePicker placeholder="select date" />
      </>
    )
  }
}

export default App;
