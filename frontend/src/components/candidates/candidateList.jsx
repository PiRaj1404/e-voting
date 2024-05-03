import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./candidates.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isVoteModalOpen, setVoteModalOpen] = useState(false);
  const [privateKey, setPrivateKey] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/get-candidates/Malwa"
        );
        const data = response.data.data;
       
        setCandidates(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleVoteClick = (candidate) => {
    setSelectedCandidate(candidate);
    setVoteModalOpen(true);
  };

  const handleVote = () => {
    if (!selectedCandidate) {
      // Handle case when no candidate is selected
      return;
    }

    // Implement the logic to cast the vote with the provided private key
    console.log(
      `Vote casted for ${selectedCandidate.name} (${selectedCandidate.party}) with private key: ${privateKey}`
    );

    // Close the modal and clear the private key
    setVoteModalOpen(false);
    setPrivateKey("");
    setSelectedCandidate(null);
    navigate("/vote-cnfm", { state: { votedCandidate: selectedCandidate } });
  };

  return (
    <div className="container mt-5">
      <h2>Candidates List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card" style={{ width: "15rem" }}>
                <div className="card-body">
                  <h5
                    className="card-title"
                    style={{ height: "3rem", overflow: "hidden" }}
                  >
                    {candidate.name}
                  </h5>
                  <p
                    className="card-text"
                    style={{ height: "2rem", overflow: "hidden" }}
                  >
                    {candidate.party}
                  </p>
                  <button
                    onClick={() => handleVoteClick(candidate)}
                    className="btn btn-primary"
                  >
                    Vote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={isVoteModalOpen}
        onRequestClose={() => setVoteModalOpen(false)}
        contentLabel="Vote Modal"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "40%", // Adjust the width as needed
          },
        }}
      >
        <div className="modal-header">
          <h2>Vote for {selectedCandidate && selectedCandidate.name}</h2>
          <button
            className="close-button"
            onClick={() => setVoteModalOpen(false)}
          >
            <span style={{ fontSize: "30px" }}>&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <p>Party: {selectedCandidate && selectedCandidate.party}</p>
          <div className="field">
            <label className="label">Enter Private Key:</label>
            <div className="py-2">
              <input
                type="text"
                className="input"
                style={{ width: "100%" }}
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={handleVote} className="btn btn-primary">
            Cast Vote
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CandidateList;
