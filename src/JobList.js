import React, { useEffect, useState } from "react";
import JoBeeApi from "./api";
import JobCard from "./JobCard";
import SearchBox from "./SearchBox";
import "./JobList.css";

/**  Makes API call to show all jobs or filter specific jobs 
 *   by title.
 * 
 *   State:
 *   - jobs: array of jobs objects, like 
 *    [ { id, title, salary, equity, companyHandle, companyName }, ...]
 *   - isLoading: boolean to show if the API call is in progress
 *   - jobTitle: string search term entered by user
 * 
 *   App -> Routes -> JobList -> [SearchBox, [JobCard, ...]]
*/
function JobList() {

  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  function search(term) {
    setSearchTerm(term);
  }

  useEffect(function getJobsWhenMounted() {
    async function getJobs() {
      let jobsResults;

      if (!searchTerm) {
        jobsResults = await JoBeeApi.request('jobs')
      } else {
        // Pass search term as data object, not URL param
        jobsResults = await JoBeeApi.request('jobs', { title: searchTerm })
      }
      setJobs(jobsResults.jobs || []);
      setIsLoading(false);
    }
    getJobs();
  }, [searchTerm]);

  if (isLoading) return <i>Loading...</i>;

  return (
    <div className="JobList col-md-8 offset-md-2">
      <SearchBox search={search} />
      {jobs.length
        ? (
          <div className="jobs-scroll">
            <h1>Jobs</h1>
            <div className="JobList-list">
              {jobs.map(job =>
                <JobCard key={job.id} job={job} />
              )}
            </div>
          </div>
        ) : (<p className="lead">Sorry, no results were found!</p>)}
    </div>
  );

}

export default JobList;











