import {React, Component} from 'react'
import nestedFormNew from '../../components/nestedFormScratch/nestedFormNew';

class validateForm extends Component {

    submit = values => {
        // print the form values to the console
        console.log(values);
    };
    render() {
        return <nestedFormNew onSubmit={this.submit} />
    }

}

export default validateForm