export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // For now, return a simple response
  // In a real implementation, you would handle GitHub API calls here
  res.status(200).json({
    message: 'Git Gateway proxy is running',
    timestamp: new Date().toISOString()
  })
}
