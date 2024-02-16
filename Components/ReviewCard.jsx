"use client"
import React, { useState } from 'react';

export default function ReviewCard(props) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };  



  if(setExpanded){ 
    setTimeout(() => {
      setExpanded(false);
    }, 4000);
  }

  const limitTitle = (title) => {
    if (title.length > 100 && !expanded) {
      return title.substring(0, 100) + '...';
    }
    return title;
  };

  return (
    <div
      className={`md:w-[30%] w-[100%] p-6 bg-white-200 rounded-[30px] hover:bg-[#a86b67] reviewCard hover:cursor-pointer ${
        expanded ? 'h-auto' : 'h-[fit-content]'
      }`}
      onClick={toggleExpanded}
    >
      <p className="text-[20px] font-semibold mb-3">{props.reviewers} says</p>
      <p>{limitTitle(props.review)}</p>
    </div>
  );
}
