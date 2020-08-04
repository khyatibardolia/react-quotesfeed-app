import React, {Component} from 'react';
import {searchQuotes} from "../../services/QuoteService";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {addToFavoriteQuotes} from "../../redux/actions/addToFavoriteQuotesActions";
import swal from "sweetalert";

class SearchQuotesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            currentPage: 1,
            quotesPerPage: 6,
        }
    }

    onFavorite = (body, author) => {
        this.props.addToFavoriteQuotes(body, author);
        swal("Favorite Quotes", "This quote has been added to favorites tab!");
    };

    onFilterChange = (e) => {
        this.setState({filterText: e.target.value});
    };

    onSearch = () => {
        this.props.searchQuotes(this.state.filterText);
        console.log('filterText-->>>', this.props.filteredQuotes);
    };

    handleClick(e) {
        console.log('e-->>>>>', e.target);
        this.setState({
            currentPage: e.target.id
        });
    }

    handlePrevious = () => {
        this.setState(prevState => ({
            currentPage: prevState.currentPage - 1
        }))
    };

    handleNext = () => {
        this.setState(prevState => ({
            currentPage: prevState.currentPage + 1
        }))
    };


    render() {
        const {currentPage, quotesPerPage} = this.state;
        const {filteredQuotes} = this.props;
        const indexOfLastQuote = currentPage * quotesPerPage;
        console.log('quotesPerPage',quotesPerPage);
        /*(1*6)=6*/
        const indexOfFirstQuote = indexOfLastQuote - quotesPerPage;
        /*(6-6)=0*/
        const currentQuotes = filteredQuotes && filteredQuotes.slice(indexOfFirstQuote, indexOfLastQuote);

        //page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(filteredQuotes && filteredQuotes.length / quotesPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <div className="container mt-5">
                <form>
                    <div className="input-group mb-3 col-md-6 mx-auto">
                        <input type="text" className="form-control" placeholder="Search Quotes..."
                               onChange={(e) => this.onFilterChange(e)}/>
                        <div className="input-group-append" style={{cursor: 'pointer'}} onClick={() => this.onSearch()}>
                            <span className="input-group-text">Search</span>
                        </div>
                    </div>
                </form>
                {
                    (currentQuotes && currentQuotes.length > 0) &&
                    <table id="table1" style={{width: '100%'}}>
                        <tbody>
                        <div className="flex-container mt-5 mx-5"
                             style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                            {currentQuotes && currentQuotes.map((item) => {
                                return (
                                    <tr key={item.id} style={{flexBasis: '33.33%'}}>
                                        <td>
                                            {<div class="card mr-3 mb-3">
                                                <div class="card-header card-title text-center p-2"
                                                     style={{
                                                         backgroundColor: '#FFFFFF',
                                                         boxShadow: '0 3px 6px rgba(0,0,0,.15)'
                                                     }}>
                                                    <i className="fa fa-quote-left mr-2" style={{color: '#cc85bc'}}/>
                                                    {item.body}
                                                    <i className="fa fa-quote-right ml-2" style={{color: '#cc85bc'}}/>
                                                    <p className="d-flex justify-content-end mt-2">--{item.author}</p>
                                                    <div style={{float: 'right', cursor: 'pointer'}} onClick={() => {
                                                        this.onFavorite(item.body, item.author)
                                                    }}>
                                                        <i className="fa fa-heart"
                                                           style={{color: '#FF6766', fontSize: '25px'}}
                                                           aria-hidden="true"/>
                                                    </div>
                                                </div>
                                            </div>
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </div>
                        </tbody>
                        <div className="container d-flex justify-content-center">
                            <ul className="pagination">
                                <li className="page-item" style={{cursor: currentPage !== 0 ? 'pointer' : 'not-allowed'}}>
                                    <button className="page-link" onClick={() => currentPage !== pageNumbers.length && this.handlePrevious()}>&laquo;</button>
                                </li>
                                {pageNumbers.map((number) => {
                                    return (
                                        <li key={number} id={number} style={{cursor: 'pointer'}} className="page-link"
                                            onClick={(e) => this.handleClick(e)}>{number}</li>)
                                })
                                }
                                <li className="page-item" style={{cursor: 'pointer'}}>
                                    <button className="page-link" onClick={() => this.handleNext()}>&raquo;</button>
                                </li>
                            </ul>
                        </div>
                    </table>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {filteredQuotes} = state.filteredQuotes;
    return {filteredQuotes};
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({searchQuotes, addToFavoriteQuotes}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchQuotesPage);