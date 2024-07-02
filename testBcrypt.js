const bcrypt = require('bcryptjs');

const passwordToHash = 'adminpassword'; // The password you want to hash and test

// Hash the password
bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(passwordToHash, salt, (err, generatedHash) => {
        if (err) throw err;
        console.log("Generated Hash:", generatedHash);

        // Compare the provided password with the newly generated hash
        bcrypt.compare(passwordToHash, generatedHash, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                console.log("Passwords match!");
            } else {
                console.log("Passwords do not match.");
            }
        });
    });
});
