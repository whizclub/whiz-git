const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function createDefaultAdmin() {
  try {
    const admin = await prisma.admin.create({
      data: {
        name: 'Admin',
        email: 'admin@whizclub.com',
        password: await hashPassword('admin123'),
        role: 'ADMIN',
        isActive: true,
      },
    });

    console.log('\n✅ Default admin account created successfully!');
    console.log('\n📧 Email: admin@whizclub.com');
    console.log('🔑 Password: admin123');
    console.log('\n🌐 Login at: http://localhost:3000/admin/login\n');
  } catch (error) {
    if (error.code === 'P2002') {
      console.log('\n⚠️  Admin account already exists!');
      console.log('\n📧 Email: admin@whizclub.com');
      console.log('🔑 Password: admin123');
      console.log('\n🌐 Login at: http://localhost:3000/admin/login\n');
    } else {
      console.error('\n❌ Error creating admin:', error.message);
      process.exit(1);
    }
  } finally {
    await prisma.$disconnect();
  }
}

createDefaultAdmin();

