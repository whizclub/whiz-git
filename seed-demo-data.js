const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function seedDemoData() {
  console.log('🌱 Seeding demo data...\n');

  try {
    // Create demo users
    console.log('Creating demo users...');
    const user1 = await prisma.user.create({
      data: {
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        password: await hashPassword('user123'),
        phone: '9876543210',
        role: 'USER',
        isActive: true,
      },
    });

    const user2 = await prisma.user.create({
      data: {
        name: 'Priya Sharma',
        email: 'priya@example.com',
        password: await hashPassword('user123'),
        phone: '9876543211',
        role: 'USER',
        isActive: true,
      },
    });

    // Create demo purchases
    console.log('Creating demo purchases...');
    await prisma.purchase.createMany({
      data: [
        {
          userId: user1.id,
          courseId: 'demo-course-1',
          courseName: 'AP Constable Complete Course',
          amount: 2999,
          status: 'COMPLETED',
          paymentMode: 'UPI',
          transactionId: 'TXN' + Date.now(),
        },
        {
          userId: user2.id,
          courseId: 'demo-course-2',
          courseName: 'AP Sub-Inspector Course',
          amount: 4999,
          status: 'COMPLETED',
          paymentMode: 'Card',
          transactionId: 'TXN' + (Date.now() + 1),
        },
      ],
    });

    // Create demo MCQ test
    console.log('Creating demo MCQ test...');
    const test = await prisma.mCQTest.create({
      data: {
        title: 'AP Constable Mock Test 1',
        description: 'Full-length mock test for AP Constable exam preparation',
        category: 'AP Constable',
        duration: 120,
        totalMarks: 100,
        passingMarks: 40,
        isActive: true,
      },
    });

    // Add sample questions
    console.log('Adding sample questions...');
    await prisma.mCQQuestion.createMany({
      data: [
        {
          testId: test.id,
          questionNo: 1,
          subject: 'General Studies',
          question: 'Who is the current Chief Minister of Andhra Pradesh?',
          optionA: 'Y. S. Jagan Mohan Reddy',
          optionB: 'N. Chandrababu Naidu',
          optionC: 'Pawan Kalyan',
          optionD: 'K. Chandrashekar Rao',
          correctAnswer: 'B',
          explanation: 'N. Chandrababu Naidu is the current Chief Minister of Andhra Pradesh.',
          marks: 1,
          negativeMarks: 0.25,
        },
        {
          testId: test.id,
          questionNo: 2,
          subject: 'Mathematics',
          question: 'What is 15% of 200?',
          optionA: '25',
          optionB: '30',
          optionC: '35',
          optionD: '40',
          correctAnswer: 'B',
          explanation: '15% of 200 = (15/100) × 200 = 30',
          marks: 1,
          negativeMarks: 0.25,
        },
        {
          testId: test.id,
          questionNo: 3,
          subject: 'Reasoning',
          question: 'If POLICE is coded as QPMJDF, how is CRIME coded?',
          optionA: 'DSJNF',
          optionB: 'DSJOF',
          optionC: 'DQJNF',
          optionD: 'DQJOF',
          correctAnswer: 'A',
          explanation: 'Each letter is shifted by +1 in the alphabet.',
          marks: 1,
          negativeMarks: 0.25,
        },
      ],
    });

    // Create test attempts
    console.log('Creating demo test attempts...');
    await prisma.testAttempt.createMany({
      data: [
        {
          userId: user1.id,
          testId: test.id,
          score: 75,
          totalQuestions: 100,
          correctAnswers: 75,
          wrongAnswers: 20,
          unattempted: 5,
          timeTaken: 6000,
          isPassed: true,
        },
        {
          userId: user2.id,
          testId: test.id,
          score: 65,
          totalQuestions: 100,
          correctAnswers: 65,
          wrongAnswers: 30,
          unattempted: 5,
          timeTaken: 5400,
          isPassed: true,
        },
      ],
    });

    console.log('\n✅ Demo data seeded successfully!');
    console.log('\nCreated:');
    console.log('- 2 demo users');
    console.log('- 2 demo purchases');
    console.log('- 1 MCQ test with 3 questions');
    console.log('- 2 test attempts\n');
  } catch (error) {
    console.error('\n❌ Error seeding data:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedDemoData();

