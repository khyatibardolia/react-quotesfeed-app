import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {fetchFavoriteQuotes} from '../../services/QuoteService'
import {removeFavoriteQuote} from '../../actions/deleteFavoriteQuotesAction'
import {ToastsContainer, ToastsStore,ToastsContainerPosition} from 'react-toasts';

class FavoriteQuotesPage extends Component {

    componentDidMount() {
        this.props.fetchFavoriteQuotes();
    }

    onDeleteQuote = (id) => {
        console.log('delete called', id);
        this.props.removeFavoriteQuote(id);
        //react-toasts library
        ToastsStore.success("Quote has been deleted from favorites tab!");
        this.props.fetchFavoriteQuotes();

    };

    render() {
        const {favorites} = this.props;
        console.log('favorites-->>>>', this.props.favorites);
        return (
            <div className="flex-container mt-5 mx-5"
                 style={{display: 'flex', flexWrap: 'wrap'}}>
                {favorites && favorites.map((item) => {
                    return (
                        <div key={item.id} style={{flexBasis: '33.33%'}}>
                            {<div className="card mr-3 mb-3">
                                <div className="card-header card-title text-center p-2"
                                     style={{backgroundColor: '#FFFFFF', boxShadow: '0 3px 6px rgba(0,0,0,.15)'}}>
                                    <i className="fa fa-quote-left mr-2" style={{color: '#cc85bc'}}/>
                                    {item.value.body}
                                    <i className="fa fa-quote-right ml-2" style={{color: '#cc85bc'}}/>
                                    <p className="d-flex justify-content-end mt-2">--{item.value.author}</p>
                                    <div style={{float: 'right', cursor: 'pointer'}}
                                         onClick={() => {
                                             this.onDeleteQuote(item.id)
                                         }}>
                                        <i className="fa fa-trash" aria-hidden="true"/>
                                    </div>
                                    <ToastsContainer position={ToastsContainerPosition.BOTTOM_CENTER} store={ToastsStore}/>
                                </div>
                            </div>}
                        </div>
                    )
                })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('state--->>', state);
    const {favorites} = state.favorites;
    return {favorites};
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({fetchFavoriteQuotes, removeFavoriteQuote}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(FavoriteQuotesPage);