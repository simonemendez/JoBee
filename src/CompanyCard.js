import React from "react";
import { Link } from "react-router-dom";
import "./CompanyCard.css";


/**  Shows name, description and logo of company
 * 
 *   Prop:
 *   - company: object representing the company, like
 *     { handle, name, description, numEmployees, logoUrl, jobs }
 *     where jobs is [{ id, title, salary, equity }, ...]
 * 
 *   App -> Routes -> CompanyList -> CompanyCard
*/

function CompanyCard({ company }) {

  const { name, description, logoUrl, handle } = company;
  
  // Use a solid color placeholder if image fails to load
  const handleImageError = (e) => {
    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="150" height="150"%3E%3Crect fill="%23e0e0e0" width="150" height="150"/%3E%3Ctext x="50%25" y="50%25" font-size="12" fill="%23666" text-anchor="middle" dy=".3em"%3ELogo%3C/text%3E%3C/svg%3E';
  };

  return (
      <Link className="CompanyCard card" to={`companies/${handle}`}>
        <div className="card-body">
          <h5 className="card-title">
            <div>{name}</div>
            <div>
              {logoUrl && (
                <img 
                  src={logoUrl}
                  alt={`${name} logo`}
                  className="float-right ml-5"
                  onError={handleImageError}
                  style={{ width: "80px", height: "80px", objectFit: "contain" }}
                />
              )}
            </div>
          </h5>
          <p><small>{description}</small></p>
        </div>
      </Link>
  )
}

export default CompanyCard;