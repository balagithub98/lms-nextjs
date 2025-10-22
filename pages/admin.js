import Link from 'next/link'

export default function AdminPage() {
  return (
    <div className="module-content">
      <h1>Learning Management System - Admin</h1>
      
      <div style={{ marginTop: '2rem' }}>
        <h2>Content Management</h2>
        <p>This is a Git-based learning platform. To manage content:</p>
        
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#fff3cd', borderRadius: '5px', border: '1px solid #ffeaa7' }}>
          <h3>⚠️ Decap CMS Setup Required</h3>
          <p>For full CMS functionality, you need to set up GitHub OAuth:</p>
          <ol style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
            <li>Create a GitHub OAuth App at <a href="https://github.com/settings/applications/new" target="_blank" style={{ color: '#007bff' }}>GitHub Settings</a></li>
            <li>Set Authorization callback URL to: <code>https://lms-nextjs-olive.vercel.app/admin/index.html</code></li>
            <li>Add environment variables in Vercel: <code>GITHUB_CLIENT_ID</code> and <code>GITHUB_CLIENT_SECRET</code></li>
          </ol>
          <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#856404' }}>
            <strong>Alternative:</strong> Use the manual methods below for now.
          </p>
        </div>
        
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '5px' }}>
          <h3>Option 1: Direct File Editing</h3>
          <p>Edit JSON files directly in the repository:</p>
          <ul>
            <li>Navigate to the <code>/data</code> folder in your repository</li>
            <li>Edit the JSON files for each module</li>
            <li>Commit and push changes to update the site</li>
          </ul>
        </div>
        
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#e3f2fd', borderRadius: '5px' }}>
          <h3>Option 2: GitHub Web Interface</h3>
          <p>Use GitHub's web interface to edit files:</p>
          <ul>
            <li>Go to your repository on GitHub</li>
            <li>Navigate to the file you want to edit</li>
            <li>Click the edit button (pencil icon)</li>
            <li>Make your changes and commit</li>
          </ul>
        </div>
        
        <div style={{ marginTop: '2rem' }}>
          <h2>Current Content Structure</h2>
          <div style={{ marginTop: '1rem' }}>
            <h3>Available Exams:</h3>
            <ul>
              <li><Link href="/jee">JEE (Joint Entrance Examination)</Link></li>
              <li><Link href="/neet">NEET (National Eligibility cum Entrance Test)</Link></li>
            </ul>
          </div>
          
          <div style={{ marginTop: '1rem' }}>
            <h3>Sample Modules:</h3>
            <ul>
              <li><Link href="/jee/mathematics/derivatives/basic-rules/module-1">JEE Mathematics - Basic Derivative Rules</Link></li>
              <li><Link href="/jee/mathematics/limits/continuity/module-1">JEE Mathematics - Limits and Continuity</Link></li>
              <li><Link href="/jee/physics/mechanics/kinematics/module-1">JEE Physics - Kinematics</Link></li>
              <li><Link href="/neet/biology/cell-biology/cell-structure/module-1">NEET Biology - Cell Structure</Link></li>
            </ul>
          </div>
        </div>
        
        <div style={{ marginTop: '2rem', padding: '1rem', background: '#fff3cd', borderRadius: '5px' }}>
          <h3>Content Creation Guide</h3>
          <p>To create new content, follow this structure:</p>
          <pre style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '3px', overflow: 'auto' }}>
{`/data/
  /<exam_slug>/
    /<subject_slug>/
      /<unit_slug>/
        /<chapter_slug>/
          /module-<number>/
            index.json`}
          </pre>
        </div>
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <Link href="/" style={{ 
          display: 'inline-block', 
          padding: '0.75rem 1.5rem', 
          background: '#007bff', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '5px' 
        }}>
          ← Back to Learning Platform
        </Link>
      </div>
    </div>
  )
}
