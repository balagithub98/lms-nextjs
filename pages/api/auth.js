import type { NextApiRequest, NextApiResponse } from "next";

const AUTH_URL = "https://github.com/login/oauth/authorize";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const clientId = process.env.GITHUB_CLIENT_ID!;
  const redirectUri = process.env.OAUTH_REDIRECT_URI!;
  const scope = "repo,user:email"; // or "public_repo,user:email" for public repos
  const state = Math.random().toString(36).slice(2);

  // CSRF (Cross-Site Request Forgery) protection cookie
  res.setHeader("Set-Cookie", `decap_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`);

  res.redirect(
    `${AUTH_URL}?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scope)}&state=${encodeURIComponent(state)}`
  );
}