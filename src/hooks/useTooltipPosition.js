import { useState } from 'react';

function useTooltipPosition(offset = { x: -320, y: 25 }) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState(null);

  const onMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      top: rect.top + offset.y,
      left: rect.right + offset.x,
    });
    setVisible(true);
  };

  const onMouseLeave = () => {
    setVisible(false);
    setPosition(null);
  };

  return {
    visible,
    position,
    onMouseEnter,
    onMouseLeave,
  };
}

export default useTooltipPosition;