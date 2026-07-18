import Product from '../models/Product.js';

// GET /api/products  (public) — supports ?category= and ?search=
export const getProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = {};

    if (category && category !== 'All Flowers') {
      filter.category = category;
    }
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// GET /api/products/:id  (public)
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Flower not found' });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// POST /api/products  (admin only)
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, image, stock, buildable } = req.body;

    if (!name || price === undefined || price === null) {
      return res.status(400).json({ message: 'Name and price are required' });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      image,
      stock,
      buildable: !!buildable,
    });

    res.status(201).json({ product });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// PUT /api/products/:id  (admin only)
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, image, stock, buildable } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Flower not found' });
    }

    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (category !== undefined) product.category = category;
    if (image !== undefined) product.image = image;
    if (stock !== undefined) product.stock = stock;
    if (buildable !== undefined) product.buildable = !!buildable;

    await product.save();

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// DELETE /api/products/:id  (admin only)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Flower not found' });
    }
    res.status(200).json({ message: 'Flower deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};
