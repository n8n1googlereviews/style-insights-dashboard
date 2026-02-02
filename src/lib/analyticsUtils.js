// Analytics calculation utilities for review data

/**
 * Calculate brand health metrics from reviews
 * @param {Array} reviews - Array of review objects
 * @returns {object} - Brand health metrics
 */
export const calculateBrandHealth = (reviews) => {
  if (!reviews || reviews.length === 0) {
    return {
      avgRating: 0,
      totalReviews: 0,
      sentimentBreakdown: { positive: 0, neutral: 0, negative: 0 },
    };
  }

  const avgRating = reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length;
  
  const sentimentBreakdown = reviews.reduce(
    (acc, r) => {
      const sentiment = (r.sentiment || 'neutral').toLowerCase();
      if (acc.hasOwnProperty(sentiment)) {
        acc[sentiment]++;
      }
      return acc;
    },
    { positive: 0, neutral: 0, negative: 0 }
  );

  return {
    avgRating: avgRating.toFixed(1),
    totalReviews: reviews.length,
    sentimentBreakdown,
  };
};

/**
 * Size fit keywords for text parsing
 */
const SIZE_FIT_KEYWORDS = {
  runs_small: ['small', 'tight', 'snug', 'narrow', 'petite', 'runs small', 'too small', 'size up'],
  runs_large: ['large', 'big', 'loose', 'baggy', 'roomy', 'runs large', 'too large', 'size down', 'oversized'],
  true_to_size: ['true to size', 'perfect fit', 'fits well', 'fits perfectly', 'accurate size', 'as expected', 'fits great'],
};

/**
 * Parse size/fit information from review text
 * @param {string} text - Review text to parse
 * @returns {string|null} - Size fit category or null
 */
const parseSizeFitFromText = (text) => {
  if (!text) return null;
  const lowerText = text.toLowerCase();
  
  // Check true_to_size first (more specific phrases)
  for (const keyword of SIZE_FIT_KEYWORDS.true_to_size) {
    if (lowerText.includes(keyword)) return 'true_to_size';
  }
  
  // Check runs_small
  for (const keyword of SIZE_FIT_KEYWORDS.runs_small) {
    if (lowerText.includes(keyword)) return 'runs_small';
  }
  
  // Check runs_large
  for (const keyword of SIZE_FIT_KEYWORDS.runs_large) {
    if (lowerText.includes(keyword)) return 'runs_large';
  }
  
  return null;
};

/**
 * Calculate size fit data from reviews
 * @param {Array} reviews - Array of review objects
 * @returns {Array} - Size fit chart data
 */
export const calculateSizeFit = (reviews) => {
  if (!reviews || reviews.length === 0) {
    return [
      { name: 'Runs Small', value: 0, percentage: 0 },
      { name: 'True to Size', value: 0, percentage: 0 },
      { name: 'Runs Large', value: 0, percentage: 0 },
    ];
  }

  const sizeFitData = { runsSmall: 0, trueToSize: 0, runsLarge: 0 };
  let categorizedCount = 0;

  reviews.forEach((r) => {
    // First check if size_fit field exists, otherwise parse from text
    let sizeFit = r.size_fit;
    
    if (!sizeFit) {
      const reviewText = r.review_text || r.text || '';
      sizeFit = parseSizeFitFromText(reviewText);
    }
    
    if (sizeFit === 'runs_small') {
      sizeFitData.runsSmall++;
      categorizedCount++;
    } else if (sizeFit === 'true_to_size') {
      sizeFitData.trueToSize++;
      categorizedCount++;
    } else if (sizeFit === 'runs_large') {
      sizeFitData.runsLarge++;
      categorizedCount++;
    }
  });

  const total = categorizedCount || 1;
  
  return [
    { name: 'Runs Small', value: sizeFitData.runsSmall, percentage: Math.round((sizeFitData.runsSmall / total) * 100) },
    { name: 'True to Size', value: sizeFitData.trueToSize, percentage: Math.round((sizeFitData.trueToSize / total) * 100) },
    { name: 'Runs Large', value: sizeFitData.runsLarge, percentage: Math.round((sizeFitData.runsLarge / total) * 100) },
  ];
};

/**
 * Common color keywords for extraction
 */
const COLOR_KEYWORDS = [
  'black', 'white', 'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink',
  'navy', 'navy blue', 'beige', 'cream', 'ivory', 'grey', 'gray', 'charcoal',
  'brown', 'tan', 'camel', 'burgundy', 'maroon', 'coral', 'olive', 'olive green',
  'forest green', 'teal', 'turquoise', 'gold', 'silver', 'rose', 'lavender',
];

/**
 * Extract color mentions from review text
 * @param {string} text - Review text to parse
 * @returns {Array} - Array of mentioned colors
 */
const extractColorsFromText = (text) => {
  if (!text) return [];
  const lowerText = text.toLowerCase();
  const foundColors = [];
  
  // Sort by length descending to match longer phrases first (e.g., "navy blue" before "blue")
  const sortedColors = [...COLOR_KEYWORDS].sort((a, b) => b.length - a.length);
  
  for (const color of sortedColors) {
    if (lowerText.includes(color) && !foundColors.some(c => c.toLowerCase().includes(color) || color.includes(c.toLowerCase()))) {
      // Capitalize first letter of each word
      const formatted = color.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      foundColors.push(formatted);
    }
  }
  
  return foundColors;
};

