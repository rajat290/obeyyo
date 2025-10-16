declare const gtag: ((...args: any[]) => void) | undefined;

interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  metadata?: Record<string, any>;
}

export class AnalyticsService {
  private static instance: AnalyticsService;
  private isInitialized = false;

  private constructor() {}

  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  initialize(): void {
    if (this.isInitialized) return;

    // Initialize analytics services (Google Analytics, Mixpanel, etc.)
    if (typeof process !== 'undefined' && process.env.REACT_APP_GA_TRACKING_ID) {
      this.initializeGoogleAnalytics();
    }

    this.isInitialized = true;
    console.log('Analytics service initialized');
  }

  private initializeGoogleAnalytics(): void {
    // Google Analytics initialization code would go here
    console.log('Google Analytics initialized');
  }

  trackEvent(event: AnalyticsEvent): void {
    if (!this.isInitialized) {
      console.warn('Analytics not initialized. Event not tracked:', event);
      return;
    }

    // Send event to analytics services
    console.log('Analytics Event:', event);

    // Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        ...event.metadata,
      });
    }

    // You can add other analytics services here (Mixpanel, Amplitude, etc.)
  }

  trackPageView(page: string): void {
    this.trackEvent({
      event: 'page_view',
      category: 'Navigation',
      action: 'page_view',
      label: page,
    });

    // Google Analytics page view
    if (typeof gtag !== 'undefined' && typeof process !== 'undefined' && process.env.REACT_APP_GA_TRACKING_ID) {
      gtag('config', process.env.REACT_APP_GA_TRACKING_ID, {
        page_path: page,
      });
    }
  }

  trackProductView(productId: string, productName: string): void {
    this.trackEvent({
      event: 'product_view',
      category: 'Ecommerce',
      action: 'product_view',
      label: productName,
      value: 1,
      metadata: { productId },
    });
  }

  trackAddToCart(productId: string, productName: string, quantity: number, price: number): void {
    this.trackEvent({
      event: 'add_to_cart',
      category: 'Ecommerce',
      action: 'add_to_cart',
      label: productName,
      value: price * quantity,
      metadata: { productId, quantity, price },
    });
  }

  trackPurchase(orderId: string, total: number, products: Array<{ id: string; name: string; quantity: number; price: number }>): void {
    this.trackEvent({
      event: 'purchase',
      category: 'Ecommerce',
      action: 'purchase',
      label: orderId,
      value: total,
      metadata: { orderId, products },
    });
  }

  trackSearch(query: string, resultsCount: number): void {
    this.trackEvent({
      event: 'search',
      category: 'Search',
      action: 'search',
      label: query,
      value: resultsCount,
    });
  }
}

export const analyticsService = AnalyticsService.getInstance();