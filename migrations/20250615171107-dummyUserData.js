'use strict';

const bcrypt = require('bcrypt');
const { ulid } = require('ulid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];
    
    // Sample data arrays for variety
    const firstNames = [
      'Aare', 'Priya', 'Rahul', 'Sneha', 'Amit', 'Kavya', 'Rohan', 'Meera', 'Vikram', 'Anjali',
      'Arjun', 'Pooja', 'Karan', 'Riya', 'Suresh', 'Deepika', 'Nikhil', 'Shreya', 'Harsh', 'Neha',
      'Aditya', 'Sakshi', 'Varun', 'Isha', 'Akash', 'Tanvi', 'Siddharth', 'Kriti', 'Gaurav', 'Aditi'
    ];

    const lastNames = [
      'Sharma', 'Patel', 'Singh', 'Kumar', 'Gupta', 'Agarwal', 'Verma', 'Jain', 'Shah', 'Mehta',
      'Reddy', 'Nair', 'Iyer', 'Chopra', 'Malhotra', 'Bansal', 'Srivastava', 'Tiwari', 'Yadav', 'Mishra',
      'Khanna', 'Bhatia', 'Saxena', 'Joshi', 'Pandey', 'Arora', 'Kapoor', 'Bajaj', 'Goyal', 'Ahluwalia'
    ];

    const countries = [
      'India', 'Nepal', 'Bangladesh', 'Sri Lanka', 'Pakistan', 'Bhutan', 'Myanmar', 'Thailand',
      'Singapore', 'Malaysia', 'Indonesia', 'Philippines', 'Vietnam', 'Cambodia', 'Laos'
    ];

    const skillsList = [
      'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'Angular', 'Vue.js', 'PHP', 'C++', 'C#',
      'Ruby', 'Go', 'Rust', 'TypeScript', 'Swift', 'Kotlin', 'Flutter', 'Django', 'Spring Boot', 'Express.js',
      'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'DevOps'
    ];

    const genders = ['male', 'female'];

    const photoUrls = [
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      'https://images.unsplash.com/photo-1494790108755-2616b332c1c',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef',
      'https://images.unsplash.com/photo-1506277886164-e25aa3f4d1',
      'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
      'https://images.unsplash.com/photo-1552058544-f2b08422138a',
      'https://images.unsplash.com/photo-1463453091185-61582044d556'
    ];

    // Generate 30 users
    for (let i = 0; i < 30; i++) {
      const firstName = firstNames[i];
      const lastName = lastNames[i];
      const emailId = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i + 1}@example.com`;
      const password = 'Password123!'; // Same password for all dummy users
      const age = Math.floor(Math.random() * (45 - 18 + 1)) + 18; // Age between 18-45
      const gender = genders[Math.floor(Math.random() * genders.length)];
      const country = countries[Math.floor(Math.random() * countries.length)];
      
      // Random 2-4 skills
      const numSkills = Math.floor(Math.random() * 3) + 2;
      const userSkills = [];
      const shuffledSkills = [...skillsList].sort(() => 0.5 - Math.random());
      for (let j = 0; j < numSkills; j++) {
        userSkills.push(shuffledSkills[j]);
      }
      const skills = userSkills.join(', ');
      
      const photoUrl = photoUrls[Math.floor(Math.random() * photoUrls.length)];
      
      // Hash password and generate ULID
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUlid = ulid();

      users.push({
        firstName,
        lastName,
        emailId,
        password: hashedPassword,
        age,
        gender,
        country,
        skills,
        photoUrl,
        ulid: newUlid,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Insert all users
    await queryInterface.bulkInsert('user', users, {});
    
    console.log('✅ Successfully inserted 30 dummy users');
    console.log('📧 All users have password: Password123!');
  },

  async down(queryInterface, Sequelize) {
    // Delete all users that were created by this migration
    // You might want to be more specific with the WHERE clause
    await queryInterface.bulkDelete('user', {
      emailId: {
        [Sequelize.Op.like]: '%.%@example.com'
      }
    }, {});
    
    console.log('🗑️  Successfully removed dummy users');
  }
};