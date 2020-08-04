import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';


class SignUpReduxForm extends Component {

    renderField = ({input, label, type, meta: {touched, error}}) => {

        return (
            <div>
                <label>{label}</label>
                <div>
                    {(type === 'radio') ? <input className="radio" type={type} {...input}/> :
                        <input className="form-control" type={type} placeholder={label} {...input}/>}
                    {touched && error && <span style={{color: 'red'}}>{error}</span>}

                </div>
            </div>
        )
    };


    render() {
        const {handleSubmit, pristine, reset, submitting} = this.props;
        return (
            <div className="row">
                <div className="col-md-12 mt-5">
                    <div className=" col-md-5 m-auto">
                        <div className="card">
                            <div className="card-header">
                                <h3>Sign Up</h3>
                            </div>
                            <div className="card-body">
                                <form name="loginForm" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <input type="hidden" className="form-control" name="usrid"/>
                                    </div>
                                    <div className="form-group">
                                        <Field type="email" name="email"
                                               label="Email Id" component={this.renderField}/>
                                    </div>
                                    <div className="form-group">
                                        <Field type="text" label="User Name" component={this.renderField}
                                               name="username"/>
                                    </div>
                                    <div className="radio">
                                        <label className="radio-inline"><Field type="radio" label="Gender" value="male"
                                                                               component={this.renderField}
                                                                               name="gender" checked/>Male</label>
                                        <label className="radio-inline"><Field type="radio" value="female"
                                                                               component={this.renderField}
                                                                               name="gender"/>Female</label>
                                    </div>
                                    <div className="form-group">
                                        <Field type="number" label="Phone Number" component={this.renderField}
                                               name="phone"/>
                                    </div>
                                    <div className="form-group">
                                        <Field type="password" label="Password" component={this.renderField}
                                               name="password"/>
                                    </div>
                                    <div className="form-group">
                                        <Field type="password" label="Confirm Password" component={this.renderField}
                                               name="confirmpassword"/>
                                    </div>
                                    <button type="submit" className="btn btn-primary mr-3" disabled={submitting}>
                                        Sign Up
                                    </button>
                                    <button type="button" className="btn btn-primary" disabled={pristine || submitting}
                                            onClick={reset}>
                                        Reset
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
};
const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Email is Required'
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email = 'Email address is invalid'
    }
    if(!values.username){
        errors.username = "Username is Required"
    }
    if(!values.phone){
        errors.phone = "Phone Number is Required"
    } else if(!/^(0|[1-9][0-9]{9})$/i.test(values.phone)){
        errors.phone = "Please enter 10 digits"
    }
    if(!values.password){
        errors.password = "Password is Required"
    }
    if(!values.confirmpassword){
        errors.confirmpassword = "Please Confirm Your Password"
    } else if(values.password !== values.confirmpassword){
        errors.confirmpassword = "Password do not match"
    }
    return errors
};

export default reduxForm({
    validate,
    form: 'example'
})(SignUpReduxForm);

