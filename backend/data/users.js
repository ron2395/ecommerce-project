import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'admin',
        email: 'test@test.com',
        password: bcrypt.hashSync('admin123', 10),
        isAdmin: true
    },
    {
        name: 'Ron',
        email: 'ron@test.com',
        password: bcrypt.hashSync('ron123', 10),
    },
    {
        name: 'Mon',
        email: 'mon@test.com',
        password: bcrypt.hashSync('mon123', 10),
    }
];

export default users;