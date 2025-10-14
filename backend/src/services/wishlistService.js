const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

class WishlistService {
  // Get user's wishlist
  async getWishlist(userId) {
    try {
      const wishlist = await Wishlist.findOne({ user: userId })
        .populate('items.product', 'name price images rating slug isActive brand category')
        .populate('items.product.brand', 'name')
        .populate('items.product.category', 'name');

      if (!wishlist) {
        return {
          user: userId,
          items: [],
          totalItems: 0,
          lastUpdated: new Date()
        };
      }

      // Filter out inactive products
      wishlist.items = wishlist.items.filter(item =>
        item.product && item.product.isActive
      );

      return wishlist;
    } catch (error) {
      throw new Error(`Error fetching wishlist: ${error.message}`);
    }
  }

  // Add product to wishlist
  async addToWishlist(userId, productId) {
    try {
      // Validate product exists and is active
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }

      if (!product.isActive) {
        throw new Error('Product is not available');
      }

      // Find or create wishlist
      let wishlist = await Wishlist.findOne({ user: userId });
      if (!wishlist) {
        wishlist = new Wishlist({ user: userId, items: [] });
      }

      // Check if product already exists in wishlist
      const existingItem = wishlist.items.find(item =>
        item.product.toString() === productId
      );

      if (existingItem) {
        throw new Error('Product already in wishlist');
      }

      // Add new item
      wishlist.items.push({
        product: productId,
        addedAt: new Date()
      });

      await wishlist.save();
      return await this.getWishlist(userId);
    } catch (error) {
      throw new Error(`Error adding to wishlist: ${error.message}`);
    }
  }

  // Remove product from wishlist
  async removeFromWishlist(userId, productId) {
    try {
      const wishlist = await Wishlist.findOne({ user: userId });
      if (!wishlist) {
        throw new Error('Wishlist not found');
      }

      const itemIndex = wishlist.items.findIndex(item =>
        item.product.toString() === productId
      );

      if (itemIndex === -1) {
        throw new Error('Product not found in wishlist');
      }

      wishlist.items.splice(itemIndex, 1);
      await wishlist.save();

      return await this.getWishlist(userId);
    } catch (error) {
      throw new Error(`Error removing from wishlist: ${error.message}`);
    }
  }

  // Check if product is in wishlist
  async isInWishlist(userId, productId) {
    try {
      const wishlist = await Wishlist.findOne({ user: userId });
      if (!wishlist) {
        return false;
      }

      return wishlist.items.some(item =>
        item.product.toString() === productId
      );
    } catch (error) {
      throw new Error(`Error checking wishlist: ${error.message}`);
    }
  }

  // Clear wishlist
  async clearWishlist(userId) {
    try {
      await Wishlist.findOneAndUpdate(
        { user: userId },
        { items: [], totalItems: 0, lastUpdated: Date.now() },
        { new: true }
      );

      return await this.getWishlist(userId);
    } catch (error) {
      throw new Error(`Error clearing wishlist: ${error.message}`);
    }
  }

  // Get wishlist item count
  async getWishlistItemCount(userId) {
    try {
      const wishlist = await Wishlist.findOne({ user: userId });
      return wishlist ? wishlist.totalItems : 0;
    } catch (error) {
      throw new Error(`Error getting wishlist item count: ${error.message}`);
    }
  }

  // Move item from wishlist to cart
  async moveToCart(userId, productId, cartService) {
    try {
      // Remove from wishlist
      await this.removeFromWishlist(userId, productId);

      // Add to cart (assuming cartService has addToCart method)
      const cart = await cartService.addToCart(userId, productId);

      return {
        wishlist: await this.getWishlist(userId),
        cart
      };
    } catch (error) {
      throw new Error(`Error moving to cart: ${error.message}`);
    }
  }

  // Get wishlist statistics
  async getWishlistStats(userId) {
    try {
      const wishlist = await this.getWishlist(userId);

      const stats = {
        totalItems: wishlist.totalItems,
        totalValue: 0,
        categories: {},
        brands: {}
      };

      wishlist.items.forEach(item => {
        if (item.product) {
          stats.totalValue += item.product.price;

          // Count by category
          const categoryName = item.product.category?.name || 'Uncategorized';
          stats.categories[categoryName] = (stats.categories[categoryName] || 0) + 1;

          // Count by brand
          const brandName = item.product.brand?.name || 'Unknown Brand';
          stats.brands[brandName] = (stats.brands[brandName] || 0) + 1;
        }
      });

      return stats;
    } catch (error) {
      throw new Error(`Error getting wishlist stats: ${error.message}`);
    }
  }
}

module.exports = new WishlistService();
