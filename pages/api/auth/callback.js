import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = req.query.code as string | undefined;
  const state = req.query.state as string | undefined;

  const cookie = req.headers.cookie || "";
  const cookieState = (cookie.match(/(?:^|;\s*)decap_state=([^;]+)/) || [])[1];

  if (!code || !state || !cookieState || state !== cookieState) {
    return res.status(400).json({ error: "Invalid OAuth state or code." });
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID!,
      client_secret: process.env.GITHUB_CLIENT_SECRET!,
      code,
    }),
  });

  const tokenJson = await tokenRes.json();
  if (!tokenRes.ok || !tokenJson.access_token) {
    return res.status(400).json({ error: "Token exchange failed", details: tokenJson });
  }

  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ token: tokenJson.access_token }));
}
