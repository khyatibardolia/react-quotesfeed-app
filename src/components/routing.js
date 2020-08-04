import React, { Component } from 'react';
import {Switch,Route,BrowserRouter, Link } from 'react-router-dom';
import FavoriteQuotesPage from '../components/favoriteQuotes/FavoriteQuotesPage';
import SearchQuotesPage from '../components/searchQuotes/SearchQuotesPage';
import QuoteOfTheDayPage from '../components/quoteOfTheDay/QuoteOfTheDayPage';
import QuotesCountInChart from '../components/QuotesCountInChart/QuotesCountInChart';
import validateForm from '../components/userReduxForms/validateForm';
import Header from '../components/header';

export class Routing extends Component {
    render(){
        return(
            <BrowserRouter>
                <Header/>
                    <nav className='menu'>
                        <ul>
                            <li><Link to='/' className='menu selected' exact={true}>QOD</Link></li>
                            <li><Link to='/search' className='menu selected'>SEARCH</Link></li>
                            <li><Link to='/favourites' className='menu selected'>FAV</Link></li>
                            <li><Link to='/chart' className='menu selected'>CHART</Link></li>
                            <li><Link to='/reduxform' className='menu selected'>REDUX-FORM</Link></li>
                            {/*<li><Link to='/form' className='menu selected'>REDUX FORM</Link></li>
                            <li><Link to='/nestedform' className='menu selected'>NESTED REDUX FORM</Link></li>
                            <li><Link to='/scratchform' className='menu selected'>SCRATCH FORM</Link></li>*/}
                        </ul>
                    </nav>
                    <Switch>
                        <Route path='/' component={QuoteOfTheDayPage} exact={true} />
                        <Route path='/favourites' component={FavoriteQuotesPage} />
                        <Route path='/search' component={SearchQuotesPage} />
                        <Route path='/chart' component={QuotesCountInChart} />
                        <Route path='/reduxform' component={validateForm} />
                       {/* <Route path='/form' component={ContactPage} />
                        <Route path='/nestedform' component={FieldArraysForm} />
                        <Route path='/scratchform' component={validateForm} />*/}
                    </Switch>
            </BrowserRouter>
        )
    }
}
export default Routing;