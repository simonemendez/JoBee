import React, { useContext } from "react";
import "./JobCard.css";
import formatSalary from "./utilities/formatSalary.js"
import UserContext from "./UserContext";

/**  Shows title, salary and equity for a job
 * 
 *   Prop:
 *   - job: object representing the job, like
 *     { id, title, salary, equity, companyHandle, companyName }
 * 
 *   App -> Routes -> JobList -> [JobCard, ...]
*/
function JobCard({ job }) {
  const { id, title, salary, equity } = job;
  const { currentUser, setCurrentUser } = useContext(UserContext);
  
  function handleApply() {
    // Add job to applications if not already there
    if (!currentUser || !currentUser.applications) {
      console.error("User not logged in or applications not initialized");
      return;
    }
    
    if (!currentUser.applications.includes(id)) {
      const updatedApplications = [...currentUser.applications, id];
      const updatedUser = {
        ...currentUser,
        applications: updatedApplications
      };
      setCurrentUser(updatedUser);
    }
  }

  // Safe check for applications array
  const hasApplied = currentUser && currentUser.applications && currentUser.applications.includes(id);

  return (
    <div className="JobCard card">
      <div className="card-body">
        <h5 className="card-title"><b>{title}</b></h5>
        <p>{salary && <small>Salary: {formatSalary(salary)}</small>}</p>
        {typeof (equity) === "object"
          ? <p></p>
          : <p>{<small>Equity: {equity}</small>}</p>
        }
        {!hasApplied
          ?
          <button className="btn btn-primary btn-sm apply-btn"
            onClick={handleApply}
          >
            Apply
          </button>
          :
          <div className="applied"><p>Applied!</p></div>
        }
      </div>
    </div>
  )
}

export default JobCard;