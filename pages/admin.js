import { useState } from 'react'
import Link from 'next/link'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="module-content">
      <h1>Learning Management System - Admin Console</h1>
      
      <div style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid #dee2e6' }}>
          <button 
            onClick={() => setActiveTab('overview')}
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              background: activeTab === 'overview' ? '#007bff' : '#f8f9fa',
              color: activeTab === 'overview' ? 'white' : '#333',
              borderRadius: '5px 5px 0 0',
              cursor: 'pointer'
            }}
          >
            📊 Overview
          </button>
          <button 
            onClick={() => setActiveTab('content')}
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              background: activeTab === 'content' ? '#007bff' : '#f8f9fa',
              color: activeTab === 'content' ? 'white' : '#333',
              borderRadius: '5px 5px 0 0',
              cursor: 'pointer'
            }}
          >
            📝 Content Management
          </button>
          <button 
            onClick={() => setActiveTab('structure')}
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              background: activeTab === 'structure' ? '#007bff' : '#f8f9fa',
              color: activeTab === 'structure' ? 'white' : '#333',
              borderRadius: '5px 5px 0 0',
              cursor: 'pointer'
            }}
          >
            🏗️ Structure Guide
          </button>
        </div>

        {activeTab === 'overview' && (
          <div>
            <h2>📊 System Overview</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ padding: '1rem', background: '#e3f2fd', borderRadius: '5px', border: '1px solid #bbdefb' }}>
                <h3>📚 Available Exams</h3>
                <ul>
                  <li><Link href="/jee">JEE (Joint Entrance Examination)</Link></li>
                  <li><Link href="/neet">NEET (National Eligibility cum Entrance Test)</Link></li>
                </ul>
              </div>
              <div style={{ padding: '1rem', background: '#e8f5e8', borderRadius: '5px', border: '1px solid #c8e6c9' }}>
                <h3>📖 Sample Modules</h3>
                <ul>
                  <li><Link href="/jee/mathematics/derivatives/basic-rules/module-1">JEE Mathematics - Basic Derivative Rules</Link></li>
                  <li><Link href="/jee/mathematics/limits/continuity/module-1">JEE Mathematics - Limits and Continuity</Link></li>
                  <li><Link href="/jee/physics/mechanics/kinematics/module-1">JEE Physics - Kinematics</Link></li>
                  <li><Link href="/neet/biology/cell-biology/cell-structure/module-1">NEET Biology - Cell Structure</Link></li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div>
            <h2>📝 Content Management</h2>
            <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              <div style={{ padding: '1rem', background: '#fff3cd', borderRadius: '5px', border: '1px solid #ffeaa7' }}>
                <h3>🌐 GitHub Web Interface</h3>
                <p>Edit content directly on GitHub:</p>
                <ol style={{ fontSize: '0.9rem' }}>
                  <li>Go to <a href="https://github.com/balagithub98/lms-nextjs" target="_blank" style={{ color: '#007bff' }}>your repository</a></li>
                  <li>Navigate to the <code>/data</code> folder</li>
                  <li>Click on any JSON file to edit</li>
                  <li>Click the edit button (pencil icon)</li>
                  <li>Make your changes and commit</li>
                </ol>
              </div>
              <div style={{ padding: '1rem', background: '#d1ecf1', borderRadius: '5px', border: '1px solid #bee5eb' }}>
                <h3>💻 Local Development</h3>
                <p>Edit content locally:</p>
                <ol style={{ fontSize: '0.9rem' }}>
                  <li>Clone your repository locally</li>
                  <li>Edit JSON files in the <code>/data</code> folder</li>
                  <li>Run <code>npm run dev</code> to preview changes</li>
                  <li>Commit and push changes to update the site</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'structure' && (
          <div>
            <h2>🏗️ Content Structure Guide</h2>
            <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '5px', border: '1px solid #dee2e6' }}>
                <h3>📁 File Structure</h3>
                <p>Your content follows this hierarchy:</p>
                <pre style={{ background: '#ffffff', padding: '1rem', borderRadius: '3px', fontSize: '0.8rem', overflow: 'auto' }}>
{`/data/
  /<exam>/
    /<subject>/
      /<unit>/
        /<chapter>/
          /module-<number>/
            index.json`}
                </pre>
              </div>
              <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '5px', border: '1px solid #dee2e6' }}>
                <h3>📄 JSON Format</h3>
                <p>Each module has this structure:</p>
                <pre style={{ background: '#ffffff', padding: '1rem', borderRadius: '3px', fontSize: '0.8rem', overflow: 'auto' }}>
{`{
  "exam_slug": "jee",
  "subject_slug": "mathematics",
  "unit_slug": "derivatives",
  "chapter_slug": "basic-rules",
  "module_number": 1,
  "slug": "module-1",
  "title": "Module Title",
  "content_html": "<p>HTML content</p>",
  "mcqs": [
    {
      "question": "Question text?",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "answer": 0,
      "explanation": "Explanation text"
    }
  ]
}`}
                </pre>
              </div>
            </div>
          </div>
        )}
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
