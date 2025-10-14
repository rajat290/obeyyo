const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

class FileUploadService {
  constructor() {
    this.cloudinary = cloudinary;
  }

  // Create multer storage for different file types
  createStorage(folder, allowedFormats = ['jpg', 'jpeg', 'png', 'webp']) {
    return new CloudinaryStorage({
      cloudinary: this.cloudinary,
      params: {
        folder: folder,
        format: async (req, file) => {
          const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
          return allowedFormats.includes(ext) ? ext : 'jpg';
        },
        public_id: (req, file) => {
          const timestamp = Date.now();
          const random = Math.random().toString(36).substring(2, 8);
          return `${file.fieldname}_${timestamp}_${random}`;
        },
        transformation: [
          { width: 1200, height: 1200, crop: 'limit' }, // Max dimensions
          { quality: 'auto' }, // Auto quality optimization
          { fetch_format: 'auto' } // Auto format selection
        ]
      }
    });
  }

  // Create multer upload middleware
  createUploadMiddleware(folder, allowedFormats, maxFiles = 1) {
    const storage = this.createStorage(folder, allowedFormats);

    return multer({
      storage: storage,
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
        files: maxFiles
      },
      fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const isValidFormat = allowedFormats.some(format =>
          ext === `.${format}` || ext === format
        );

        if (!isValidFormat) {
          return cb(new Error(`Invalid file format. Allowed: ${allowedFormats.join(', ')}`), false);
        }

        cb(null, true);
      }
    });
  }

  // Upload single file
  async uploadSingle(file, folder = 'general', options = {}) {
    try {
      const result = await this.cloudinary.uploader.upload(file.path, {
        folder: folder,
        ...options
      });

      return {
        success: true,
        url: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        width: result.width,
        height: result.height,
        bytes: result.bytes
      };
    } catch (error) {
      throw new Error(`File upload failed: ${error.message}`);
    }
  }

  // Upload multiple files
  async uploadMultiple(files, folder = 'general', options = {}) {
    try {
      const uploadPromises = files.map(file =>
        this.cloudinary.uploader.upload(file.path, {
          folder: folder,
          ...options
        })
      );

      const results = await Promise.all(uploadPromises);

      return results.map(result => ({
        success: true,
        url: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        width: result.width,
        height: result.height,
        bytes: result.bytes
      }));
    } catch (error) {
      throw new Error(`Multiple file upload failed: ${error.message}`);
    }
  }

  // Delete file from Cloudinary
  async deleteFile(publicId) {
    try {
      const result = await this.cloudinary.uploader.destroy(publicId);
      return {
        success: true,
        result: result
      };
    } catch (error) {
      throw new Error(`File deletion failed: ${error.message}`);
    }
  }

  // Delete multiple files
  async deleteMultipleFiles(publicIds) {
    try {
      const deletePromises = publicIds.map(publicId =>
        this.cloudinary.uploader.destroy(publicId)
      );

      const results = await Promise.all(deletePromises);
      return {
        success: true,
        results: results
      };
    } catch (error) {
      throw new Error(`Multiple file deletion failed: ${error.message}`);
    }
  }

  // Upload product images
  createProductImageUpload() {
    return this.createUploadMiddleware(
      'products',
      ['jpg', 'jpeg', 'png', 'webp'],
      10 // Max 10 images
    );
  }

  // Upload banner images
  createBannerImageUpload() {
    return this.createUploadMiddleware(
      'banners',
      ['jpg', 'jpeg', 'png', 'webp'],
      1 // Single banner image
    );
  }

  // Upload review images
  createReviewImageUpload() {
    return this.createUploadMiddleware(
      'reviews',
      ['jpg', 'jpeg', 'png', 'webp'],
      5 // Max 5 review images
    );
  }

  // Upload user avatars
  createAvatarUpload() {
    return this.createUploadMiddleware(
      'avatars',
      ['jpg', 'jpeg', 'png', 'webp'],
      1 // Single avatar
    );
  }

  // Upload category/brand images
  createCategoryBrandUpload() {
    return this.createUploadMiddleware(
      'categories-brands',
      ['jpg', 'jpeg', 'png', 'webp'],
      1 // Single image
    );
  }

  // Get optimized image URL with transformations
  getOptimizedUrl(publicId, options = {}) {
    const defaultOptions = {
      quality: 'auto',
      format: 'auto',
      ...options
    };

    return this.cloudinary.url(publicId, defaultOptions);
  }

  // Get image thumbnail URL
  getThumbnailUrl(publicId, width = 150, height = 150) {
    return this.cloudinary.url(publicId, {
      width: width,
      height: height,
      crop: 'fill',
      quality: 'auto',
      format: 'auto'
    });
  }

  // Validate file before upload
  validateFile(file, options = {}) {
    const {
      maxSize = 5 * 1024 * 1024, // 5MB
      allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
      allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp']
    } = options;

    // Check file size
    if (file.size > maxSize) {
      throw new Error(`File size too large. Maximum size: ${maxSize / (1024 * 1024)}MB`);
    }

    // Check file type
    if (!allowedTypes.includes(file.mimetype)) {
      throw new Error(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`);
    }

    // Check file extension
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      throw new Error(`Invalid file extension. Allowed extensions: ${allowedExtensions.join(', ')}`);
    }

    return true;
  }

  // Get upload stats
  async getUploadStats() {
    try {
      const usage = await this.cloudinary.api.usage();
      return {
        storage: {
          used: usage.storage.used,
          limit: usage.storage.limit,
          percentage: Math.round((usage.storage.used / usage.storage.limit) * 100)
        },
        bandwidth: {
          used: usage.bandwidth.used,
          limit: usage.bandwidth.limit,
          percentage: Math.round((usage.bandwidth.used / usage.bandwidth.limit) * 100)
        },
        requests: usage.requests
      };
    } catch (error) {
      throw new Error(`Failed to get upload stats: ${error.message}`);
    }
  }
}

module.exports = new FileUploadService();
