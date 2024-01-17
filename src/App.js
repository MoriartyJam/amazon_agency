import React, { useState, useEffect } from 'react'; 
import AccountsTable from './components/AccountsTable'; 
import ProfilesTable from './components/ProfilesTable'; 
 
const App = () => { 
  const [accounts, setAccounts] = useState([]); 
  const [selectedAccount, setSelectedAccount] = useState(null); 
 
  useEffect(() => { 
    // Fetch accounts data (replace this with your actual data fetching logic) 
    const fetchData = async () => { 
      // Example data structure, replace with your actual data 
      const mockAccounts = [ 
        { 
          accountId: 1, 
          email: 'example1@example.com', 
          authToken: 'token1', 
          creationDate: '2022-01-01', 
          profiles: [ 
            { 
              profileId: 11, 
              country: 'Country A', 
              marketplace: 'Marketplace A', 
              campaigns: [ 
                { campaignId: 111, clicks: 100, cost: 50, date: '2022-01-05' }, 
                { campaignId: 112, clicks: 150, cost: 75, date: '2022-01-10' }, 
                { campaignId: 111, clicks: 100, cost: 50, date: '2022-01-05' }, 
              ], 
            }, 
          ], 
        }, 
        { 
          accountId: 2, 
          email: 'example2@example.com', 
          authToken: 'token2', 
          creationDate: '2022-01-02', 
          profiles: [ 
            { 
              profileId: 12, 
              country: 'Country B', 
              marketplace: 'Marketplace B', 
              campaigns: [ 
                { campaignId: 112, clicks: 100, cost: 50, date: '2022-01-05' }, 
                { campaignId: 112, clicks: 151, cost: 71, date: '2022-01-10' }, 
              ], 
            }, 
          ], 
        }, 
        { 
          accountId: 3, 
          email: 'example3@example.com', 
          authToken: 'token2', 
          creationDate: '2022-01-03', 
          profiles: [ 
            { 
              profileId: 13, 
              country: 'Country C', 
              marketplace: 'Marketplace C', 
              campaigns: [ 
                { campaignId: 112, clicks: 100, cost: 50, date: '2022-01-05' }, 
              ], 
            }, 
          ], 
        }, 
        { 
          accountId: 4, 
          email: 'example4@example.com', 
          authToken: 'token2', 
          creationDate: '2022-01-04', 
          profiles: [ 
            { 
              profileId: 14, 
              country: 'Country A', 
              marketplace: 'Marketplace A', 
              campaigns: [ 
                { campaignId: 112, clicks: 100, cost: 50, date: '2022-01-05' }, 
                { campaignId: 112, clicks: 151, cost: 71, date: '2022-01-10' }, 
              ], 
            }, 
          ], 
        }, 
        { 
          accountId: 5, 
          email: 'example5@example.com', 
          authToken: 'token2', 
          creationDate: '2022-01-06', 
          profiles: [ 
            { 
              profileId: 15, 
              country: 'Country D', 
              marketplace: 'Marketplace D', 
              campaigns: [ 
                { campaignId: 112, clicks: 100, cost: 50, date: '2022-01-05' }, 
                { campaignId: 112, clicks: 151, cost: 71, date: '2022-01-10' }, 
                { campaignId: 112, clicks: 100, cost: 50, date: '2022-01-05' }, 
              ], 
            }, 
          ], 
        }, 

        // Add more accounts as needed 
      ]; 
 
      setAccounts(mockAccounts); 
    }; 
 
    fetchData(); 
  }, []); 
 
  const handleAccountClick = (account) => { 
    setSelectedAccount(account); 
  }; 
 
  return ( 
    <div className="container mt-4"> 
      <h1>Accounts Table</h1> 
      <AccountsTable accounts={accounts} onAccountClick={handleAccountClick} /> 
 
      {selectedAccount && ( 
        <> 
          <h2>Profiles of Selected Account</h2> 
          <ProfilesTable profiles={selectedAccount.profiles} /> 
        </> 
      )} 
    </div> 
  ); 
}; 
 
export default App;