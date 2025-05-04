import axios from "axios";
import {useState, useEffect} from "react"
import '../App'

const ViewCandidate=({refreshFlag }) =>{

  const [candidates, setCandidates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

useEffect(() => {
  const fetchCandidates = async () => {
    try {
    const response = await axios.get('/api/Candidate',{ cache: 'no-store' }); 
   /*const response = await axios.get('https://localhost:4431/api/Candidate',{ cache: 'no-store' ,
    headers:{
      'xApiKey': 'c0e67c79-e208-42da-a8d5-5fc5e279c419',
    },
   }); */

      setCandidates(response.data);
      setCurrentPage(1);

    } catch (error) {
      console.error("Error fetching candidates", error);
    }
  };

  fetchCandidates();
}, [refreshFlag]);

const totalPages = Math.ceil((candidates?.length || 0) / itemsPerPage);
const indexOfLast = currentPage * itemsPerPage;
const indexOfFirst = indexOfLast - itemsPerPage;
const currentCandidates = candidates.slice(indexOfFirst, indexOfLast);

return (
  <>
  <h2>List of Candidates</h2>
  <table id="candidate">
    <thead>
      <tr>
        <th>FirstName</th>
        <th>CityName</th>
        <th>Year of Joining</th>
      </tr>
    </thead>
    <tbody>
      {currentCandidates  && currentCandidates.map((candidate,id) => (
        <tr key={id}>
          <td>{candidate.firstName}</td>
          <td>{candidate.cityName}</td>
          <td>{candidate.yearOfJoining}</td>
        </tr>
      ))}
    </tbody>
  </table>
  <div style={{ marginTop: '1rem' }}>
        <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
          First
        </button>
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Prev
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          Next
        </button>
        <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
          Last
        </button>
      </div>
  </>
);
 
};
export default ViewCandidate;
