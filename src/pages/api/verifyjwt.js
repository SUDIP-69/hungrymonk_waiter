import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  const token = req.body.token;
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    res.status(200).json({ success: true, decodedToken });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
}