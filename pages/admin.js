import Link from 'next/link'

export default function AdminPage() {
  return (
    <div className="module-content">
      <h1>Learning Management System - Admin</h1>
      
      <div style={{ marginTop: '2rem' }}>
        <h2>Content Management</h2>
        <p>This is a Git-based learning platform. To manage content:</p>
        
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#d1ecf1', borderRadius: '5px', border: '1px solid #bee5eb' }}>
          <h3>📝 Content Management Interface</h3>
          <p>Use these methods to manage your learning content:</p>
          <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: '#ffffff', borderRadius: '5px', border: '1px solid #dee2e6' }}>
              <h4>📁 File Structure</h4>
              <p>Your content follows this hierarchy:</p>
              <pre style={{ background: '#f8f9fa', padding: '0.5rem', borderRadius: '3px', fontSize: '0.8rem', overflow: 'auto' }}>
{`/data/
  /<exam>/
    /<subject>/
      /<unit>/
        /<chapter>/
          /module-<number>/
            index.json`}
              </pre>
            </div>
            <div style={{ padding: '1rem', background: '#ffffff', borderRadius: '5px', border: '1px solid #dee2e6' }}>
              <h4>📄 JSON Format</h4>
              <p>Each module has this structure:</p>
              <pre style={{ background: '#f8f9fa', padding: '0.5rem', borderRadius: '3px', fontSize: '0.8rem', overflow: 'auto' }}>
{`{
  "exam_slug": "jee",
  "subject_slug": "mathematics",
  "unit_slug": "derivatives",
  "chapter_slug": "basic-rules",
  "module_number": 1,
  "slug": "module-1",
  "title": "Module Title",
  "content_html": "<p>HTML content</p>",
  "mcqs": [...]
}`}
              </pre>
            </div>
          </div>
        </div>
        
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '5px' }}>
          <h3>🛠️ Content Management Methods</h3>
          <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: '#ffffff', borderRadius: '5px', border: '1px solid #dee2e6' }}>
              <h4>📝 Direct File Editing</h4>
              <p>Edit JSON files directly in your repository:</p>
              <ul style={{ fontSize: '0.9rem' }}>
                <li>Navigate to the <code>/data</code> folder</li>
                <li>Edit the JSON files for each module</li>
                <li>Commit and push changes to update the site</li>
              </ul>
            </div>
            <div style={{ padding: '1rem', background: '#ffffff', borderRadius: '5px', border: '1px solid #dee2e6' }}>
              <h4>🌐 GitHub Web Interface</h4>
              <p>Use GitHub's web interface to edit files:</p>
              <ul style={{ fontSize: '0.9rem' }}>
                <li>Go to your repository on GitHub</li>
                <li>Navigate to the file you want to edit</li>
                <li>Click the edit button (pencil icon)</li>
                <li>Make your changes and commit</li>
              </ul>
            </div>
          </div>
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
