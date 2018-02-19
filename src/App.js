import React, { Component } from 'react';
import { reduxForm, Field, SubmissionError, reset, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import Input from './Input';
import logo from './logo.svg';
import './App.css';
import { Q1 } from './svg';
import { Grid, Image, Button } from 'semantic-ui-react';

const normalize = val => {
  if (val) {
    val = val.replace(/([^PNZpnz])/g, '');
    return val.slice(-1).toUpperCase();
  }
};

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleSubmit, A, B1, B2, C } = this.props;
    console.log(this.props)
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10} floated="left" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Q1 A={A} B1={B1} B2={B2} C={C} />
            </Grid.Column>
            <Grid.Column width={6} style={{display: 'flex', justifyContent: 'center', marginTop: '20vh'}}>
              <form onSubmit={handleSubmit}>
              <div style={{width: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                  <div>AB</div>
                  <Field name="A" component={Input} type="text" normalize={normalize} />
                  <Field name="B1" component={Input} type="text" normalize={normalize} />
                </div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                  <div>BC</div>
                  <Field name="B2" component={Input} type="text" normalize={normalize} />
                  <Field name="C" component={Input} type="text" normalize={normalize} />
                </div>
                <Button onClick={()=>{this.setState({color: '#ff8d1f'})}}>ABC</Button>
              </div>
              </form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

let QuestionForm = reduxForm({
  form: 'question'
})(App);

const selector = formValueSelector('question');
QuestionForm = connect(
  state => {
    const values = selector(state, 'A', 'B1', 'B2', 'C');
    const { A, B1, B2, C } = values;
    return {
      A: A || '',
      B1: B1 || '',
      B2: B2 || '',
      C: C || '',
    }
  }
)(QuestionForm);

export default QuestionForm