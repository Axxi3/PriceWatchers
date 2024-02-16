/**
 * The `Cards` function is a React component that renders a card with an image, price, title, and a
 * button.
 * @returns The `Cards` component is returning a JSX element. It consists of a `div` container with a
 * fixed width of 300 pixels, rounded corners, and a border. Inside the container, there is an `img`
 * element displaying an image specified by the `props.img` prop. The image has a height of 200 pixels,
 * fills the width of the container, and has rounded corners.
 */


import Link from 'next/link';

import React from 'react';


export async function Cards(props) {

  const id=props.id
  // Function to limit title length to 100 characters
  const limitTitle = (title) => {
    if (title.length > 100) {
      return title.substring(0, 100) + "...";
    }
    return title;
  };

  return ( 


    <Link href={{pathname:`/product/${props.id}`,  query: { id:id },}} className='Product-card'>
    <div className="w-[300px] rounded-md border">
      <img
        src={props.img}
        alt="Laptop"
        className="h-[200px] w-full rounded-md object-cover"
      />
      <div className="p-4">
        <h1 className="text-lg font-semibold">{props.price}</h1>
        <p className="mt-3 text-sm text-gray-600">
          {limitTitle(props.title)}
        </p>
        <button
          type="button"
          className="mt-4 rounded-sm bg-black px-2.5 py-1 text-[15px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
         Check me out
        </button>
      </div>
    </div> 
    </Link>
  );
}
