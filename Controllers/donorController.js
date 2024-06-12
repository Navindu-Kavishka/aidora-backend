const User = require('../Models/User');

// Get donors by role
exports.getDonors = async (req, res) => {
    const { role } = req.params;

    try {
        const donors = await User.find({role});
        res.status(200).json(donors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Add a new donor
exports.addDonor = async (req, res) => {
    const { firstName, lastName, email, nic, phoneNumberCountryCode, phoneNumberRest, address } = req.body;

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new donor
        const newDonor = new User({
            firstName,
            lastName,
            email,
            nic,
            role: 'User',
            phoneNumber: {
                countryCode: phoneNumberCountryCode,
                number: phoneNumberRest
            },
            address
        });

        const savedDonor = await newDonor.save();
        res.status(201).json({ message: 'Donor added successfully', donor: savedDonor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Get donor by ID
exports.getDonorById = async (req, res) => {
    const { id } = req.params;

    try {
        const donor = await User.findById(id);
        if (!donor) {
            return res.status(404).json({ message: 'Donor not found' });
        }
        res.status(200).json(donor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update donor
exports.updateDonor = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, nic, phoneNumberCountryCode, phoneNumberRest, address } = req.body;

    //console.log("update donor called");

    try {
        const updatedDonor = await User.findByIdAndUpdate(
            id,
            {
                firstName,
                lastName,
                nic,
                phoneNumber: {
                    countryCode: phoneNumberCountryCode,
                    number: phoneNumberRest
                },
                address
            },
            { new: true }
        );
        if (!updatedDonor) {
            return res.status(404).json({ message: 'Donor not found' });
        }
        res.status(200).json({ message: 'Donor updated successfully', donor: updatedDonor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteDonor = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedDonor = await User.findByIdAndDelete(id);
        if (!deletedDonor) {
            return res.status(404).json({ message: 'Donor not found' });
        }
        res.status(200).json({ message: 'Donor deleted successfully', donor: deletedDonor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
