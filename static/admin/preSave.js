// Auto-generation script for Decap CMS
window.CMS.registerEventListener({
  name: 'preSave',
  handler: ({ entry }) => {
    const data = entry.get('data');
    const collection = entry.get('collection');

    // Auto-generate slugs for all collections
    if (collection === 'exams' || collection === 'subjects' || collection === 'units' || collection === 'chapters') {
      const name = data.get('name');
      if (name && !data.get('slug')) {
        const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        entry = entry.setIn(['data', 'slug'], slug);
      }
    }

    // Auto-generate module number and slug for modules
    if (collection === 'modules') {
      const examSlug = data.get('exam_slug');
      const subjectSlug = data.get('subject_slug');
      const unitSlug = data.get('unit_slug');
      const chapterSlug = data.get('chapter_slug');
      
      if (examSlug && subjectSlug && unitSlug && chapterSlug) {
        // Get the next module number
        const moduleNumber = getNextModuleNumber(examSlug, subjectSlug, unitSlug, chapterSlug);
        
        // Set module number if not already set
        if (!data.get('module_number')) {
          entry = entry.setIn(['data', 'module_number'], moduleNumber);
        }
        
        // Auto-generate slug
        const currentModuleNumber = data.get('module_number') || moduleNumber;
        const slug = `module-${currentModuleNumber}`;
        entry = entry.setIn(['data', 'slug'], slug);
      }
    }

    return entry;
  }
});

// Helper function to get the next module number
async function getNextModuleNumber(examSlug, subjectSlug, unitSlug, chapterSlug) {
  try {
    const response = await fetch('/api/modules/next-number', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        examSlug,
        subjectSlug,
        unitSlug,
        chapterSlug
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.nextNumber;
    }
    
    return 1; // Fallback
  } catch (error) {
    console.error('Error getting next module number:', error);
    return 1;
  }
}

// Slug generation utility
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
