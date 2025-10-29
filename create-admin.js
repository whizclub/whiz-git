const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const readline = require('readline');

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function createAdmin() {
  console.log('\n🔐 WhizClub Admin Account Setup\n');
  console.log('This script will help you create an admin account.\n');

  try {
    const name = await question('Enter admin name: ');
    const email = await question('Enter admin email: ');
    const password = await question('Enter admin password: ');

    if (!name || !email || !password) {
      console.error('\n❌ All fields are required!');
      process.exit(1);
    }

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      console.log('\n⚠️  Admin with this email already exists!');
      const overwrite = await question('Do you want to update the password? (yes/no): ');
      
      if (overwrite.toLowerCase() === 'yes' || overwrite.toLowerCase() === 'y') {
        await prisma.admin.update({
          where: { email },
          data: {
            name,
            password: await hashPassword(password),
          },
        });
        console.log('\n✅ Admin account updated successfully!');
      } else {
        console.log('\n❌ Operation cancelled.');
      }
    } else {
      await prisma.admin.create({
        data: {
          name,
          email,
          password: await hashPassword(password),
          role: 'ADMIN',
          isActive: true,
        },
      });
      console.log('\n✅ Admin account created successfully!');
    }

    console.log('\nYou can now login at: http://localhost:3000/admin/login');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}\n`);
  } catch (error) {
    console.error('\n❌ Error creating admin:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    rl.close();
  }
}

createAdmin();

