const express = require("express");
const router = express.Router();
const { registerUser } = require("../components/register");
const { loginUser } = require("../components/login");
const { candidatesList } = require("../components/getCandidateList");
const { voteCandidate } = require("../components/voteCandidate");
const { getResult } = require("../components/candidateResult");
const { addCandidates } = require("../components/addCandidates")


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/add-candidates", addCandidates);
router.get("/get-candidates/:region/", candidatesList);
router.post("/vote-candidate/", voteCandidate);
router.get("/get-result/:region/", getResult);

module.exports = router;
