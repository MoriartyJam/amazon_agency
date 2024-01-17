import React, { useState } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
 
const AccountsTable = ({ accounts, onAccountClick }) => { 
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' }); 
  const [filter, setFilter] = useState(''); 
  const [currentPage, setCurrentPage] = useState(1); 
  const accountsPerPage = 3; 
 
  const handleSort = (key) => { 
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'; 
    setSortConfig({ key, direction }); 
  }; 
 
  const handleFilter = () => { 
    setCurrentPage(1); 
  }; 
 
  const filteredAccounts = accounts.filter((account) => 
    account.email.toLowerCase().includes(filter.toLowerCase()) 
  ); 
 
  const sortedAccounts = [...filteredAccounts].sort((a, b) => { 
    if (sortConfig.key !== null) { 
      if (a[sortConfig.key] < b[sortConfig.key]) { 
        return sortConfig.direction === 'asc' ? -1 : 1; 
      } 
      if (a[sortConfig.key] > b[sortConfig.key]) { 
        return sortConfig.direction === 'asc' ? 1 : -1; 
      } 
    } 
    return 0; 
  }); 
 
  const indexOfLastAccount = currentPage * accountsPerPage; 
  const indexOfFirstAccount = indexOfLastAccount - accountsPerPage; 
  const currentAccounts = sortedAccounts.slice(indexOfFirstAccount, indexOfLastAccount); 
 
  const paginate = (pageNumber) => setCurrentPage(pageNumber); 
 
  return ( 
    <div> 
      <div> 
        <input 
          type="text" 
          placeholder="Filter by Email" 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)} 
        /> 
        <button onClick={handleFilter}>Filter</button> 
      </div> 
 
      <table className="table"> 
        <thead> 
          <tr> 
            <th> 
              <button onClick={() => handleSort('accountId')}>Account ID</button> 
            </th> 
            <th> 
              <button onClick={() => handleSort('email')}>Email</button> 
            </th> 
            <th> 
              <button onClick={() => handleSort('authToken')}>Auth Token</button> 
            </th> 
            <th> 
              <button onClick={() => handleSort('creationDate')}>Creation Date</button> 
            </th> 
          </tr> 
        </thead> 
        <tbody> 
          {currentAccounts.map((account) => ( 
            <tr key={account.accountId} onClick={() => onAccountClick(account)}> 
              <td>{account.accountId}</td> 
              <td>{account.email}</td> 
              <td>{account.authToken}</td> 
              <td>{account.creationDate}</td> 
            </tr> 
          ))} 
        </tbody> 
      </table> 
 
      <ul className="pagination"> 
        {Array.from({ length: Math.ceil(sortedAccounts.length / accountsPerPage) }).map((_, index) => ( 
          <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}> 
            <button className="page-link" onClick={() => paginate(index + 1)}> 
              {index + 1} 
            </button> 
          </li> 
        ))} 
      </ul> 
    </div> 
  ); 
}; 
 
export default AccountsTable;