import Link from 'next/link'
import fs from 'fs'
import path from 'path'

export default function SubjectPage({ exam, subject, units }) {
  return (
    <div className="module-content">
      <div className="breadcrumb">
        <Link href="/">Home</Link> → <Link href={`/${exam}`}>{exam.charAt(0).toUpperCase() + exam.slice(1)} Exam</Link> → {subject.charAt(0).toUpperCase() + subject.slice(1)}
      </div>
      
      <h1>{subject.charAt(0).toUpperCase() + subject.slice(1)}</h1>
      <p>Select a unit to continue:</p>
      
      <div style={{ marginTop: '2rem' }}>
        {units.map((unit) => (
          <div key={unit} style={{ margin: '1rem 0' }}>
            <Link 
              href={`/${exam}/${subject}/${unit}`}
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
              {unit.charAt(0).toUpperCase() + unit.slice(1)}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const { exam, subject } = params
  const subjectDir = path.join(process.cwd(), 'data', exam, subject)
  
  if (!fs.existsSync(subjectDir)) {
    return { notFound: true }
  }
  
  const units = fs.readdirSync(subjectDir).filter(item => {
    const itemPath = path.join(subjectDir, item)
    return fs.statSync(itemPath).isDirectory()
  })
  
  return { props: { exam, subject, units } }
}

export async function getStaticPaths() {
  const dataDir = path.join(process.cwd(), 'data')
  const paths = []
  
  if (!fs.existsSync(dataDir)) {
    return { paths, fallback: false }
  }
  
  const exams = fs.readdirSync(dataDir).filter(item => {
    const itemPath = path.join(dataDir, item)
    return fs.statSync(itemPath).isDirectory()
  })
  
  for (const exam of exams) {
    const examDir = path.join(dataDir, exam)
    const subjects = fs.readdirSync(examDir).filter(item => {
      const itemPath = path.join(examDir, item)
      return fs.statSync(itemPath).isDirectory()
    })
    
    for (const subject of subjects) {
      paths.push({ params: { exam, subject } })
    }
  }
  
  return { paths, fallback: false }
}
