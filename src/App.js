import React, {Component} from 'react';
import {reduxForm, Field, SubmissionError, reset, formValueSelector} from 'redux-form';
import {connect} from 'react-redux';

import Input from './Input';
import logo from './logo.svg';
import './App.css';
import {Q1, Q2, Q3} from './svg';
import {Grid, Image, Button} from 'semantic-ui-react';
import answers from './data/answers';

const normalize = val => {
  if (val) {
    val = val.replace(/([^PNZpnz])/g, '');
    return val.slice(-1).toUpperCase();
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {correct: false}
  }

  onSubmit = values => {
    const wrong = Object.keys(answers.Q1).filter(a => !values[a] || values[a] !== answers.Q1[a]);
    if (wrong.length > 0) throw new SubmissionError({_error: `You have ${wrong.length} mistakes.`});
    else this.setState({ correct: true })
  };

  render() {
    const {handleSubmit, error, A, B1, B2, C, AX, AY, CY} = this.props;
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={9} floated="left"
                         style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Q3 />
              <Q1 A={A} B1={B1} B2={B2} C={C} AX={AX} AY={AY} CY={CY} />
            </Grid.Column>
            <Grid.Column width={7} style={{display: 'flex', justifyContent: 'center', marginTop: '20vh'}}>
              <form onSubmit={handleSubmit(this.onSubmit)} style={{width: '80%'}}>
                <div style={{width: '100%'}}>
                  <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <div style={{marginRight: 8}}>AB</div>
                    <Field name="A" component={Input} type="text" normalize={normalize} style={{marginRight: 8}}/>
                    <Field name="B1" component={Input} type="text" normalize={normalize} style={{marginRight: 8}}/>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <div style={{marginRight: 8}}>BC</div>
                    <Field name="B2" component={Input} type="text" normalize={normalize} style={{marginRight: 8}}/>
                    <Field name="C" component={Input} type="text" normalize={normalize} style={{marginRight: 8}}/>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <div style={{marginRight: 8}}>A (x)</div>
                    <Field name="AX" component={Input} type="text" normalize={normalize} style={{marginRight: 8}}/>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <div style={{marginRight: 8}}>A (y)</div>
                    <Field name="AY" component={Input} type="text" normalize={normalize} style={{marginRight: 8}}/>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <div style={{marginRight: 8}}>C (y)</div>
                    <Field name="CY" component={Input} type="text" normalize={normalize} style={{marginRight: 8}}/>
                  </div>
                  <Button onClick={() => {
                    this.setState({color: '#ff8d1f'})
                  }}>Test solution</Button>
                  {error && !this.state.correct && <div style={{margin: `8px 0`, color: 'red'}}>{error}</div>}
                  {this.state.correct && <div style={{margin: `8px 0`, color: 'green'}}>You got all correct!</div>}
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
    const values = selector(state, 'A', 'B1', 'B2', 'C', 'AX', 'AY', 'CY');
    const {A, B1, B2, C, AX, AY, CY} = values;
    return {
      A: A || '',
      B1: B1 || '',
      B2: B2 || '',
      C: C || '',
      AX: AX || '',
      AY: AY || '',
      CY: CY || '',
    }
  }
)(QuestionForm);

export default QuestionForm