"use client";

import Squares from "./Squares";

const ContactsSection = () => {
  return (
    <div className="h-screen w-full">
      <Squares
        speed={0.5}
        squareSize={40}
        direction="diagonal" // up, down, left, right, diagonal
        borderColor="#314158"
        // hoverFillColor="#222"
      />
    </div>
  );
};

export default ContactsSection;
