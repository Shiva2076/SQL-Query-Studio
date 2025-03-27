import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockQueries, mockResults, mockQueryHistory } from '../../src/data/mockData';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [queries, setQueries] = useState(mockQueries);
  const [currentQueryId, setCurrentQueryId] = useState(mockQueries[0].id);
  const [currentQuery, setCurrentQuery] = useState(mockQueries[0].query);
  const [queryResults, setQueryResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [executionTime, setExecutionTime] = useState(null);
  const [queryHistory, setQueryHistory] = useState(mockQueryHistory);
  const [darkMode, setDarkMode] = useState(false);
  const [editorHeight, setEditorHeight] = useState(300);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  
  const currentQueryObject = queries.find(q => q.id === currentQueryId);

  useEffect(() => {
    const selectedQuery = queries.find(q => q.id === currentQueryId);
    if (selectedQuery) {
      setCurrentQuery(selectedQuery.query);
    }
  }, [currentQueryId, queries]);

  // Execute query function
  const executeQuery = () => {
    if (!currentQuery.trim()) return;
    
    setIsLoading(true);
    setError(null);
    const startTime = performance.now();
    
    try {
      // Simulate API call delay
      setTimeout(() => {
        const result = mockResults[currentQueryId] || mockResults.default;
        setQueryResults(result);
        setCurrentPage(1);
        
        const endTime = performance.now();
        setExecutionTime((endTime - startTime).toFixed(2));
        
        setQueryHistory(prev => [
          { id: `history-${Date.now()}`, query: currentQuery, timestamp: new Date().toISOString() },
          ...prev.slice(0, 9)
        ]);
        
        setIsLoading(false);
      }, 800); 
    } catch (err) {
      setError(err.message || 'Failed to execute query');
      setIsLoading(false);
    }
  };

  const saveQuery = (name) => {
    const newQuery = {
      id: `query-${Date.now()}`,
      name,
      query: currentQuery
    };
    setQueries([...queries, newQuery]);
    return newQuery.id;
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const exportToCSV = () => {
    if (!queryResults || !queryResults.rows.length) {
      return;
    }

    const columns = queryResults.columns;
    const rows = queryResults.rows;

    let csvContent = columns.join(',') + '\n';

    rows.forEach(row => {
      const rowValues = columns.map(col => {
        const value = row[col];
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        return value;
      });
      csvContent += rowValues.join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `query-results-${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const contextValue = {
    queries,
    setQueries,
    currentQueryId,
    setCurrentQueryId,
    currentQuery,
    setCurrentQuery,
    queryResults,
    isLoading,
    executionTime,
    executeQuery,
    queryHistory,
    setQueryHistory,
    saveQuery,
    darkMode,
    toggleDarkMode,
    currentQueryObject,
    editorHeight,
    setEditorHeight,
    exportToCSV,
    resultsPerPage,
    setResultsPerPage,
    currentPage,
    setCurrentPage,
    error
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;