import React, {Component} from 'react';
import {fetchQuoteOfTheDay} from '../../services/QuoteService';
import {addToFavoriteQuotes} from '../../actions/addToFavoriteQuotesActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import swal from 'sweetalert';

class QuoteOfTheDayPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };
    }

    static propTypes = {
        fetchQuoteOfTheDay: PropTypes.func,
        quote: PropTypes.object,
        addToFavoriteQuotes: PropTypes.func
    };

    componentDidMount() {
        this.props.fetchQuoteOfTheDay();
    }

    onRefresh = () => {
        this.setState({isLoading: true});
        setTimeout(() => {
            this.setState({isLoading: false});
            this.props.fetchQuoteOfTheDay();
        }, 500);
    };
    onFavorite = () => {
        this.props.addToFavoriteQuotes(this.props.quote.body, this.props.quote.author);
        swal("Favorite Quotes", "Quote has been added to favorites tab!");
    };

    render() {
        console.log('<<<<--quoteRender-->>>>', this.props.quote && this.props.quote.body);
        const {quote} = this.props;
        return (
            <div className="vertical-center">
                <div className="container mt-4">
                    {!this.state.isLoading ? <div>
                            <div className="row">
                                <div className="col-lg-12 d-flex justify-content-center">
                                    <i className="fa fa-quote-left" style={{color: '#cc85bc'}}/>
                                    <div className="col-lg-6 p-0">
                                        <div style={{color: '#686868', fontSize: '22px'}}>{quote && quote.body}</div>
                                    </div>
                                    <i className="fa fa-quote-right" style={{color: '#cc85bc'}}/>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-lg-12 d-flex justify-content-center">
                                    <div className="col-lg-6">
                                        <h3 style={{color: '#cc85bc'}}>--{quote && quote.author}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <span className="mr-3" style={{cursor: 'pointer'}} onClick={this.onRefresh}>
                                    <i className="fa fa-refresh" style={{fontSize: '30px', color: '#FF6766'}}/></span>
                                <span style={{cursor: 'pointer'}} onClick={this.onFavorite}>
                                    <i className="fa fa-heart" style={{
                                    fontSize: '30px',
                                    color: '#FF6766'
                                }}/></span>
                            </div>
                        </div>
                        :
                        <div>
                            <i className="fa fa-spinner fa-spin" style={{fontSize: '24px'}}/>
                        </div>
                    }

                </div>


            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('state--->>', state);
    const {quote} = state.quoteOfTheDay;
    return {quote};
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({fetchQuoteOfTheDay, addToFavoriteQuotes}, dispatch);
    /* return {
         getQuote: (quote) => {
             return dispatch({
                 type: FETCH_QUOTE_OF_THE_DAY,
                 payload: quote,
             })
         },
     }*/
};
export default connect(mapStateToProps, mapDispatchToProps)(QuoteOfTheDayPage);