import React from 'react';
import './styles/RecurringBills.css';

function RecurringBills({ recurringBills, setRecurringBills }) {
  // Get total billing amount
  const getAmounts = (array) => {
    return parseFloat(array.amount);
  };
  const billingArray = recurringBills.map(getAmounts);
  const getBillSum = (accumulator, currentValue) => {
    return accumulator + currentValue;
  };

  const billSum = billingArray.reduce(getBillSum);

  return (
    <>
      <div className='billing-container'>
        <div className='summary'>
          <h1>Recurring Bills</h1>
          <div className='total'>
            <div className='billing-icon'></div>
            <div className='total-billing'>
              <p>Total Bills</p>
              <h1>${billSum}</h1>
            </div>
          </div>
          <div className='billing-summary'>
            <h2>Summary</h2>
          </div>
        </div>
        <div className='billing-table-section'>
          <table className='billing-table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Frequency</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {recurringBills.map((bill) => {
                return (
                  <tr key={bill.bill_name}>
                    <td>
                      <strong>{bill.bill_name}</strong>
                    </td>
                    <td>
                      <strong>{bill.amount}</strong>
                    </td>
                    <td>
                      <strong>{bill.frequency}</strong>
                    </td>
                    <td>
                      <strong>{bill.next_due_date}</strong>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default RecurringBills;
