'use strict';
import React from 'react';
import './BusinessList.css';
import Business from '../Business/Business.js';

class BusinessList extends React.Component {
  render() {
    return (
      <div className="BusinessList" >
      {
        this.props.businesses.map(function(business, i) {
          return <Business key={business.id} business={business} />;
        })
      }
      </div>
    );
  }
}

export default BusinessList;
