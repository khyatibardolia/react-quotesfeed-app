import React ,{Component} from 'react'
import {Field, reduxForm} from 'redux-form';
import {connect} from "react-redux";

class nestedFormNew extends Component {
    render() {
        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name</label>
                    <Field component="input" type="text" name="firstname"/>
                </div>
                <div>
                    <label>Last Name</label>
                    <Field component="input" type="text" name="lastname"/>
                </div>
                <div>
                    <label>Email</label>
                    <Field component="input" type="text" name="email"/>
                </div>
            </form>

        )
    }
}

export default connect(null,{})(reduxForm({
    form: 'userform'
}),nestedFormNew)