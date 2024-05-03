const { Candidate } = require('../modals/candidatesSchema');

const addCandidates = async (req, res) => {
    const { id, name, party, region, votes } = req.body;
    try {
        // Create a new instance of the Candidate model
        const newCandidate = new Candidate({
            id,
            name,
            party,
            region,
            votes,
        });

        // Save the new candidate to the database
        await newCandidate.save();

        return res.status(200).json({ message: "Candidate added successfully" });
    } catch (e) {
        console.error("ERROR ADD CANDIDATES: ", e);
        return res.status(500).json({ message: "Internal Server error" });
    }
};

module.exports = { addCandidates };
