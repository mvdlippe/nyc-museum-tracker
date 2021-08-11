// React component to hold information about a museum
import React from 'react';

const MuseumCard = ({
  info
}) => {
  // Destructure the passed down info
  const { name, tel, url, adress1, address2, city, zip } = info;

  return (
    <article>
      <div>
        <h3>{name}</h3>
      </div>
      <ul>
        <li>Borough: {city === 'New York' ? 'Manhattan' : city}</li>
        <li>Address: {adress1}</li>
        <li>{address2}</li>
        <li>{zip}</li>
        <li><a href={url}>{url}</a></li>
        <li>Telephone: {tel}</li>
      </ul>
    </article>
  );
}

export default MuseumCard;
