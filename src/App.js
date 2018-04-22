import React, { Component } from 'react';
import './App.css';
import question from './Question';

export default class App extends Component {
  state = { curr: 0 };

  render() {
    const Question = question(this.state.curr);
    return (
      <div>
        <Question onNext={() => this.setState({ curr: ++this.state.curr })} />
      </div>
    );
  }
}
