import React from "react";
import Gist from "super-react-gist";

const GistsCard = ({ gists }) => {
  function toDate(dateStr) {
    var parts = dateStr.slice(0, 10).split("-");
    return "Created at: " + parts[2] + "/" + parts[1] + "/" + parts[0];
  }
  return (
    <div id="repos">
      <h1>Public Gists</h1>
      {gists.map((gist, index) => (
        <div className="gist" key={index}>
          <p>
            <b>
              <a 
              style={{ textDecoration: 'none', color: 'white', display: 'block', width: '100%', textAlign: 'center', fontWeight: 'bold' }} 
              href={gist.html_url}>{gist.html_url}</a>
            </b>
          </p>

          <p
          style={{ textDecoration: 'none', color: 'lightgray', display: 'block', width: '100%', textAlign: 'center' }} 
          >{gist.description}</p>
          <p
          style={{ textDecoration: 'none', color: 'lightgray', display: 'block', width: '100%', textAlign: 'center' }} 
          >{toDate(gist.created_at)}</p>

          <div>
            <Gist url={gist.html_url} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default GistsCard;
