export const baseURL = process.env.REACT_APP_BASE_URL;

export const register = baseURL + "register";

export const login = baseURL + "login";

export const addCandidates = baseURL + "add-candidates";

export const getCandidates = baseURL + "get-candidates/:region/";

export const voteCandidate = baseURL + "vote-candidate/";

export const getResult = baseURL + "get-result/:region/";


