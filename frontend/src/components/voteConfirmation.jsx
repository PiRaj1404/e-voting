import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const VoteConfirmation = () => {
  const location = useLocation();
  const votedCandidate = location.state?.votedCandidate || null;

  return (
    <div className="container mt-5">
      <h2>Vote Confirmation</h2>
      {votedCandidate ? (
        <div>
          <p>Your vote for {votedCandidate.name} ({votedCandidate.party}) has been successfully casted!</p>
          <Link to="/results" className="btn btn-primary">
            View Results
          </Link>
        </div>
      ) : (
        <p>No vote selected. Please go back and cast your vote.</p>
      )}
    </div>
  );
};

export default VoteConfirmation;