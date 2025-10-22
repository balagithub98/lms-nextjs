import Link from 'next/link'
import fs from 'fs'
import path from 'path'

export default function UnitPage({ exam, subject, unit, chapters }) {
  return (
    <div className="module-content">
      <div className="breadcrumb">
        <Link href="/">Home</Link> → <Link href={`/${exam}`}>{exam.charAt(0).toUpperCase() + exam.slice(1)} Exam</Link> → <Link href={`/${exam}/${subject}`}>{subject.charAt(0).toUpperCase() + subject.slice(1)}</Link> → {unit.charAt(0).toUpperCase() + unit.slice(1)}
      </div>
      
      <h1>{unit.charAt(0).toUpperCase() + unit.slice(1)}</h1>
      <p>Select a chapter to continue:</p>
      
      <div style={{ marginTop: '2rem' }}>
        {chapters.map((chapter) => (
          <div key={chapter} style={{ margin: '1rem 0' }}>
            <Link 
              href={`/${exam}/${subject}/${unit}/${chapter}`}
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
              {chapter.charAt(0).toUpperCase() + chapter.slice(1)}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const { exam, subject, unit } = params
  const unitDir = path.join(process.cwd(), 'data', exam, subject, unit)
  
  if (!fs.existsSync(unitDir)) {
    return { notFound: true }
  }
  
  const chapters = fs.readdirSync(unitDir).filter(item => {
    const itemPath = path.join(unitDir, item)
    return fs.statSync(itemPath).isDirectory()
  })
  
  return { props: { exam, subject, unit, chapters } }
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
      const subjectDir = path.join(examDir, subject)
      const units = fs.readdirSync(subjectDir).filter(item => {
        const itemPath = path.join(subjectDir, item)
        return fs.statSync(itemPath).isDirectory()
      })
      
      for (const unit of units) {
        paths.push({ params: { exam, subject, unit } })
      }
    }
  }
  
  return { paths, fallback: false }
}
