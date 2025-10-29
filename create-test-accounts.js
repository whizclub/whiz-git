const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function createTestAccounts() {
  console.log('\n🔧 Creating Test Accounts...\n');

  try {
    // Create Test Admin
    console.log('📝 Creating Admin Account...');
    const admin = await prisma.admin.upsert({
      where: { email: 'admin@whizclub.com' },
      update: {},
      create: {
        email: 'admin@whizclub.com',
        password: await hashPassword('Admin@123'),
        name: 'Test Admin',
        role: 'ADMIN',
        isActive: true,
      },
    });
    console.log('✅ Admin created:', admin.email);

    // Create Test User 1
    console.log('\n📝 Creating User Account 1...');
    const user1 = await prisma.user.upsert({
      where: { email: 'user@test.com' },
      update: {},
      create: {
        email: 'user@test.com',
        password: await hashPassword('User@123'),
        name: 'Test User',
        phone: '9876543210',
        district: 'Visakhapatnam',
        role: 'USER',
        isActive: true,
        emailVerified: new Date(),
      },
    });
    console.log('✅ User 1 created:', user1.email);

    // Create Test User 2
    console.log('\n📝 Creating User Account 2...');
    const user2 = await prisma.user.upsert({
      where: { email: 'student@whizclub.com' },
      update: {},
      create: {
        email: 'student@whizclub.com',
        password: await hashPassword('Student@123'),
        name: 'Demo Student',
        phone: '9123456789',
        district: 'Guntur',
        role: 'USER',
        isActive: true,
        emailVerified: new Date(),
      },
    });
    console.log('✅ User 2 created:', user2.email);

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 TEST ACCOUNTS CREATED SUCCESSFULLY!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    console.log('\n👨‍💼 ADMIN LOGIN:');
    console.log('   Email:    admin@whizclub.com');
    console.log('   Password: Admin@123');
    
    console.log('\n👤 USER LOGIN 1:');
    console.log('   Email:    user@test.com');
    console.log('   Password: User@123');
    
    console.log('\n👤 USER LOGIN 2:');
    console.log('   Email:    student@whizclub.com');
    console.log('   Password: Student@123');
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n🚀 Ready to test! Visit: http://localhost:3000/login\n');

  } catch (error) {
    console.error('\n❌ Error creating test accounts:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createTestAccounts();

