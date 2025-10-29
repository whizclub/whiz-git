const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function seedUserData() {
  console.log('🌱 Seeding user authentication data...\n');

  try {
    // Update existing users with passwords
    const existingUsers = await prisma.user.findMany();
    
    if (existingUsers.length > 0) {
      console.log(`Updating ${existingUsers.length} existing users with passwords...`);
      
      for (const user of existingUsers) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            password: await hashPassword('user123'),
            role: 'USER',
          },
        });
      }
      
      console.log('✅ Existing users updated!');
    }

    // Create a new demo user if none exist
    if (existingUsers.length === 0) {
      await prisma.user.create({
        data: {
          name: 'Demo User',
          email: 'user@whizclub.com',
          password: await hashPassword('user123'),
          phone: '9876543210',
          role: 'USER',
        },
      });
      console.log('✅ Demo user created!');
    }

    console.log('\n📧 Login Credentials:');
    console.log('Email: rajesh@example.com (or user@whizclub.com)');
    console.log('Password: user123\n');
    
  } catch (error) {
    console.error('\n❌ Error seeding user data:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedUserData();

