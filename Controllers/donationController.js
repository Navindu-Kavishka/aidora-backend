const Donation = require('../Models/Donation');
const Project = require('../Models/Project');
const sendEmail = require("../Config/email");

exports.donate = async (req, res) => {
    const { projectId, amount, paymentMethod } = req.body;
    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }
        const newDonation = new Donation({
            project: projectId,
            user: req.user.id,
            amount,
            paymentMethod
        });
        const donation = await newDonation.save();

        project.currentAmount += amount;
        await project.save();

        sendEmail(req.user.email, 'Donation Receipt', `Thank you for your donation of $${amount} to ${project.title}.`);

        res.json(donation);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
