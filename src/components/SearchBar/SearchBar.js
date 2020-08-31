import React from 'react';
import './SearchBar.css';


class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            term: '',
            location: '',
            sortBy: 'best_match'
        };

        this.sortByOptions = {
            'Best Match': 'best_match',
            'Highest Rated': 'rating',
            'Most Reviewed': 'review_count'
        };

        this.handleTermChange = this.handleTermChange.bind(this); // these methods are now BOUND to this object, the SearchBar object
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchKeydown = this.handleSearchKeydown.bind(this); // so now, the keyword 'this' inside of these methods when called will always refer to SearchBar object
    }   // these methods will now ALWAYS operate relative to SearchBar, no matter where they're called from
    // so, below, inside handleTermChange, this.setState will ALWAYS refer to SearchBar object.

    handleTermChange(event) {       // this and the next method use 'this' so we need to bind them, as above
        this.setState({
            term: event.target.value
        });
    }

    handleLocationChange(event) {
        this.setState({
            location: event.target.value
        });
    }

    handleSearch(event) {
        this.props.searchBar(this.state.term, this.state.location, this.state.sortBy);
        event.preventDefault();
    }

    handleSearchKeydown(event) {   // this triggers by pressing the Enter key
        if (event.keyCode === 13) {
            this.handleSearch(event);
        }
    }

    handleSortByChange(sortByOption) {   // this method will set the state of a sorting option, communicating with Yelp API
        this.setState({
            sortBy: sortByOption
        }, () => {
            this.props.searchBar(this.state.term, this.state.location, this.state.sortBy);
        });     // this second argument means you can choose a different sort option without manually clicking "Let's go" again
    }    

    getSortByClass(sortByOption) {      // returns the current CSS class for a sorting option, for visual feedback for users.
        if (sortByOption === this.state.sortBy) {
            return 'active'
        } else {
            return '';
        }
    }

    renderSortByOptions() {
        return Object.keys(this.sortByOptions).map(sortByOption => {
            let sortByOptionValue = this.sortByOptions[sortByOption];
            return <li key={sortByOptionValue} className={this.getSortByClass(sortByOptionValue)} onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>{sortByOption}</li>
        });
    }

    render() {
        return (
            <div className="SearchBar">
            <div className="SearchBar-sort-options">
                <ul>
                    {this.renderSortByOptions()}
                </ul>
            </div>
            <div className="SearchBar-fields">
                <input placeholder="Search Businesses" onChange={this.handleTermChange} onKeyDown={this.handleSearchKeydown} />
                <input placeholder="Where?" onChange={this.handleLocationChange} onKeyDown={this.handleSearchKeydown} />
            </div>
            <div className="SearchBar-submit">
                <a href="www.#.com" onClick={this.handleSearch}>Let's Go</a>
            </div>
            </div>
        )
    }
};

export default SearchBar;