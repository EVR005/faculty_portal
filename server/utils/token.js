const jwt = require("jsonwebtoken");
const {jwtDetails}=require("../config/config")
var logger=require("./log")(module)
// get token present in rquest 
const getToken = (request) => {
  
  var token = null;
  logger.info("-->",request.headers.cookie);
  request.headers && request.headers.cookie.split(';').forEach(function(cookie) {
    
    var parts = cookie.match(/(.*?)=(.*)$/)

    if(parts && parts[1]=="accessToken") {
      token = parts[2]
    }
    
  });

  return token 

};



const verifyToken = (request) => {
  const token = request;
  console.log("hello ="+token);
  if (!token) return null;
 
  try {
    
    const decoded = jwt.verify(token, jwtDetails.secret);
    
    return decoded
  }
  catch (err) {
    logger.info(err)
    return null 
  }
  
}


module.exports = {
  verifyToken
}