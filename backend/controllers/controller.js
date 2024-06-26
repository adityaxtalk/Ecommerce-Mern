const AppError = require("../utils/appError");

const User = require("../models/login.model");
const Product = require("../models/product.model");


exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({message: "Invalid Email or Password"});
        }
       
        if (user.password !== password) {
            return res.status(400).json({message: 'Invalid Email or Password'});
        }

        res.status(200).json({message: 'Login successful'});
    } catch (error) {
        return next(new AppError(error, 500));
    }
}


exports.addUser = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and Password are required' });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        const newUser = new User({ email, password });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        return next(new AppError(error, 500));
    }
};

exports.getAllItem = (req, res, next) => {
    Product.find().then(products => {
        res.status(200).send(products);
    }).catch(err=> {
        return next(new AppError(err, 500));
    })
}

exports.addProduct = async (req, res, next) => {
    const { name, price, was, weight, imageUrl, popular, type } = req.body;

    if (!name || !price) {
        return res.status(400).json({ message: 'Name and Price are required' });
    }

    try {
        const newProduct = new Product({
            name,
            price,
            originalPrice,
            quantity,
            image,
            availability,
            category
        });

        await newProduct.save();

        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        return next(new AppError(error, 500));
    }
}

exports.addProducts = async (req, res, next) => {
    const products = req.body;

    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: 'Products array is required' });
    }

    try {
        const createdProducts = await Product.insertMany(products);

        res.status(201).json({ message: 'Products created successfully', products: createdProducts });
    } catch (error) {
        return next(new AppError(error, 500));
    }
};