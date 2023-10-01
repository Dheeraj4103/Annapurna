const BigPromise = require("../middlewares/bigPromise");
const Product = require("../models/Product");
const CustomError = require("../utils/customError");
const cloudinary = require("cloudinary");
const WhereClause = require("../utils/whereClause");
const bigPromise = require("../middlewares/bigPromise");

// user contollers
exports.testProduct = async (req, res, next) => {
  console.log(req.query);
  res.status(200).json({
    success: true,
    message: "This is test for product page",
  });
};

exports.addProduct = BigPromise(async (req, res, next) => {
  // managing images
  let imageArray = [];
  if (!req.files) {
    return next(new CustomError("Images are required"));
  }

  if (req.files) {
    console.log(req.files.photos.length);
    for (let index = 0; index < req.files.photos.length; index++) {
      const image = req.files.photos[index];
      console.log(image);
      const resp = await cloudinary.v2.uploader.upload(image.tempFilePath, {
        folder: "products",
      });

      imageArray.push({
        id: resp.public_id,
        secure_url: resp.secure_url,
      });
      console.log(imageArray);
    }
  }

  req.body.photos = imageArray;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(200).json({
    success: true,
    product,
  });
});

exports.getAllProducts = BigPromise(async (req, res, next) => {
  const resultPerPage = 6;
  const totalProductCount = await Product.countDocuments();

  const productsObj = new WhereClause(Product.find(), req.query)
    .search()
    .filter();

  let products = await productsObj.base;
  const filteredProductNumber = products.length;

  productsObj.pager(resultPerPage);
  products = await productsObj.base.clone();

  res.status(200).json({
    success: true,
    products,
    totalProductCount,
    filteredProductNumber,
  });
});

exports.getOneProduct = BigPromise(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next(new CustomError("Please Enter a product Id", 400));
  }

  const product = await Product.findById(id);

  if (!product) {
    return next(new CustomError("Product doesn't exist.", 400));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

exports.addReview = BigPromise(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  if (!product) {
    return next(new CustomError("Product doesn't exist.", 400));
  }

  const alreadyReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.comment = comment;
        rev.rating = rating;
      }
    });
  } else {
    await product.reviews.push(review);
    product.numberOfReviews = product.reviews.length;
  }

  // adjust rating
    product.ratings =
        product.reviews.reduce(
            (acc, itm) => itm.rating + acc,
            0 / product.reviews.length
        ) / product.reviews.length;
    
    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        product
    });
});

exports.deleteReview = BigPromise(async (req, res, next) => {
    const { productId } = req.query;

    const product = await Product.findById(productId);

    const reviews = product.reviews.filter(
        (rev) => rev.user.toString() !== req.user._id.toString()
    );

    const numberOfReviews = reviews.length;

    // adjust rating
    product.ratings =
        product.reviews.reduce(
            (acc, itm) => itm.rating + acc,
            0 / product.reviews.length
        ) / product.reviews.length;

    // update the product

    await Product.findByIdAndUpdate(productId, {
        reviews,
        ratings: product.ratings,
        numberOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        reviews : product.reviews
    });
});

exports.getOnlyReviewsForOneProduct = BigPromise(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
});

// admin controllers
exports.adminGetAllProducts = BigPromise(async (req, res, next) => {
  const products = await Product.find();

  if (!products) {
    return next(new CustomError("Something went wrong", 400));
  }

  res.status(200).json({
    success: true,
    products,
  });
});

exports.adminUpdateOneProduct = BigPromise(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next(new CustomError("Please enter product id", 400));
  }

  let product = await Product.findById(id);
  if (!product) {
    return next(new CustomError("Product doesn't exist.", 400));
  }
  let imagesArray = [];
  if (req.files) {
    // destroy existing images
    for (let index = 0; index < product.photos.length; index++) {
      const image = product.photos[index];
      await cloudinary.v2.uploader.destroy(image.id);
    }

    // upload new images
    for (let index = 0; index < req.files.photos.length; index++) {
      const image = req.files.photos[index];
      const uploadedImage = await cloudinary.v2.uploader.upload(
        image.tempFilePath,
        {
          folder: "products",
        }
      );

      imagesArray.push({
        id: uploadedImage.public_id,
        secure_url: uploadedImage.secure_url,
      });
    }

    req.body.photos = imagesArray;
  }

  product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

exports.adminDeleteOneProduct = BigPromise(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new CustomError("Product doesn't exist.", 400));
  }

  for (let index = 0; index < product.photos.length; index++) {
    await cloudinary.v2.uploader.destroy(product.photos[index].id);
  }

  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Product deleted !",
  });
});