/**
 * Extract color mentions from reviews
 * @param {Array} reviews - Array of review objects
 * @returns {Array} - Color mention counts
 */
export const extractColorMentions = (reviews) => {
  if (!reviews || reviews.length === 0) return [];
  
  const colorMap = new Map();

  reviews.forEach((review) => {
    // First check if colors_mentioned field exists
    let colors = review.colors_mentioned;
    
    if (!colors || colors.length === 0) {
      const reviewText = review.review_text || review.text || '';
      colors = extractColorsFromText(reviewText);
    }
    
    if (Array.isArray(colors)) {
      colors.forEach((color) => {
        colorMap.set(color, (colorMap.get(color) || 0) + 1);
      });
    }
  });

  return Array.from(colorMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
};

/**
 * Fabric quality keywords
 */
const FABRIC_QUALITY_KEYWORDS = {
  positive: ['exceptional', 'luxurious', 'premium', 'high quality', 'excellent', 'soft', 'comfortable', 'durable', 'breathable', 'sustainable', 'top-notch'],
  neutral: ['okay', 'decent', 'average', 'fine', 'acceptable', 'standard'],
  negative: ['cheap', 'thin', 'scratchy', 'poor', 'flimsy', 'rough', 'low quality'],
};

/**
 * Extract fabric quality from text
 * @param {string} text - Review text to parse
 * @returns {string|null} - Fabric quality keyword or null
 */
const extractFabricFromText = (text) => {
  if (!text) return null;
  const lowerText = text.toLowerCase();
  
  // Check all categories
  for (const keywords of Object.values(FABRIC_QUALITY_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lowerText.includes(keyword)) {
        return keyword;
      }
    }
  }
  
  return null;
};

/**
 * Extract fabric quality feedback from reviews
 * @param {Array} reviews - Array of review objects
 * @returns {Array} - Fabric quality counts
 */
export const extractFabricFeedback = (reviews) => {
  if (!reviews || reviews.length === 0) return [];
  
  const fabricMap = new Map();

  reviews.forEach((review) => {
    // First check if fabric_quality field exists
    let quality = review.fabric_quality;
    
    if (!quality) {
      const reviewText = review.review_text || review.text || '';
      quality = extractFabricFromText(reviewText);
    }
    
    if (quality) {
      fabricMap.set(quality, (fabricMap.get(quality) || 0) + 1);
    }
  });

  return Array.from(fabricMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
};

/**
 * Product mention keywords (common apparel items)
 */
const PRODUCT_KEYWORDS = [
  'sweater', 'coat', 'jacket', 'jeans', 'pants', 'trousers', 'shirt', 'blouse',
  'dress', 'skirt', 'shorts', 'top', 'hoodie', 'cardigan', 'blazer', 'suit',
  'turtleneck', 't-shirt', 'polo', 'vest', 'scarf', 'hat', 'shoes', 'boots',
  'sneakers', 'heels', 'sandals', 'bag', 'handbag', 'purse', 'belt', 'watch',
];

/**
 * Extract product mentions from text
 * @param {string} text - Review text to parse
 * @returns {Array} - Array of mentioned products
 */
const extractProductsFromText = (text) => {
  if (!text) return [];
  const lowerText = text.toLowerCase();
  const foundProducts = [];
  
  for (const product of PRODUCT_KEYWORDS) {
    if (lowerText.includes(product)) {
      const formatted = product.charAt(0).toUpperCase() + product.slice(1);
      if (!foundProducts.includes(formatted)) {
        foundProducts.push(formatted);
      }
    }
  }
  
  return foundProducts;
};

/**
 * Extract product mentions with sentiment from reviews
 * @param {Array} reviews - Array of review objects
 * @returns {Array} - Product feedback with sentiment scores
 */
export const extractProductFeedback = (reviews) => {
  if (!reviews || reviews.length === 0) return [];
  
  const productMap = new Map();

  reviews.forEach((review) => {
    // First check if mentioned_products field exists
    let products = review.mentioned_products;
    
    if (!products || products.length === 0) {
      const reviewText = review.review_text || review.text || '';
      products = extractProductsFromText(reviewText);
    }
    
    const sentiment = (review.sentiment || 'neutral').toLowerCase();
    
    if (Array.isArray(products)) {
      products.forEach((product) => {
        if (!productMap.has(product)) {
          productMap.set(product, { positive: 0, neutral: 0, negative: 0, total: 0 });
        }
        const data = productMap.get(product);
        if (data.hasOwnProperty(sentiment)) {
          data[sentiment]++;
        }
        data.total++;
      });
    }
  });

  return Array.from(productMap.entries()).map(([name, data]) => ({
    name,
    ...data,
    sentimentScore: data.total > 0 ? Math.round(((data.positive - data.negative) / data.total + 1) * 50) : 50,
  }));
};
