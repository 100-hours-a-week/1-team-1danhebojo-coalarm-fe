import React from 'react';
import ReactDOM from 'react-dom';

function Tooltip({ children, visible, position }) {
  if (!visible || !position) return null;

  const { top, left } = position;

  const tooltipStyle = {
    position: 'fixed',
    top,
    left,
    width: '320px',
    backgroundColor: '#1a1f36',
    color: 'white',
    padding: '20px',
    borderRadius: '8px',
    zIndex: 9999,
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
    lineHeight: 1.7,
  };

  return ReactDOM.createPortal(
    <div style={tooltipStyle}>
      {children}
    </div>,
    document.body
  );
}

export default Tooltip;
