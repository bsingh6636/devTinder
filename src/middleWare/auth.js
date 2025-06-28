const jwt = require('jsonwebtoken');
const { DB } = require('../../models');

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.devTinderToken;
    if(!token){
      return res.status(401).json({ success: false , messae : 'missing token' })
    }
    if (typeof token !== 'string' || token.length < 10) {
      return res.status(401).json({ success: false, message: 'Authentication token missing or invalid format' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, 'privatekey'); 
    } catch (err) {
      return res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }

    if (!decoded || typeof decoded !== 'object' || !decoded.user || !decoded.user.id) {
      return res.status(400).json({ success: false, message: 'Token payload malformed' });
    }

    const { id, ...userData } = decoded.user;

    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return res.status(403).json({ success: false, message: 'Token has expired' });
    }

    const user = await DB.user.findByPk(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const clientIP = req.headers['x-forwarded-for'] || req.connection?.remoteAddress || req.socket?.remoteAddress;
    const userAgent = req.headers['user-agent'] || 'Unknown';

    if (process.env.NODE_ENV !== 'production') {
      console.log('✔ Authenticated User:', user?.email || user?.username || user?.id);
      console.log('↪ IP:', clientIP);
      console.log('↪ Agent:', userAgent);
      console.log('↪ Token Expires At:', decoded.exp ? new Date(decoded.exp * 1000).toISOString() : 'Not set');
    }

    req.user = user;
    req.tokenMeta = {
      decoded,
      client: {
        ip: clientIP,
        userAgent: userAgent
      },
      expiresAt: decoded.exp ? new Date(decoded.exp * 1000) : null
    };

    next();

  } catch (error) {
    console.error('🔥 Auth Middleware Error:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = { userAuth };
