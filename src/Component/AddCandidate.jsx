import { React, useState } from 'react'
import ViewCandidate from './ViewCandidate'
import axios from 'axios';

function AddCandidate() {
  const [firstName, setFirstName] = useState("");
  const [cityName, setCityName] = useState("");
  const [yearOfJoining, setYearOfJoining] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [cityNameError, setCityNameError] = useState("");
  const [yearError, setYearError] = useState("");
  const [formError, setFormError] = useState("");
  const [refreshFlag, setRefreshFlag] = useState(false);
  const CurrentYear = new Date().getFullYear();
  const minYear = CurrentYear - 5;
  const [candidateList, setCandidateList] = useState(false);

  const handleFirstNameChange = (e) => {
    const input = e.target.value;
    if (/^[a-zA-Z]*$/.test(input)) {
      setFirstName(input);
      setFirstNameError("");
    } else {
      setFirstNameError('First name must contain letters only');
    }
  };

  const handleCityChange = (e) => {
    const input = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(input)) {
      setCityName(input);
      setCityNameError("");
    } else {
      setCityNameError('City name must contain letters and spaces only');
    }
  };

  const handleYearChange = (e) => {
    const input = e.target.value;
    setYearOfJoining(input);
    if (/^\d{0,4}$/.test(input)) {
      if (parseInt(input) < minYear) {
        setYearError(`Year of Joining must be greater than or equal to ${minYear}`);
      } else {
        setYearError("");
      }
    } else {
      setYearError("Year must be numeric and up to 4 digits");
    }
  };

  const handleRetrieveClick = () => {
    setCandidateList(true); 
    setFormError(''); 
    setRefreshFlag(prev => !prev); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setFormError("");

    let isValid = true;

    if (!firstName.trim()) {
      setFirstNameError("First name is required");
      isValid = false;
    }

    if (!cityName.trim()) {
      setCityNameError("City name is required");
      isValid = false;
    }

    if (!yearOfJoining.trim()) {
      setYearError("Year of joining is required");
      isValid = false;
    } else if (parseInt(yearOfJoining) < minYear) {
      setYearError(`Year of Joining must be greater than or equal to ${minYear}`);
    }

    if (!isValid) {
      return;
    }

    try {
      const res = await axios.post('/api/Candidate', { //${API_URL}/api/Candidate`, {
        firstName,
        cityName,
        yearOfJoining,
      });
      console.log(res);
      alert("Data saved successfully!");
      setFirstName("");
      setCityName("");
      setYearOfJoining("");
      setFirstNameError("");
      setCityNameError("");
      setYearError("");
      setFormError("");
      setRefreshFlag(prev => !prev);

    } catch (err) {
      console.error(err);
      setFormError("Failed to save data. Please try again.");
    }
  };

  return (
    <>
      <h1>First Page</h1>
      <div className="container">
        <fieldset>
          <form>
            <div className="row">
              <label className="col-25" htmlFor="firstname">
                First Name
              </label>
              <input
                className="col-75"
                type="text"
                name="firstname"
                id="firstname"
                value={firstName}
                onChange={handleFirstNameChange}
                onFocus={() => setFirstNameError('')}
                onBlur={() => setFirstNameError('')} 
                placeholder="Enter First Name"
              />
              {firstNameError && <p style={{ color: "red" }}>{firstNameError}</p>}
            </div>

            <div className="row">
              <label className="col-25" htmlFor="cityname">City Name</label>
              <input
                className="col-75"
                type="text"
                name="cityname"
                id="cityname"
                value={cityName}
                onChange={handleCityChange}
                onFocus={() => setCityNameError('')}
                onBlur={() => setCityNameError('')} 
                placeholder="Enter City Name"
              />
              {cityNameError && <p style={{ color: "red" }}>{cityNameError}</p>}
            </div>

            <div className="row">
              <label className="col-25" htmlFor="yearofjoining">Year of Joining</label>
              <input
                className="col-75"
                type="text"
                name="yearofjoining"
                id="yearofjoining"
                maxLength="4"
                value={yearOfJoining}
                onChange={handleYearChange}
                
                placeholder="Enter Year Of Joining"
              />
              {yearError && <p style={{ color: "red" }}>{yearError}</p>}
            </div>

            {formError && <p style={{ color: "red" }}>{formError}</p>}

            <div className="row">
              <button type="button" onClick={handleRetrieveClick}>Retrieve</button>
              <button type="button" onClick={handleSubmit}>Save</button>
            </div>
          </form>
        </fieldset>
      </div>

      {candidateList && <ViewCandidate key={refreshFlag} refreshFlag={refreshFlag} />}
    </>
  );
}

export default AddCandidate;
