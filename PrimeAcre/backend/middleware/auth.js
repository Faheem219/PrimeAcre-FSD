// middleware/auth.js
exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ error: 'Unauthorized' });
  };
  
  exports.isAgent = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'Agent') {
      return next();
    }
    res.status(403).json({ error: 'Forbidden: Agents only' });
  };
  
  exports.isClient = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'Client') {
      return next();
    }
    res.status(403).json({ error: 'Forbidden: Clients only' });
  };