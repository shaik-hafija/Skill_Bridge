const express = require('express')
const app = express()
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer');
const port = 5000

const userReg = require('./models/UsersRegistration')
const profReg = require('./models/ProfessionalsRegistration')

const url = "mongodb+srv://hafijashaik7876:gtL5Qi18C7M0oFOa@cluster0.pkpht.mongodb.net/Tepnoty_Users?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
});
db.once('open', () => {
    console.log('Connected successfully to MongoDB');
});

app.use(express.json())
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    // console.log("Hi, server is running ");
    if (res.cookie.jwt) {
        const verify = jwt.verify(req.cookies.jwt, "ThisisTechTalentConnectStartUp")
        res.send("email", verify.email)
    } else {
        res.send("Hi, server is running")
    }
})

async function hashpass(password) {
    if (!password) {
        throw new Error('Password is required');
    }
    const res = await bcrypt.hash(password, 10);
    return res;
}

async function compare(userpass, hashpass) {
    const res = await bcrypt.compare(userpass, hashpass)
    return res
}

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage });

app.post('/ProfReg', upload.fields([{ name: 'demoImages' }, { name: 'demoVideos' }]), async (req, res) => {
    const { fullName, email, phone, password, confirmPassword, skills, price, gender, about } = req.body;

    // Extract file names instead of full paths
    const demoImages = req.files['demoImages'] ? req.files['demoImages'].map(file => path.basename(file.path)) : [];
    const demoVideos = req.files['demoVideos'] ? req.files['demoVideos'].map(file => path.basename(file.path)) : [];

    try {
        const check = await profReg.findOne({ email: email });
        if (check) {
            return res.status(400).send("User details already exist");
        }
        const data = {
            fullName: fullName,
            email: email,
            phone: phone,
            password: await hashpass(password), // Use the hashed password here
            skills: skills,
            price: price,
            gender: gender,
            about: about,
            demoImages: demoImages,
            demoVideos: demoVideos
        };
        console.log(data);

        // Create and save new user
        const user = new profReg(data);
        await user.save();
        res.send('Registration successful');
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('Internal server error');
    }
});
app.get('/service/:name', async (req, res) => {
    try {
        const serviceName = req.params.name;
        console.log(serviceName);
        
        const services = await profReg.find({ skills: serviceName }); // Query by the 'skills' field to get all matching documents
console.log(services)
        if (services.length === 0) {
            return res.status(404).send('Services not found');
        }

        res.json(services); // Send back all matching services
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.post('/userReg', async (req, res) => {
    const { name, email, phone_number, InterestedAreas, password } = req.body;
    console.log(name, email, phone_number, InterestedAreas, password);

    try {
        if (!email || !password) {
            return res.status(400).send("Email and Password are required");
        }

        const check = await userReg.findOne({ email: email });
        if (check) {
            return res.status(400).send("User details already exist");
        }
        const token = jwt.sign({ email: email }, "ThisisTechTalentConnectStartUp");
        res.cookie("jwt", token, {
            maxAge: 700000,
            httpOnly: true
        });
        const hashedPassword = await hashpass(password);
        const data = {
            name: name,
            email: email,
            phone_number: phone_number,
            InterestedAreas: InterestedAreas,
            password: hashedPassword,
            token: token
        };
        console.log(data);
        const user = new userReg(data);
        await user.save();
        return res.status(201).send({ message: "User registered successfully", token: token });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).send("An error occurred during registration.");
    }
});


app.post('/ulogin', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const check = await userReg.findOne({ email: email });

        // Check if user exists and password is correct
        if (check && await compare(password, check.password)) {
            // Set the cookie with the token
            res.cookie("jwt", check.token, {
                maxAge: 700000,
                httpOnly: true
            });
            return res.status(201).send({ message: "Successfully logged in" });
        } else {
            return res.status(400).send("Invalid Credentials");
        }
    } catch (err) {
        console.log("Error during login:", err);
        return res.status(500).send("An error occurred during login.");
    }
});
app.get('/get_videos', async (req, res) => {
    try {
        const profiles = await profReg.find({}, { demoVideos: 1, _id: 0 }); // Fetch only demoVideos field
        const videos = profiles.flatMap(profile => profile.demoVideos);
        console.log(videos)
        res.json(videos);
    } catch (error) {
        console.error('Error fetching video data:', error);
        res.status(500).json({ message: 'Error fetching video data' });
    }
});

app.post('/Plogin', async (req, res) => {
    const { email, password } = req.body;
    console.log(email,password);
    
    try {
        // Find the user by email
        const check = await profReg.findOne({ email: email });
        console.log(check);

        // Check if user exists and password is correct
        if (check && await compare(password, check.password)) {
            // Set the cookie with the token
            res.cookie("jwt", check.token, {
                maxAge: 700000,
                httpOnly: true
            });
            return res.status(201).send({ message: "Successfully logged in" });
        } else {
            return res.status(400).send("Invalid Credentials");
        }
    } catch (err) {
        console.log("Error during login:", err);
        return res.status(500).send("An error occurred during login.");
    }
});

// Set up Nodemailer transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ssyedmahaboobsubani@gmail.com',  // Your Gmail address
        pass: 'dnlj ffjo cyfc jxyr'     // Use the app password you generated
    }
});
app.post('/book', (req, res) => {
    const { handType, numberOfHands, address, startTime, endTime, userEmail } = req.body;

    if (!handType || !numberOfHands || !address || !startTime || !endTime || !userEmail) {
        return res.status(400).send('All fields are required.');
    }

    // Calculate total price
    const price = handType === 'half' ? 500 : 1000;
    const totalPrice = price * numberOfHands;

    // Send confirmation email to user
    const mailOptions = {
        from: 'ssyedmahaboobsubani@gmail.com',
        to: userEmail,
        subject: 'Booking Confirmation',
        text: `Thank you for booking with us! Here are the details of your booking:
      
      Hand Type: ${handType}
      Number of Hands: ${numberOfHands}
      Address: ${address}
      Start Time: ${startTime}
      End Time: ${endTime}
      Total Price: ₹${totalPrice}
      
      We will get in touch with you within 2-3 days to confirm your booking.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Error sending email');
        }
        res.status(200).send('Booking confirmed! You will receive a confirmation email shortly.');
    });
});

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
})
