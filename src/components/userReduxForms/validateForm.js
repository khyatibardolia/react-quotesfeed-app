import React, {Component} from 'react';
import SignUpReduxForm from '../../components/userReduxForms/signUpReduxForm'

class validateForm extends Component {

    submit = (values) => {
        console.log('values are-->>', values);
    };

    render(){
        return(
            <SignUpReduxForm onSubmit={this.submit}/>
        )
    }
}
export default validateForm;