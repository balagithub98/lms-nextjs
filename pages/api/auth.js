export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { code, state } = req.query

  if (!code) {
    // Redirect to GitHub OAuth
    const clientId = process.env.GITHUB_CLIENT_ID
    const redirectUri = `${process.env.NEXTAUTH_URL || 'https://lms-nextjs-olive.vercel.app'}/api/auth`
    const state = Math.random().toString(36).substring(7)
    
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo&state=${state}`
    
    return res.redirect(authUrl)
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (tokenData.error) {
      return res.status(400).json({ error: tokenData.error_description })
    }

    // Get user info
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${tokenData.access_token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    })

    const user = await userResponse.json()

    // Return success page with token
    return res.status(200).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Authentication Successful</title>
      </head>
      <body>
        <h1>Authentication Successful!</h1>
        <p>You can now use Decap CMS.</p>
        <script>
          // Store token in localStorage for Decap CMS
          localStorage.setItem('github_token', '${tokenData.access_token}');
          // Redirect back to admin
          window.location.href = '/admin/index.html';
        </script>
      </body>
      </html>
    `)

  } catch (error) {
    console.error('GitHub OAuth error:', error)
    res.status(500).json({ error: 'Authentication failed' })
  }
}
