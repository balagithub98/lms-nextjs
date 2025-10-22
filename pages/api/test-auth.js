export default function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID
  const clientSecret = process.env.GITHUB_CLIENT_SECRET
  
  res.status(200).json({
    hasClientId: !!clientId,
    hasClientSecret: !!clientSecret,
    clientIdLength: clientId ? clientId.length : 0,
    clientSecretLength: clientSecret ? clientSecret.length : 0,
    message: clientId && clientSecret ? 'Environment variables are set correctly' : 'Environment variables are missing'
  })
}
