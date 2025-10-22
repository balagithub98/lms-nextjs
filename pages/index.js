import Link from 'next/link'
import fs from 'fs'
import path from 'path'

export default function Home({ exams }) {
  return (
    <div className="module-content">
      <h1>Learning Management System</h1>
      <p>Select an exam to begin learning:</p>
      
      <div style={{ marginTop: '2rem' }}>
        {exams.map((exam) => (
          <div key={exam} style={{ margin: '1rem 0' }}>
            <Link 
              href={`/${exam}`}
              style={{ 
                display: 'block', 
                padding: '1rem', 
                background: '#f8f9fa', 
                borderRadius: '5px',
                textDecoration: 'none',
                color: '#333',
                border: '1px solid #e9ecef'
              }}
            >
              {exam.charAt(0).toUpperCase() + exam.slice(1)} Exam
            </Link>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '3rem', padding: '1rem', background: '#e9ecef', borderRadius: '5px' }}>
        <p><strong>Admin Access:</strong> <Link href="/admin">Manage Content</Link></p>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const dataDir = path.join(process.cwd(), 'data')
  
  if (!fs.existsSync(dataDir)) {
    return { props: { exams: [] } }
  }
  
  const exams = fs.readdirSync(dataDir).filter(item => {
    const itemPath = path.join(dataDir, item)
    return fs.statSync(itemPath).isDirectory()
  })
  
  return { props: { exams } }
}
