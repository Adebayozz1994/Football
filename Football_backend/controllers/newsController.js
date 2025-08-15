const News = require("../models/News");
const cloudinary = require("../utils/cloudinary");
const streamifier = require("streamifier");

// CREATE news
const createNews = async (req, res) => {
  try {
    const { title, category, author, description, date } = req.body;
    let imageUrl = "";

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const upload_stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "image",
            folder: "news",
            format: "webp", 
            quality: "auto", 
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(upload_stream);
      });
      imageUrl = result.secure_url;
    }

    const news = new News({
      title,
      category,
      author,
      description,
      date,
      image: imageUrl,
    });
    await news.save();
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ all news with optional filtering & pagination
const getAllNews = async (req, res) => {
  try {
    const { category, author, date, page = 1, limit = 20 } = req.query;
    let filter = {};
    if (category) filter.category = new RegExp(category, 'i');
    if (author) filter.author = new RegExp(author, 'i');
    if (date) {
      // Create a date range for the entire day
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      filter.date = {
        $gte: startDate,
        $lt: endDate
      };
    }
    const newsItems = await News.find(filter)
      .sort({ date: -1 })
      .skip((page - 1) * parseInt(limit))
      .limit(parseInt(limit));
    res.json(newsItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ single news
const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE news (with file upload support)
const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    let updateFields = req.body;

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const upload_stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "image",
            folder: "news",
            format: "webp", 
            quality: "auto", 
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(upload_stream);
      });
      updateFields.image = result.secure_url;
    }

    const news = await News.findByIdAndUpdate(id, updateFields, { new: true, runValidators: true });
    if (!news) return res.status(404).json({ message: "News not found" });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE news
const deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });
    res.json({ message: "News deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
};