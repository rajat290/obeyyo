const Cart = require('../models/Cart');
const Product = require('../models/Product');
const ProductVariant = require('../models/ProductVariant');

class CartService {
  // Get user's cart
  async getCart(userId) {
    try {
      const cart = await Cart.findOne({ user: userId })
        .populate('items.product', 'name price images stock slug')
        .populate('items.variant', 'name price stock sku');

      if (!cart) {
        return {
          user: userId,
          items: [],
          totalItems: 0,
          totalPrice: 0,
          lastUpdated: new Date()
        };
      }

      return cart;
    } catch (error) {
      throw new Error(`Error fetching cart: ${error.message}`);
    }
  }

  // Add item to cart
  async addToCart(userId, productId, variantId = null, quantity = 1) {
    try {
      // Validate product exists and is in stock
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }

      if (!product.isActive) {
        throw new Error('Product is not available');
      }

      let variant = null;
      let price = product.price;
      let stock = product.stock;

      // If variant specified, validate it
      if (variantId) {
        variant = await ProductVariant.findById(variantId);
        if (!variant || variant.product.toString() !== productId) {
          throw new Error('Invalid product variant');
        }
        price = variant.price;
        stock = variant.stock;
      }

      if (stock < quantity) {
        throw new Error('Insufficient stock');
      }

      // Find or create cart
      let cart = await Cart.findOne({ user: userId });
      if (!cart) {
        cart = new Cart({ user: userId, items: [] });
      }

      // Check if item already exists in cart
      const existingItemIndex = cart.items.findIndex(item =>
        item.product.toString() === productId &&
        (!variantId || item.variant?.toString() === variantId)
      );

      if (existingItemIndex > -1) {
        // Update quantity
        cart.items[existingItemIndex].quantity += quantity;
        if (cart.items[existingItemIndex].quantity > stock) {
          throw new Error('Insufficient stock for requested quantity');
        }
      } else {
        // Add new item
        cart.items.push({
          product: productId,
          variant: variantId,
          quantity,
          price
        });
      }

      await cart.save();
      return await this.getCart(userId);
    } catch (error) {
      throw new Error(`Error adding to cart: ${error.message}`);
    }
  }

  // Update cart item quantity
  async updateCartItem(userId, productId, variantId = null, quantity) {
    try {
      const cart = await Cart.findOne({ user: userId });
      if (!cart) {
        throw new Error('Cart not found');
      }

      const itemIndex = cart.items.findIndex(item =>
        item.product.toString() === productId &&
        (!variantId || item.variant?.toString() === variantId)
      );

      if (itemIndex === -1) {
        throw new Error('Item not found in cart');
      }

      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        cart.items.splice(itemIndex, 1);
      } else {
        // Validate stock
        const product = await Product.findById(productId);
        let stock = product.stock;

        if (variantId) {
          const variant = await ProductVariant.findById(variantId);
          stock = variant.stock;
        }

        if (stock < quantity) {
          throw new Error('Insufficient stock');
        }

        cart.items[itemIndex].quantity = quantity;
      }

      await cart.save();
      return await this.getCart(userId);
    } catch (error) {
      throw new Error(`Error updating cart item: ${error.message}`);
    }
  }

  // Remove item from cart
  async removeFromCart(userId, productId, variantId = null) {
    try {
      const cart = await Cart.findOne({ user: userId });
      if (!cart) {
        throw new Error('Cart not found');
      }

      const itemIndex = cart.items.findIndex(item =>
        item.product.toString() === productId &&
        (!variantId || item.variant?.toString() === variantId)
      );

      if (itemIndex === -1) {
        throw new Error('Item not found in cart');
      }

      cart.items.splice(itemIndex, 1);
      await cart.save();

      return await this.getCart(userId);
    } catch (error) {
      throw new Error(`Error removing from cart: ${error.message}`);
    }
  }

  // Clear cart
  async clearCart(userId) {
    try {
      await Cart.findOneAndUpdate(
        { user: userId },
        { items: [], totalItems: 0, totalPrice: 0, lastUpdated: Date.now() },
        { new: true }
      );

      return await this.getCart(userId);
    } catch (error) {
      throw new Error(`Error clearing cart: ${error.message}`);
    }
  }

  // Get cart item count
  async getCartItemCount(userId) {
    try {
      const cart = await Cart.findOne({ user: userId });
      return cart ? cart.totalItems : 0;
    } catch (error) {
      throw new Error(`Error getting cart item count: ${error.message}`);
    }
  }

  // Validate cart before checkout
  async validateCart(userId) {
    try {
      const cart = await Cart.findOne({ user: userId })
        .populate('items.product')
        .populate('items.variant');

      if (!cart || cart.items.length === 0) {
        throw new Error('Cart is empty');
      }

      const validationErrors = [];

      for (const item of cart.items) {
        // Check if product exists and is active
        if (!item.product || !item.product.isActive) {
          validationErrors.push(`${item.product?.name || 'Unknown product'} is no longer available`);
          continue;
        }

        // Check stock
        let stock = item.product.stock;
        if (item.variant) {
          stock = item.variant.stock;
        }

        if (stock < item.quantity) {
          validationErrors.push(`Insufficient stock for ${item.product.name}`);
        }

        // Check price consistency
        let currentPrice = item.product.price;
        if (item.variant) {
          currentPrice = item.variant.price;
        }

        if (currentPrice !== item.price) {
          // Update price if changed
          item.price = currentPrice;
        }
      }

      if (validationErrors.length > 0) {
        await cart.save(); // Save price updates
        return {
          isValid: false,
          errors: validationErrors,
          cart: await this.getCart(userId)
        };
      }

      await cart.save(); // Save any price updates
      return {
        isValid: true,
        cart: await this.getCart(userId)
      };
    } catch (error) {
      throw new Error(`Error validating cart: ${error.message}`);
    }
  }
}

module.exports = new CartService();
