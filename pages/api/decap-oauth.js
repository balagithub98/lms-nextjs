export default function handler(req, res) {
  const { code, state } = req.query
  
  if (req.method === 'GET') {
    // Handle OAuth callback
    if (code && state) {
      // Exchange code for access token
      const tokenUrl = 'https://github.com/login/oauth/access_token'
      const clientId = process.env.GITHUB_CLIENT_ID
      const clientSecret = process.env.GITHUB_CLIENT_SECRET
      const redirectUri = process.env.OAUTH_REDIRECT_URI
      
      const tokenData = {
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        redirect_uri: redirectUri
      }
      
      fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tokenData)
      })
      .then(response => response.json())
      .then(data => {
        if (data.access_token) {
          // Store token in session/cookie and redirect to admin
          res.setHeader('Set-Cookie', `decap_token=${data.access_token}; Path=/; HttpOnly; SameSite=Lax`)
          res.redirect('/admin')
        } else {
          res.status(400).json({ error: 'Failed to get access token' })
        }
      })
      .catch(error => {
        console.error('OAuth error:', error)
        res.status(500).json({ error: 'OAuth authentication failed' })
      })
    } else {
      // Initiate OAuth flow
      const clientId = process.env.GITHUB_CLIENT_ID
      const redirectUri = process.env.OAUTH_REDIRECT_URI
      const state = Math.random().toString(36).substring(7)
      
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo&state=${state}`
      
      res.redirect(authUrl)
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
