import React, { useRef, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import './QueryEditor.css';

const QueryEditor = () => {
  const { 
    currentQuery, 
    setCurrentQuery, 
    executeQuery, 
    isLoading,
    darkMode,
    editorHeight,
    setEditorHeight
  } = useAppContext();
  
  const editorRef = useRef(null);
  const resizeRef = useRef(null);
  const textareaRef = useRef(null);
  const startYRef = useRef(null);
  const startHeightRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        executeQuery();
      }
      
      if (e.key === 'Tab' && e.target === textareaRef.current) {
        e.preventDefault();
        
        const start = textareaRef.current.selectionStart;
        const end = textareaRef.current.selectionEnd;
        
        const newText = currentQuery.substring(0, start) + '  ' + currentQuery.substring(end);
        setCurrentQuery(newText);
        
        setTimeout(() => {
          textareaRef.current.selectionStart = start + 2;
          textareaRef.current.selectionEnd = start + 2;
        }, 0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [executeQuery, currentQuery, setCurrentQuery]);

  useEffect(() => {
    const handleMouseDown = (e) => {
      e.preventDefault();
      startYRef.current = e.clientY;
      startHeightRef.current = editorHeight;
      
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };
    
    const handleMouseMove = (e) => {
      if (startYRef.current !== null) {
        const deltaY = e.clientY - startYRef.current;
        const newHeight = Math.max(100, startHeightRef.current + deltaY);
        setEditorHeight(newHeight);
      }
    };
    
    const handleMouseUp = () => {
      startYRef.current = null;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    const resizeHandle = resizeRef.current;
    if (resizeHandle) {
      resizeHandle.addEventListener('mousedown', handleMouseDown);
    }
    
    return () => {
      if (resizeHandle) {
        resizeHandle.removeEventListener('mousedown', handleMouseDown);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [editorHeight, setEditorHeight]);

  return (
    <div className="query-editor-container">
      <div className="editor-header">
        <h2>SQL Query Editor</h2>
        <div className="editor-actions">
          <button 
            className="clear-button" 
            onClick={() => setCurrentQuery('')}
          >
            Clear
          </button>
          <button 
            className="run-button" 
            onClick={executeQuery}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Running...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                Run Query
              </>
            )}
          </button>
        </div>
      </div>
      
      <div 
        className="editor-wrapper"
        style={{ height: `${editorHeight}px` }}
        ref={editorRef}
      >
        <textarea
          ref={textareaRef}
          value={currentQuery}
          onChange={(e) => setCurrentQuery(e.target.value)}
          className={`sql-textarea ${darkMode ? 'dark-theme' : 'light-theme'}`}
          spellCheck="false"
          placeholder="Enter your SQL query here..."
          style={{ height: `${editorHeight}px` }}
        />
      </div>
      
      
      <div className="keyboard-shortcuts">
        <span>Press <kbd>Ctrl</kbd>+<kbd>Enter</kbd> to run query</span>
      </div>
    </div>
  );
};

export default QueryEditor;
