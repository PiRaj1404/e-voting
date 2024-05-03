const { Candidate } = require("../modals/candidatesSchema");

const getResult = async (req, res) => {
  // const {region, id} = req.params;
  const regions = req.params.region.split(",");
  try {
    const candidatesInAllRegions = [];
    

    for (const region of regions) {
      const candidatesInRegion = await Candidate.find({
        region,
        votes: { $gt: 0 },
      })
        .select("name party votes")
        .sort({ votes: -1 });

      candidatesInAllRegions.push({
        region,
        candidates: candidatesInRegion,
      });
    }

    return res
      .status(200)
      .json({ message: null, data: candidatesInAllRegions, isError: false });
  } catch (e) {
    console.log("ERROR RESULT : ", e);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

module.exports = { getResult };
