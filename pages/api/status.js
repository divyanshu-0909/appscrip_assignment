export default function handler(req, res) {
  const payload = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    node: process.version,
    env: process.env.NODE_ENV || null,
    memoryUsage: process && process.memoryUsage ? process.memoryUsage() : null,
    headers: Object.fromEntries(Object.entries(req.headers).filter(([k])=>['host','user-agent','x-forwarded-for'].includes(k)))
  };
  res.status(200).json(payload);
}
