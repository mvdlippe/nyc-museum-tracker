// React component to hold information about a museum
import React from 'react';

const MuseumCard = ({ info }) => {
  // Destructure the passed down info
  const { name, tel, url, adress1, address2, city, zip } = info;

  function Address(info) {
    // If address2 exists, return both adress1 and address2; otherwise just return adress1
    if (address2) {
      return (
        <li>Address:
          <p>{adress1}</p>
          <p>{address2}</p>
        </li>
      );
    } else {
      return (
        <li>Address: 
          <p>{adress1}</p>
        </li>
      );
    }
  }

  function Zip(info) {
    // If the zipcode exists, return it in a li, otherwise return nothing.
    const zipInt = parseInt(zip);
    if (zipInt) {
      return <li>Zip: {zipInt}</li>;
    }
    return null;
  }

  return (
    <article>
      <div>
        <h3>{name}</h3>
      </div>
      <ul>
        <li>Borough: {city === 'New York' ? 'Manhattan' : city}</li>
        <Address />
        <Zip />
        <li><a href={url}>{url}</a></li>
        <li>Telephone: {tel}</li>
      </ul>
      <div>
        <button type="button" className="favButton" onClick={() => console.log('Fav clicked')}>&lt;3</button>
      </div>
    </article>
  );
}

export default MuseumCard;
