#!/usr/bin/env node

/**
 * Quick PhonePe Configuration Verification Script
 * Run this to check if everything is set up correctly
 */

const fs = require('fs');
const crypto = require('crypto');

// Load .env.local manually
function loadEnv() {
  try {
    const envContent = fs.readFileSync('.env.local', 'utf8');
    const lines = envContent.split('\n');
    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length) {
        let value = valueParts.join('=').trim();
        // Remove quotes if present
        value = value.replace(/^["']|["']$/g, '');
        process.env[key.trim()] = value;
      }
    });
  } catch (error) {
    // .env.local not found or error reading
  }
}

loadEnv();

console.log('\n╔════════════════════════════════════════════════╗');
console.log('║   PhonePe Payment Gateway - Quick Verify      ║');
console.log('╚════════════════════════════════════════════════╝\n');

let allGood = true;

// Check 1: Environment file exists
if (!fs.existsSync('.env.local')) {
  console.log('❌ .env.local file not found!');
  allGood = false;
} else {
  console.log('✅ .env.local file exists');
}

// Check 2: Required variables
const checks = [
  { name: 'PHONEPE_MERCHANT_ID', expected: 'PGTESTPAYUAT' },
  { name: 'PHONEPE_SALT_KEY', hasValue: true },
  { name: 'PHONEPE_SALT_INDEX', expected: '1' },
  { name: 'PHONEPE_API_URL', hasValue: true },
  { name: 'NEXTAUTH_URL', hasValue: true }
];

console.log('\n📋 Checking Environment Variables:\n');

checks.forEach(check => {
  const value = process.env[check.name];
  
  if (!value) {
    console.log(`❌ ${check.name}: MISSING`);
    allGood = false;
  } else if (check.expected && value !== check.expected) {
    console.log(`⚠️  ${check.name}: ${value} (expected: ${check.expected})`);
  } else {
    console.log(`✅ ${check.name}: ${check.hasValue ? 'SET' : value}`);
  }
});

// Check 3: Test checksum generation
console.log('\n🔐 Testing Checksum Generation:\n');

try {
  const saltKey = process.env.PHONEPE_SALT_KEY;
  if (!saltKey) {
    console.log('❌ Cannot test checksum - SALT_KEY missing');
    allGood = false;
  } else {
    const testData = JSON.stringify({ test: 'verification' });
    const base64 = Buffer.from(testData).toString('base64');
    const checksumString = base64 + '/pg/v1/pay' + saltKey;
    const checksum = crypto.createHash('sha256').update(checksumString).digest('hex');
    
    console.log('✅ Checksum generation successful');
    console.log(`   Sample: ${checksum.substring(0, 32)}...`);
  }
} catch (error) {
  console.log('❌ Checksum generation failed:', error.message);
  allGood = false;
}

// Summary
console.log('\n╔════════════════════════════════════════════════╗');

if (allGood) {
  console.log('║           ✅ ALL CHECKS PASSED!                ║');
  console.log('╚════════════════════════════════════════════════╝\n');
  console.log('🎉 PhonePe configuration is correct!\n');
  console.log('📝 Next Steps:');
  console.log('   1. RESTART your dev server: npm run dev');
  console.log('   2. Login at: http://localhost:3000/login');
  console.log('   3. Test payment: http://localhost:3000/payment\n');
  console.log('💳 Test Card: 4111 1111 1111 1111 | CVV: 123 | Exp: 12/25\n');
} else {
  console.log('║           ❌ CONFIGURATION ISSUES              ║');
  console.log('╚════════════════════════════════════════════════╝\n');
  console.log('⚠️  Please fix the issues above and try again.\n');
  console.log('💡 Solution: Make sure .env.local has all PhonePe credentials');
  console.log('   See: PAYMENT_ERROR_FIXED.md for details\n');
}

