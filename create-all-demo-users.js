const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function createAllDemoUsers() {
  console.log('\n🔧 Creating All Demo Users...\n');

  try {
    // Demo User 1: Rajesh Kumar
    console.log('📝 Creating Demo User 1...');
    const user1 = await prisma.user.upsert({
      where: { email: 'rajesh@example.com' },
      update: {
        password: await hashPassword('user123'),
        isActive: true,
        role: 'USER',
      },
      create: {
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        password: await hashPassword('user123'),
        phone: '9876543210',
        role: 'USER',
        isActive: true,
      },
    });
    console.log('✅ Demo User 1 created/updated:', user1.email);

    // Demo User 2: user@whizclub.com
    console.log('\n📝 Creating Demo User 2...');
    const user2 = await prisma.user.upsert({
      where: { email: 'user@whizclub.com' },
      update: {
        password: await hashPassword('user123'),
        isActive: true,
        role: 'USER',
      },
      create: {
        name: 'Demo User',
        email: 'user@whizclub.com',
        password: await hashPassword('user123'),
        phone: '9876543211',
        role: 'USER',
        isActive: true,
      },
    });
    console.log('✅ Demo User 2 created/updated:', user2.email);

    // Demo User 3: demo@example.com
    console.log('\n📝 Creating Demo User 3...');
    const user3 = await prisma.user.upsert({
      where: { email: 'demo@example.com' },
      update: {
        password: await hashPassword('user123'),
        isActive: true,
        role: 'USER',
      },
      create: {
        name: 'Demo Student',
        email: 'demo@example.com',
        password: await hashPassword('user123'),
        phone: '9876543212',
        role: 'USER',
        isActive: true,
      },
    });
    console.log('✅ Demo User 3 created/updated:', user3.email);

    // Create Admin Account
    console.log('\n📝 Creating Admin Account...');
    await prisma.user.upsert({
      where: { email: 'test1@gmail.com' },
      update: {
        password: await hashPassword('test123'),
        role: 'ADMIN',
        isActive: true,
      },
      create: {
        name: 'Test Admin',
        email: 'test1@gmail.com',
        password: await hashPassword('test123'),
        phone: '9999999999',
        role: 'ADMIN',
        isActive: true,
      },
    });
    console.log('✅ Admin account created/updated');

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 ALL DEMO USERS CREATED SUCCESSFULLY!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('📧 User Login Credentials:\n');
    console.log('Demo User 1:');
    console.log('  Email: rajesh@example.com');
    console.log('  Password: user123\n');

    console.log('Demo User 2:');
    console.log('  Email: user@whizclub.com');
    console.log('  Password: user123\n');

    console.log('Demo User 3:');
    console.log('  Email: demo@example.com');
    console.log('  Password: user123\n');

    console.log('Admin Account:');
    console.log('  Email: test1@gmail.com');
    console.log('  Password: test123\n');

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    console.error('\n❌ Error creating demo users:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

createAllDemoUsers()
  .then(() => {
    console.log('✅ All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });



