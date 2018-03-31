import React from 'react';
import { Form } from 'semantic-ui-react';

export default class Input extends React.Component {
  render() {
    const {
      input,
      meta: { touched, error, asyncValidating },
      as: As = Form.Input,
      ...custom
    } = this.props;

    return (
      <Form.Field>
        <As
          {...custom}
          {...input}
          error={(touched && !!error) || custom.error}
          loading={asyncValidating}
          onChange={(param, { value }) => input.onChange(value)}
        />
        {(touched && !!error) && <div className="errorLabel">{error}</div>}
      </Form.Field>
    );
  }
}