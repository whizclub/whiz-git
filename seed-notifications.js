const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const sampleNotifications = [
  {
    title: 'AP Police Constable Recruitment 2024',
    description: 'Recruitment for Constable posts in Andhra Pradesh Police Department. Apply online for 1500 vacancies.',
    examName: 'AP Police Constable',
    organization: 'Andhra Pradesh Police Department',
    category: 'Police',
    totalPosts: 1500,
    eligibility: '10th/12th Pass, Age 18-28 years',
    applicationFee: '₹500',
    priority: 'high',
    examDate: new Date('2024-04-20'),
    lastDate: new Date('2024-03-15'),
    website: 'https://apstatepolice.gov.in',
    isActive: true
  },
  {
    title: 'AP Sub-Inspector Recruitment 2024',
    description: 'Recruitment for Sub-Inspector posts in Andhra Pradesh Police Department. Apply online for 200 vacancies.',
    examName: 'AP Police Sub-Inspector',
    organization: 'Andhra Pradesh Police Department',
    category: 'Police',
    totalPosts: 200,
    eligibility: 'Graduation, Age 21-30 years',
    applicationFee: '₹600',
    priority: 'high',
    examDate: new Date('2024-05-15'),
    lastDate: new Date('2024-03-20'),
    website: 'https://apstatepolice.gov.in',
    isActive: true
  },
  {
    title: 'SSC CGL 2024 Notification',
    description: 'Combined Graduate Level Examination 2024 for various Group B and Group C posts.',
    examName: 'SSC CGL',
    organization: 'Staff Selection Commission',
    category: 'SSC',
    totalPosts: 17727,
    eligibility: 'Graduation, Age 18-32 years',
    applicationFee: '₹100',
    priority: 'medium',
    examDate: new Date('2024-06-01'),
    lastDate: new Date('2024-04-10'),
    website: 'https://ssc.nic.in',
    isActive: true
  },
  {
    title: 'IBPS PO 2024 Notification',
    description: 'Probationary Officer recruitment in various public sector banks across India.',
    examName: 'IBPS PO',
    organization: 'Institute of Banking Personnel Selection',
    category: 'Banking',
    totalPosts: 3049,
    eligibility: 'Graduation, Age 20-30 years',
    applicationFee: '₹850',
    priority: 'high',
    examDate: new Date('2024-05-20'),
    lastDate: new Date('2024-03-25'),
    website: 'https://ibps.in',
    isActive: true
  },
  {
    title: 'Railway Group D 2024',
    description: 'Recruitment for Group D posts in Indian Railways across various zones.',
    examName: 'Railway Group D',
    organization: 'Railway Recruitment Board',
    category: 'Railway',
    totalPosts: 103769,
    eligibility: '10th Pass, Age 18-33 years',
    applicationFee: '₹500',
    priority: 'medium',
    examDate: new Date('2024-06-10'),
    lastDate: new Date('2024-04-05'),
    website: 'https://rrbcdg.gov.in',
    isActive: true
  }
];

async function seedNotifications() {
  try {
    console.log('Seeding notifications...');
    
    // Clear existing notifications
    await prisma.examNotification.deleteMany();
    console.log('Cleared existing notifications');
    
    // Add sample notifications
    for (const notification of sampleNotifications) {
      await prisma.examNotification.create({
        data: notification
      });
      console.log(`Added: ${notification.title}`);
    }
    
    console.log('Successfully seeded notifications!');
  } catch (error) {
    console.error('Error seeding notifications:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedNotifications();

