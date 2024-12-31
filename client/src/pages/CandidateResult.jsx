import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const CandidateResult = () => {
  const { testId } = useParams();
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortedResults, setSortedResults] = useState([]);
  const [filter, setFilter] = useState("alphabetically");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/test-results/${testId}`);
        // console.log(response.data.results);
        if (response.data && response.data.results) {
          setResults(response.data.results);
          setSortedResults(response.data.results);
          // console.log(results.length);
        } else {
          setResults([]);
          setSortedResults([]);
          setError("No results found.");
        }
      } catch (err) {
        console.error("Error fetching results:", err);
        setError("Failed to fetch results. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [testId]);

  useEffect(() => {
    setSortedResults([...results]);
    handleSort(filter);
  }, [filter, results]);

  const handleSort = (type) => {
    let sorted = [...results];
    if (type === "alphabetically") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (type === "score") {
      sorted.sort((a, b) => (b.score || 0) - (a.score || 0));
    }
    // console.log(sorted);
    setSortedResults(sorted);
    setResults(results);
    // console.log(results);
    // console.log(sortedResults);
  };

  return (
    <div className="w-full min-h-screen p-2 md:p-4 overflow-x-scroll">
      <div className="w-full p-2 md:p-4 bg-[#eef] rounded-md flex flex-col gap-4 items-center">
        <div className="w-full border-2 border-[#50f] rounded-md flex justify-between items-center overflow-hidden">
          <div className="text-2xl h-full m-2 md:m-4">Test Results</div>
          <select
            className="p-2 md:p-5 h-full bg-white"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="alphabetically">Sort Alphabetically</option>
            <option value="score">Sort by Score</option>
          </select>
        </div>
        {error && <div className="error md:text-md">{error}</div>}
        <table className="table-auto rounded-md w-full">
          <thead>
            <tr className="bg-[#50f] text-white">
              {["Candidate Name", "Email", "Score", "Cheating Detected"].map(
                (item, index) => (
                  <th key={index} className="p-2 border border-[#aac]">
                    {item}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {sortedResults.map((result, index) => (
              <tr key={index}>
                <td className="td">{result.name}</td>
                <td className="td">{result.email}</td>
                <td className="td">
                  {result.score !== null ? result.score : "Not Submitted"}
                </td>
                <td className="td">
                  {result.wasCheating !== null
                    ? result.wasCheating
                      ? "True"
                      : "False"
                    : "Not Submitted"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidateResult;
