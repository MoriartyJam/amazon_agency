import React, { useState } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
 
const CampaignsTable = ({ campaigns }) => { 
  const [currentPage, setCurrentPage] = useState(1); 
  const [filter, setFilter] = useState(''); 
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' }); 
  const campaignsPerPage = 3; // You can adjust the number of campaigns per page 
 
  const handleFilterChange = (e) => { 
    setFilter(e.target.value); 
    setCurrentPage(1); // Reset to the first page when the filter changes 
  }; 
 
  const handleSort = (key) => { 
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'; 
    setSortConfig({ key, direction }); 
  }; 
 
  const indexOfLastCampaign = currentPage * campaignsPerPage; 
  const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage; 
 
 
const filteredCampaigns = campaigns.filter((campaign) => { 
  const campaignIdString = campaign.campaignId.toString().toLowerCase(); 
  const clicksString = campaign.clicks.toString(); 
  const costString = campaign.cost.toString(); 
  const dateString = campaign.date.toString().toLowerCase(); 
 
  return ( 
    campaignIdString.includes(filter.toLowerCase()) || 
    clicksString.includes(filter) || 
    costString.includes(filter) || 
    dateString.includes(filter.toLowerCase()) 
  ); 
});


const sortedCampaigns = [...filteredCampaigns].sort((a, b) => { 
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
const currentCampaigns = sortedCampaigns.slice(indexOfFirstCampaign, indexOfLastCampaign); 
 
 
  const paginate = (pageNumber) => setCurrentPage(pageNumber); 
 
  return ( 
    <div> 
      <div> 
        <input 
          type="text" 
          placeholder="Filter by Campaign ID, Clicks, Cost, or Date" 
          value={filter} 
          onChange={handleFilterChange} 
        /> 
      </div> 
 
      <table className="table"> 
        <thead> 
          <tr> 
            <th> 
              <button onClick={() => handleSort('campaignId')}>Campaign ID</button> 
            </th> 
            <th> 
              <button onClick={() => handleSort('clicks')}>Clicks</button> 
            </th> 
            <th> 
              <button onClick={() => handleSort('cost')}>Cost</button> 
            </th> 
            <th> 
              <button onClick={() => handleSort('date')}>Date</button> 
            </th> 
          </tr> 
        </thead> 
        <tbody> 
          {currentCampaigns.map((campaign) => ( 
            <tr key={campaign.campaignId}> 
              <td>{campaign.campaignId}</td> 
              <td>{campaign.clicks}</td> 
              <td>{campaign.cost}</td> 
              <td>{campaign.date}</td> 
            </tr> 
          ))} 
        </tbody> 
      </table> 
 
      <ul className="pagination"> 
        {Array.from({ length: Math.ceil(filteredCampaigns.length / campaignsPerPage) }).map((_, index) => ( 
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
 
export default CampaignsTable;