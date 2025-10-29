const fs = require('fs');

const content = fs.readFileSync('src/app/exam-papers/ap-constable-blueprint/page.tsx', 'utf8');

function extractQuestions(examKey) {
  // Find the exam section
  const pattern = `'${examKey}'`;
  const startIdx = content.indexOf(pattern);
  if (startIdx === -1) return null;
  
  // Find the next exam or end of object
  let endIdx = content.indexOf("'2018-mains':", startIdx + 1);
  if (endIdx === -1) endIdx = content.indexOf("'2022-prelims':", startIdx + 1);
  if (endIdx === -1) endIdx = content.indexOf("'2022-mains':", startIdx + 1);
  if (endIdx === -1) endIdx = content.indexOf('};', startIdx) + 2;
  
  const section = content.substring(startIdx, endIdx);
  
  // Extract all question numbers
  const questionNosMatches = section.matchAll(/questionNos:\s*\[([^\]]+)\]/g);
  const allQuestions = [];
  
  for (const match of questionNosMatches) {
    const numbers = match[1].match(/\d+/g).map(Number);
    allQuestions.push(...numbers);
  }
  
  const uniqueQuestions = [...new Set(allQuestions)].sort((a,b) => a-b);
  const missing = [];
  
  for (let i = 1; i <= 200; i++) {
    if (!uniqueQuestions.includes(i)) missing.push(i);
  }
  
  const duplicates = allQuestions.filter((item, index) => allQuestions.indexOf(item) !== index);
  
  return {
    total: allQuestions.length,
    unique: uniqueQuestions.length,
    duplicateCount: allQuestions.length - uniqueQuestions.length,
    duplicateNos: [...new Set(duplicates)],
    missing: missing,
    range: uniqueQuestions.length > 0 ? [Math.min(...uniqueQuestions), Math.max(...uniqueQuestions)] : [0, 0]
  };
}

console.log('='.repeat(80));
console.log('VERIFICATION: ALL QUESTIONS 1-200 PRESENT IN EACH PAPER');
console.log('='.repeat(80));
console.log('');

const papers = ['2018-prelims', '2022-prelims', '2018-mains', '2022-mains'];

papers.forEach(paper => {
  const result = extractQuestions(paper);
  if (result) {
    console.log(`📄 ${paper.toUpperCase().replace('-', ' ')}:`);
    console.log(`   Unique Questions: ${result.unique}`);
    console.log(`   Total Entries: ${result.total}`);
    console.log(`   Duplicates: ${result.duplicateCount} ${result.duplicateCount > 0 ? '❌ FOUND: ' + result.duplicateNos.join(', ') : '✅'}`);
    console.log(`   Range: Q${result.range[0]} - Q${result.range[1]}`);
    console.log(`   Missing: ${result.missing.length === 0 ? '✅ NONE - ALL 200 PRESENT!' : '❌ ' + result.missing.length + ' questions missing: ' + result.missing.slice(0, 20).join(', ')}`);
    console.log('');
  }
});

console.log('='.repeat(80));





