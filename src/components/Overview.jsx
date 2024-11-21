import React, { useState, useEffect } from 'react';
import './styles/Overview.css';

function Overview({ balance }) {
  return (
    <div id='overview'>
      <h1>Overview</h1>
      <div className='overview-head'>
        <div className='overview-bal'>
          <p>Current Balance</p>
          <h1>${balance.toFixed(2)}</h1>
        </div>
        <div className='overview-inc'>
          <p>Monthy Income</p>
          <h1>$2507.60</h1>
        </div>
        <div className='overview-exp'>
          <p>Monthly Expenses</p>
          <h1>$675.75</h1>
        </div>
      </div>
    </div>
  );
}

export default Overview;
