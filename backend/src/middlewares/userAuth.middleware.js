import jwt, { decode } from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';

const validateUser = (req, res, next) => {
    // role = 1 indicates any userType with valid token is allowed
    const auth = req.headers?.authorization
    if (!auth || !auth.startsWith("Bearer ")) {
        throw new ApiError(401, "Authorization Header Invalid")
    }

    const token = auth.split(" ")[1]
    const decodedToken = jwt.decode(token, process.env.JWT_ACCESS_SECRET)
    if (decodedToken) {
        // decodedToken contains {_id,userType}
        req.user = decodedToken
        next()


    } else {
        throw new ApiError(401, "Invalid or expired token")
    }

}

export default validateUser