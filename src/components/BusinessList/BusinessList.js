import React from 'react';
import './BusinessList.css';
import Business from '../Business/Business';

class BusinessList extends React.Component {
    render() {
        return (
            <div className="BusinessList">
                {this.props.businesses.map(business => {
                    return <Business key={business.id} business={business}/>;
                })}
            </div>
        )   // the 'key' above allows React to know the correct order to render each business. React uses keys as a way to number/label list items.
    }
};

export default BusinessList;