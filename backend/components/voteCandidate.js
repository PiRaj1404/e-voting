const candidateSchema = require('../modals/candidatesSchema');

const voteCandidate = async(req, res) =>{
    const {region} = req.body;
    try{
        
        const candidatesInRegion = await candidateSchema.find({ region });
        return res.status(200).json({message: candidatesInRegion});    
    }
    catch(e) {
        return res.status(500).json({message: "Internal Server error"})
    }
    
}

module.exports = {voteCandidate};