#!/usr/bin/env node

/**
 * Pre-deployment Check Script
 * Run this before deploying to VPS to ensure everything is ready
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 WhizClub - Pre-Deployment Check\n');

const checks = {
  passed: 0,
  failed: 0,
  warnings: 0,
};

// Check 1: package.json exists and has required scripts
console.log('📦 Checking package.json...');
try {
  const packageJson = require('../package.json');
  if (packageJson.scripts.build && packageJson.scripts.start) {
    console.log('✅ Build and start scripts found');
    checks.passed++;
  } else {
    console.log('❌ Missing build or start scripts');
    checks.failed++;
  }
} catch (error) {
  console.log('❌ package.json not found');
  checks.failed++;
}

// Check 2: next.config.js exists
console.log('\n⚙️  Checking next.config.js...');
if (fs.existsSync(path.join(__dirname, '../next.config.js'))) {
  console.log('✅ next.config.js found');
  checks.passed++;
} else {
  console.log('❌ next.config.js not found');
  checks.failed++;
}

// Check 3: .gitignore includes sensitive files
console.log('\n🔒 Checking .gitignore...');
if (fs.existsSync(path.join(__dirname, '../.gitignore'))) {
  const gitignore = fs.readFileSync(path.join(__dirname, '../.gitignore'), 'utf8');
  if (gitignore.includes('.env') && gitignore.includes('node_modules')) {
    console.log('✅ .gitignore properly configured');
    checks.passed++;
  } else {
    console.log('⚠️  .gitignore may be incomplete');
    checks.warnings++;
  }
} else {
  console.log('❌ .gitignore not found');
  checks.failed++;
}

// Check 4: No .env file committed
console.log('\n🔐 Checking for .env files...');
const envFiles = ['.env', '.env.local', '.env.production'];
let envFound = false;
envFiles.forEach(file => {
  if (fs.existsSync(path.join(__dirname, `../${file}`))) {
    console.log(`⚠️  Found ${file} - Make sure it's in .gitignore!`);
    envFound = true;
    checks.warnings++;
  }
});
if (!envFound) {
  console.log('✅ No .env files in root (good for deployment)');
  checks.passed++;
}

// Check 5: Prisma schema exists
console.log('\n🗄️  Checking Prisma setup...');
if (fs.existsSync(path.join(__dirname, '../prisma/schema.prisma'))) {
  console.log('✅ Prisma schema found');
  checks.passed++;
} else {
  console.log('⚠️  No Prisma schema found');
  checks.warnings++;
}

// Check 6: Build test
console.log('\n🏗️  Testing build process...');
console.log('ℹ️  Run "npm run build" manually to test build');

// Check 7: Metadata check
console.log('\n📄 Checking metadata...');
try {
  const layoutContent = fs.readFileSync(path.join(__dirname, '../src/app/layout.tsx'), 'utf8');
  if (layoutContent.includes('WhizClub')) {
    console.log('✅ Branding set to WhizClub');
    checks.passed++;
  } else if (layoutContent.includes('ExamAura')) {
    console.log('⚠️  Still showing ExamAura branding - should be WhizClub');
    checks.warnings++;
  }
} catch (error) {
  console.log('⚠️  Could not check layout.tsx');
  checks.warnings++;
}

// Final Report
console.log('\n' + '='.repeat(50));
console.log('📊 DEPLOYMENT READINESS REPORT\n');
console.log(`✅ Passed: ${checks.passed}`);
console.log(`⚠️  Warnings: ${checks.warnings}`);
console.log(`❌ Failed: ${checks.failed}`);
console.log('='.repeat(50));

if (checks.failed === 0) {
  console.log('\n🎉 Great! Your project is ready for VPS deployment!');
  console.log('\n📝 Next Steps:');
  console.log('1. SSH into your VPS server');
  console.log('2. Clone repository: git clone https://github.com/whizclub/whiz-git.git');
  console.log('3. Follow: HOSTINGER_VPS_COMPLETE_DEPLOYMENT.md');
  console.log('4. Setup PostgreSQL database');
  console.log('5. Configure environment variables');
  console.log('6. Build and start with PM2');
} else {
  console.log('\n⚠️  Please fix the failed checks before deploying.');
  process.exit(1);
}

if (checks.warnings > 0) {
  console.log('\n⚠️  You have some warnings to review.');
}

console.log('\n✨ Good luck with your deployment!\n');

