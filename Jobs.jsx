import { useEffect, useState } from "react";
import Cookies from "js-cookies";
import Header from "../Header/Header";
import DisplayAllJobs from "../DisplayAllJobs/DisplayAllJobs";
import FilterSection from "../FilterSection/FilterSection";
import "./index.css";

const Jobs = () => {
  const [allValues, setValues] = useState({
    alljobsList: [],
    showErrorMsg: false,
  });

  const token = Cookies.getItem("jwtToken");

  useEffect(() => {
    const fetchJobsData = async () => {
      const url = "https://apis.ccbp.in/jobs";
      

      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(url, options);
      const fetchData = await response.json();
      // const updatedData = fetchData.jobs;
      // updatedData.map(each=>console.log(each.title))
      if (response.ok === true) {
        setValues({
          ...allValues,
          alljobsList: fetchData.jobs,
          showErrorMsg: false,
        });
      } else {
        setValues({ ...allValues, showErrorMsg: true });
      }
    };

    fetchJobsData();
    
  }, []);

  return (
    <div className="jobs-cont">
      <Header />
      {allValues.showErrorMsg ? (
        <h1>Its Not You Its Us!!!!</h1>
      ) : (
        <div className="jobs-section">
          <div className="filter-section">
            <FilterSection></FilterSection>
          </div>
          <div className="all-jobs-section">
            <input type="serch" className="form-control w-50"  />
            <ul className="parent-cont">
              {allValues.alljobsList.map(each => (
                <DisplayAllJobs jobsItem={each} key={each.id}></DisplayAllJobs>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
