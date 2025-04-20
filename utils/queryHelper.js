export const buildQuery = (req) => {
    const queryObj = {};
    const searchQuery = req.query.q;
  
    if (searchQuery) {
      queryObj.registrationNo = { $regex: searchQuery, $options: 'i' };
    }
  
    return queryObj;
  };
  
  export const paginate = (req) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
  
    return { skip, limit, page };
  };
  