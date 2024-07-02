const bcrypt = require('bcryptjs');

const storedHashedPassword ="$2a$10$3d4vA3aX7ooh2KQbUCjZB.89dv92u/72UbSE4NhESA0jvDmqmD8sK"; // Replace this with the actual hashed password from the database
const providedPassword = 'adminpassword'; // Replace this with the password you are testing

bcrypt.compare(providedPassword, storedHashedPassword, (err, isMatch) => {
    if (err) {
        console.error("Error during comparison:", err);
    } else if (isMatch) {
        console.log("Passwords match!");
    } else {
        console.log("Passwords do not match.");
    }
});
