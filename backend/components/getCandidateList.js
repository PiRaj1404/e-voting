const {Candidate} = require('../modals/candidatesSchema');

const candidatesList = async(req, res) =>{
    const region = req.params.region
    try{
       
        const candidatesInRegion = await Candidate.find({ region });
        return res.status(200).json({message : null, data: candidatesInRegion, isError: false});    
    }
    catch(e) {
        return res.status(500).json({message: "Internal Server error"})
    }
    
}

module.exports = {candidatesList};