import React, { useState } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import CampaignsTable from './CampaignsTable'; 
 
const ProfilesTable = ({ profiles }) => { 
  const [selectedProfile, setSelectedProfile] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [filter, setFilter] = useState(''); 
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' }); 
  const profilesPerPage = 3; 
 
  const handleProfileClick = (profile) => { 
    setSelectedProfile(profile); 
  }; 
 
  const handleFilterChange = (e) => { 
    setFilter(e.target.value); 
    setCurrentPage(1); // Reset to the first page when the filter changes 
  }; 
 
  const handleSort = (key) => { 
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'; 
    setSortConfig({ key, direction }); 
  }; 
 
  const indexOfLastProfile = currentPage * profilesPerPage; 
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage; 
 
  const filteredProfiles = profiles.filter((profile) => 
    profile.country.toLowerCase().includes(filter.toLowerCase()) || 
    profile.marketplace.toLowerCase().includes(filter.toLowerCase()) 
  ); 
 
  const sortedProfiles = [...filteredProfiles].sort((a, b) => { 
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
 
  const currentProfiles = sortedProfiles.slice(indexOfFirstProfile, indexOfLastProfile); 
 
  const paginate = (pageNumber) => setCurrentPage(pageNumber); 
 
  return ( 
    <div> 
      <div> 
        <input 
          type="text" 
          placeholder="Filter by Country or Marketplace" 
          value={filter} 
          onChange={handleFilterChange} 
        /> 
      </div> 
 
      <table className="table"> 
        <thead> 
          <tr> 
            <th> 
              <button onClick={() => handleSort('profileId')}>Profile ID</button> 
            </th> 
            <th> 
              <button onClick={() => handleSort('country')}>Country</button> 
            </th> 
            <th> 
              <button onClick={() => handleSort('marketplace')}>Marketplace</button> 
            </th> 
          </tr> 
        </thead> 
        <tbody> 
          {currentProfiles.map((profile) => ( 
            <tr key={profile.profileId} onClick={() => handleProfileClick(profile)}> 
              <td>{profile.profileId}</td> 
              <td>{profile.country}</td> 
              <td>{profile.marketplace}</td> 
            </tr> 
          ))} 
        </tbody> 
      </table> 
 
      <ul className="pagination"> 
        {Array.from({ length: Math.ceil(sortedProfiles.length / profilesPerPage) }).map((_, index) => ( 
          <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}> 
            <button className="page-link" onClick={() => paginate(index + 1)}> 
              {index + 1} 
            </button> 
          </li> 
        ))} 
      </ul> 
 
      {selectedProfile && ( 
        <div> 
          <h2>Campaigns of Selected Profile</h2> 
          <CampaignsTable campaigns={selectedProfile.campaigns} /> 
        </div> 
      )} 
    </div> 
  ); 
}; 
 
export default ProfilesTable;