import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { examSlug, subjectSlug, unitSlug, chapterSlug } = req.body

  if (!examSlug || !subjectSlug || !unitSlug || !chapterSlug) {
    return res.status(400).json({ message: 'Missing required parameters' })
  }

  try {
    const chapterDir = path.join(process.cwd(), 'data', examSlug, subjectSlug, unitSlug, chapterSlug)
    
    if (!fs.existsSync(chapterDir)) {
      return res.status(404).json({ message: 'Chapter directory not found' })
    }

    // Get all module directories
    const modules = fs.readdirSync(chapterDir).filter(item => {
      const itemPath = path.join(chapterDir, item)
      return fs.statSync(itemPath).isDirectory() && item.startsWith('module-')
    })

    // Extract module numbers and find the highest
    let maxNumber = 0
    modules.forEach(module => {
      const match = module.match(/module-(\d+)/)
      if (match) {
        const number = parseInt(match[1])
        if (number > maxNumber) {
          maxNumber = number
        }
      }
    })

    const nextNumber = maxNumber + 1

    res.status(200).json({ 
      nextNumber,
      slug: `module-${nextNumber}`
    })
  } catch (error) {
    console.error('Error getting next module number:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
