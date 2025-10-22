# Learning Management System (LMS)

A Git-based modular learning platform built with Next.js and Decap CMS, designed for hierarchical content management.

## Features

- **Hierarchical Structure**: Exam → Subject → Unit → Chapter → Module
- **Git-based Content Management**: All content stored in Git repository
- **Auto-generation**: Automatic module numbering and slug generation
- **Rich Content Support**: HTML content and JSON quiz data
- **Non-technical Interface**: Easy-to-use CMS for content creators
- **Quiz Functionality**: Interactive multiple choice questions with explanations

## Tech Stack

- **Frontend**: Next.js 14 + React 18
- **CMS**: Decap CMS (formerly Netlify CMS)
- **Backend**: Git (no database required)
- **Styling**: CSS with modern design

## Project Structure

```
/data
  /<exam_slug>
    /<subject_slug>
      /<unit_slug>
        /<chapter_slug>
          /module-<module_number>
            index.json
/pages
  /[exam]/[subject]/[unit]/[chapter]/[module].js
/static/admin/
  config.yml
  preSave.js
/public/uploads/
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 3. Admin Interface

Visit [http://localhost:3000/admin](http://localhost:3000/admin) to access the content management system.

## Usage

### For Content Creators

1. **Access Admin**: Go to `/admin` to access the CMS
2. **Create Content**: Use the collections to create exams, subjects, units, chapters, and modules
3. **Hierarchy Management**: Select existing parents from dropdown menus
4. **Content Creation**: 
   - Paste HTML content into the Content HTML field
   - Add MCQ data in JSON format
   - Module numbers and slugs auto-generate

### For Learners

1. **Browse Content**: Navigate through the hierarchy from the home page
2. **Study Modules**: View HTML content and take interactive quizzes
3. **Quiz Features**: 
   - Answer multiple choice questions
   - View explanations
   - Retake quizzes

## Data Format

Each module is stored as `index.json` with the following structure:

```json
{
  "exam_slug": "jee",
  "subject_slug": "mathematics",
  "unit_slug": "limits",
  "chapter_slug": "continuity",
  "module_number": 1,
  "slug": "module-1",
  "title": "Limits and Continuity — Basics",
  "content_html": "<h1>Content here</h1>",
  "mcqs": [
    {
      "question": "What is the limit?",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "answer": 2,
      "explanation": "Explanation here"
    }
  ]
}
```

## Auto-Generation Features

- **Module Numbers**: Automatically increment based on existing modules
- **Slugs**: Auto-generated from names (lowercase, hyphenated)
- **Titles**: Default to "Module N — Chapter Name" if not specified

## API Endpoints

- `POST /api/modules/next-number`: Get the next module number for a chapter

## Deployment

This application can be deployed to any platform that supports Next.js:

- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- **Any Node.js hosting**

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
