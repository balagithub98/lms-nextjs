import Link from 'next/link'
import fs from 'fs'
import path from 'path'

export default function ExamPage({ exam, subjects }) {
  return (
    <div className="module-content">
      <div className="breadcrumb">
        <Link href="/">Home</Link> → {exam.charAt(0).toUpperCase() + exam.slice(1)} Exam
      </div>
      
      <h1>{exam.charAt(0).toUpperCase() + exam.slice(1)} Exam</h1>
      <p>Select a subject to continue:</p>
      
      <div style={{ marginTop: '2rem' }}>
        {subjects.map((subject) => (
          <div key={subject} style={{ margin: '1rem 0' }}>
            <Link 
              href={`/${exam}/${subject}`}
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
              {subject.charAt(0).toUpperCase() + subject.slice(1)}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const { exam } = params
  const examDir = path.join(process.cwd(), 'data', exam)
  
  if (!fs.existsSync(examDir)) {
    return { notFound: true }
  }
  
  const subjects = fs.readdirSync(examDir).filter(item => {
    const itemPath = path.join(examDir, item)
    return fs.statSync(itemPath).isDirectory()
  })
  
  return { props: { exam, subjects } }
}

export async function getStaticPaths() {
  const dataDir = path.join(process.cwd(), 'data')
  
  if (!fs.existsSync(dataDir)) {
    return { paths: [], fallback: false }
  }
  
  const exams = fs.readdirSync(dataDir).filter(item => {
    const itemPath = path.join(dataDir, item)
    return fs.statSync(itemPath).isDirectory()
  })
  
  const paths = exams.map(exam => ({
    params: { exam }
  }))
  
  return { paths, fallback: false }
}
