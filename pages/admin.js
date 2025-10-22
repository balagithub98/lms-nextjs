import { useEffect } from 'react'

export default function AdminPage() {
  useEffect(() => {
    // Redirect to Decap CMS interface
    window.location.href = '/admin/index.html'
  }, [])

  return (
    <div className="module-content">
      <h1>Redirecting to Decap CMS...</h1>
      <p>If you are not redirected automatically, <a href="/admin/index.html">click here</a>.</p>
    </div>
  )
}
