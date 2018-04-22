import React, { Component } from 'react';
import { reduxForm, Field, SubmissionError, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { Grid, Button } from 'semantic-ui-react';
import Input from './components/Input';
import questions from './data/questions';

const styles = {
  left: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const normalize = (val) => {
  if (val) {
    val = val.replace(/([^PNZpnz])/g, '');
    return val.slice(-1).toUpperCase();
  }
};

const question = (i) => {
  class Question extends Component {
    state = { correct: false };

    onSubmit = (values) => {
      const wrong = Object.keys(questions[i].answer).filter(a => !values[a] || values[a] !== questions[i].answer[a]);
      if (wrong.length > 0) throw new SubmissionError({ _error: `You have ${wrong.length} mistakes.` });
      else this.setState({ correct: true });
    };

    renderQuestionSvg = (index, props) => {
      const QuestionSvg = questions[index].image;
      return <QuestionSvg {...props} />;
    };

    renderInput = (i, title, names) => (
      <div key={i} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <div style={{ marginRight: 8 }}>{title}</div>
        {names.map(n => <Field name={n} component={Input} type="text" normalize={normalize} style={{ marginRight: 8 }} />)}
      </div>
    );

    render() {
      const { handleSubmit, error, onNext, A, B1, B2, C, C1, C2, D, AX, AY, AM, BY, CY } = this.props;
      return (
        <Grid>
          <Grid.Row style={{ height: '100vh' }}>
            <Grid.Column width={9} floated="left" style={styles.left}>
              {this.renderQuestionSvg(i, { A, B1, B2, C, C1, C2, D, AX, AY, AM, BY, CY })}
            </Grid.Column>
            <Grid.Column width={7} style={styles.right}>
              <form onSubmit={handleSubmit(this.onSubmit)} style={{ width: '80%' }}>
                <div style={{ width: '100%' }}>
                  {questions[i].inputs.map(({ title, names }, i) => this.renderInput(i, title, names))}
                  <Button>Test solution</Button>
                  {i < questions.length - 1 && <Button onClick={() => onNext()}>Next</Button>}
                  {error && !this.state.correct && <div style={{ margin: '8px 0', color: 'red' }}>{error}</div>}
                  {this.state.correct && <div style={{ margin: '8px 0', color: 'green' }}>You got all correct!</div>}
                </div>
              </form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    }
  }

  return connect((state) => {
    const values = formValueSelector(`question${i}`)(state, 'A', 'B1', 'B2', 'C', 'C1', 'C2', 'D', 'AX', 'AY', 'AM', 'BY', 'CY');
    const { A, B1, B2, C, C1, C2, D, AX, AY, AM, BY, CY } = values;
    return {
      A: A || '',
      B1: B1 || '',
      B2: B2 || '',
      C: C || '',
      C1: C1 || '',
      C2: C2 || '',
      D: D || '',
      AX: AX || '',
      AY: AY || '',
      AM: AM || '',
      BY: BY || '',
      CY: CY || '',
    };
  })(reduxForm({ form: `question${i}` })(Question));
};

export default question;
