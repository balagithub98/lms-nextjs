import { useState } from 'react'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'

export default function ModulePage({ data }) {
  const [showQuiz, setShowQuiz] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)


  const handleAnswerSelect = (questionIndex, optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }))
  }

  const handleSubmitQuiz = () => {
    setShowResults(true)
  }

  const getScore = () => {
    let correct = 0
    data.mcqs.forEach((question, index) => {
      if (selectedAnswers[index] === question.answer) {
        correct++
      }
    })
    return { correct, total: data.mcqs.length }
  }

  const score = getScore()

  return (
    <div className="module-content">
      <div className="breadcrumb">
        <Link href="/">Home</Link> → <Link href={`/${data.exam_slug}`}>{data.exam_slug.charAt(0).toUpperCase() + data.exam_slug.slice(1)} Exam</Link> → <Link href={`/${data.exam_slug}/${data.subject_slug}`}>{data.subject_slug.charAt(0).toUpperCase() + data.subject_slug.slice(1)}</Link> → <Link href={`/${data.exam_slug}/${data.subject_slug}/${data.unit_slug}`}>{data.unit_slug.charAt(0).toUpperCase() + data.unit_slug.slice(1)}</Link> → <Link href={`/${data.exam_slug}/${data.subject_slug}/${data.unit_slug}/${data.chapter_slug}`}>{data.chapter_slug.charAt(0).toUpperCase() + data.chapter_slug.slice(1)}</Link> → Module {data.module_number}
      </div>
      
      <h1>{data.title}</h1>
      
      <div 
        dangerouslySetInnerHTML={{ __html: data.content_html }}
      />
      
      {data.mcqs && data.mcqs.length > 0 && (
        <button 
          className="quiz-toggle"
          onClick={() => setShowQuiz(!showQuiz)}
        >
          {showQuiz ? 'Hide Quiz' : 'Take Quiz'}
        </button>
      )}
      
      {showQuiz && (
        <div className="quiz-section">
          <h2>Quiz: {data.title}</h2>
          
          {!data.mcqs || data.mcqs.length === 0 ? (
            <p>No quiz questions available for this module.</p>
          ) : !showResults ? (
            <>
              {data.mcqs.map((question, questionIndex) => (
                <div key={questionIndex} className="quiz-question">
                  <h3>Question {questionIndex + 1}</h3>
                  <p>{question.question}</p>
                  
                  <ul className="quiz-options">
                    {question.options.map((option, optionIndex) => (
                      <li 
                        key={optionIndex}
                        className={`quiz-option ${selectedAnswers[questionIndex] === optionIndex ? 'selected' : ''}`}
                        onClick={() => handleAnswerSelect(questionIndex, optionIndex)}
                      >
                        {optionIndex + 1}. {option}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              
              <button 
                className="quiz-toggle"
                onClick={handleSubmitQuiz}
                style={{ marginTop: '2rem' }}
              >
                Submit Quiz
              </button>
            </>
          ) : (
            <div>
              <h3>Quiz Results</h3>
              <p>You scored {score.correct} out of {score.total} questions ({Math.round((score.correct / score.total) * 100)}%)</p>
              
              {data.mcqs.map((question, questionIndex) => (
                <div key={questionIndex} className="quiz-question">
                  <h4>Question {questionIndex + 1}</h4>
                  <p>{question.question}</p>
                  
                  <ul className="quiz-options">
                    {question.options.map((option, optionIndex) => {
                      let className = 'quiz-option'
                      if (optionIndex === question.answer) {
                        className += ' correct'
                      } else if (selectedAnswers[questionIndex] === optionIndex && optionIndex !== question.answer) {
                        className += ' incorrect'
                      }
                      
                      return (
                        <li key={optionIndex} className={className}>
                          {optionIndex + 1}. {option}
                          {optionIndex === question.answer && ' ✓'}
                          {selectedAnswers[questionIndex] === optionIndex && optionIndex !== question.answer && ' ✗'}
                        </li>
                      )
                    })}
                  </ul>
                  
                  <div className="quiz-explanation">
                    <strong>Explanation:</strong> {question.explanation}
                  </div>
                </div>
              ))}
              
              <button 
                className="quiz-toggle"
                onClick={() => {
                  setShowResults(false)
                  setSelectedAnswers({})
                }}
                style={{ marginTop: '2rem' }}
              >
                Retake Quiz
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export async function getStaticProps({ params }) {
  const { exam, subject, unit, chapter, module } = params
  const filePath = path.join(
    process.cwd(),
    'data',
    exam,
    subject,
    unit,
    chapter,
    module,
    'index.json'
  )

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    return { props: { data } }
  } catch (error) {
    return { notFound: true }
  }
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
        const unitDir = path.join(subjectDir, unit)
        const chapters = fs.readdirSync(unitDir).filter(item => {
          const itemPath = path.join(unitDir, item)
          return fs.statSync(itemPath).isDirectory()
        })
        
        for (const chapter of chapters) {
          const chapterDir = path.join(unitDir, chapter)
          const modules = fs.readdirSync(chapterDir).filter(item => {
            const itemPath = path.join(chapterDir, item)
            return fs.statSync(itemPath).isDirectory() && item.startsWith('module-')
          })
          
          for (const module of modules) {
            paths.push({ params: { exam, subject, unit, chapter, module } })
          }
        }
      }
    }
  }
  
  return { paths, fallback: false }
}
