import { IconButton } from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";

const IconLink = ({ href, defaultIcon, hoverIcon, onClick }) => {
  const [isOver, setIsOver] = useState(false);
  const handleMouseEnter = () => {
    setIsOver(true);
  };

  const handleMouseLeave = () => {
    setIsOver(false);
  };
  return (
    <Link href={href}>
      <IconButton
        icon={isOver ? hoverIcon : defaultIcon}
        onMouseEnter={handleMouseEnter}
        onTouchStart={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchEnd={handleMouseLeave}
        onClick={onClick}
      />
    </Link>
  );
};

export default IconLink;
