import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import './QuerySelector.css';

const QuerySelector = () => {
  const { 
    queries = [], 
    currentQueryId, 
    setCurrentQueryId, 
    queryHistory = [], 
    currentQuery,
    setCurrentQuery,
    saveQuery
  } = useAppContext();
  
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [newQueryName, setNewQueryName] = useState('');

const handleQueryChange = (e) => {
  const selectedQueryId = e.target.value;
  setCurrentQueryId(selectedQueryId);
  
  const selectedQuery = queries.find(query => query.id === selectedQueryId);
  if (selectedQuery) {
    setCurrentQuery(selectedQuery.query);
  }
};
  const handleHistorySelect = (query) => {
    setCurrentQuery(query.query);
    setIsHistoryOpen(false);
  };

  const handleSaveQuery = (e) => {
    e.preventDefault();
    if (newQueryName.trim()) {
      saveQuery(newQueryName.trim());
      setNewQueryName('');
      setIsSaveDialogOpen(false);
    }
  };

  return (
    <div className="query-selector">
      <div className="selector-row">
        <div className="selector-group">
          <label htmlFor="query-select">Select Query:</label>
          <select 
            id="query-select" 
            value={currentQueryId || ''} 
            onChange={handleQueryChange}
            className="query-dropdown"
          >
            {queries.map((query) => (
              <option key={query.id} value={query.id}>
                {query.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="selector-actions">
          <button 
            type="button" 
            onClick={() => setIsHistoryOpen(!isHistoryOpen)}
            className="history-button"
          >
            History
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </button>
          
          <button 
            type="button" 
            onClick={() => setIsSaveDialogOpen(true)}
            className="save-button"
          >
            Save Query
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Query History Dropdown */}
      {isHistoryOpen && queryHistory.length > 0 && (
        <div className="history-dropdown">
          <h3>Recent Queries</h3>
          <ul>
            {queryHistory.map((item) => (
              <li key={item.id} onClick={() => handleHistorySelect(item)}>
                <div className="history-item">
                  <div className="history-query">{item.query.substring(0, 50)}...</div>
                  <div className="history-time">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {isSaveDialogOpen && (
        <div className="save-dialog">
          <form onSubmit={handleSaveQuery}>
            <h3>Save Query</h3>
            <div className="save-dialog-content">
              <label htmlFor="query-name">Query Name:</label>
              <input
                type="text"
                id="query-name"
                value={newQueryName}
                onChange={(e) => setNewQueryName(e.target.value)}
                placeholder="My Custom Query"
                required
              />
            </div>
            <div className="save-dialog-actions">
              <button 
                type="button" 
                onClick={() => setIsSaveDialogOpen(false)}
                className="cancel-button"
              >
                Cancel
              </button>
              <button type="submit" className="confirm-button">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default QuerySelector;