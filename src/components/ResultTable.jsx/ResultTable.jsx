import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import './ResultsTable.css';

const ResultsTable = () => {
  const { 
    queryResults, 
    executionTime,
    exportToCSV,
    resultsPerPage,
    setResultsPerPage,
    currentPage,
    setCurrentPage
  } = useAppContext();
  
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc'
  });
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    setSortConfig({ key: null, direction: 'asc' });
    setSearchTerm('');
    if (typeof setCurrentPage === 'function') {
      setCurrentPage(1);
    }
  }, [queryResults, setCurrentPage]);
  
  if (!queryResults) {
    return (
      <div className="results-empty">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <h2>No Results</h2>
        <p>Run a query to see the results here</p>
      </div>
    );
  }
  
  const { columns, rows } = queryResults;
  
  // Sort function
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  // Apply sorting and filtering
  let sortedRows = [...rows];
  
  // Apply search filter
  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase();
    sortedRows = sortedRows.filter(row => 
      Object.values(row).some(value => 
        value && value.toString().toLowerCase().includes(term)
      )
    );
  }
  
  // Apply sorting
  if (sortConfig.key) {
    sortedRows.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
  
  const totalRows = sortedRows.length;
  const totalPages = Math.ceil(totalRows / resultsPerPage);
  
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  
  const paginatedRows = sortedRows.slice(startIndex, endIndex);
  
  // Handle page changes
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages && typeof setCurrentPage === 'function') {
      setCurrentPage(newPage);
    }
  };
  
  // Handle page size change
  const handlePerPageChange = (e) => {
    if (typeof setResultsPerPage === 'function') {
      setResultsPerPage(Number(e.target.value));
      if (typeof setCurrentPage === 'function') {
        setCurrentPage(1); 
      }
    }
  };
  
  return (
    <div className="results-container">
      <div className="results-header">
        <div className="results-info">
          <h2>Query Results</h2>
        </div>
        
        <div className="results-actions">
          <div className="search-box">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search results..."
              className="search-input"
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="search-icon">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          
          <button 
            className="export-button"
            onClick={exportToCSV}
            disabled={!rows.length}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Export CSV
          </button>
        </div>
      </div>
      
      <div className="table-wrapper">
        <table className="results-table">
          <thead>
            <tr>
              {columns.map(column => (
                <th 
                  key={column}
                  onClick={() => requestSort(column)}
                  className={sortConfig.key === column ? `sorted-${sortConfig.direction}` : ''}
                >
                  {column}
                  <span className="sort-indicator">
                    {sortConfig.key === column && (
                      sortConfig.direction === 'asc' ? '▲' : '▼'
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map(column => (
                    <td key={`${rowIndex}-${column}`}>
                      {formatCellValue(row[column])}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="no-results">
                  No matching results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="pagination">
        <div className="pagination-info">
          Showing {startIndex + 1} to {Math.min(endIndex, totalRows)} of {totalRows} results
        </div>
        
        <div className="pagination-controls">
          <select
            value={resultsPerPage}
            onChange={handlePerPageChange}
            className="per-page-select"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
            <option value={100}>100 per page</option>
          </select>
          
          <div className="pagination-buttons">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              &laquo;
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              &lsaquo;
            </button>
            
            <span className="page-indicator">
              Page {currentPage} of {totalPages || 1}
            </span>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="pagination-button"
            >
              &rsaquo;
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="pagination-button"
            >
              &raquo;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to format cell values
const formatCellValue = (value) => {
  if (value === null || value === undefined) {
    return 'NULL';
  }
  
  if (typeof value === 'number') {
    // Format numbers with commas and 2 decimal places for currency-like values
    if (Number.isInteger(value) || Math.abs(value) >= 1000) {
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      });
    }
    // For small decimal numbers, show up to 2 decimal places
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  }
  
  return value.toString();
};

export default ResultsTable;