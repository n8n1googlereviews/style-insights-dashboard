// Mock data simulating n8n backend response
// Tables: 'stores' and 'google_reviews'

export const stores = [
  { store_id: 1, name: "Luxe Fashion NYC", location: "New York, NY" },
  { store_id: 2, name: "Luxe Fashion LA", location: "Los Angeles, CA" },
  { store_id: 3, name: "Luxe Fashion Miami", location: "Miami, FL" },
  { store_id: 4, name: "Luxe Fashion Chicago", location: "Chicago, IL" },
];

export const googleReviews = [
  {
    review_id: 1,
    store_id: 1,
    author_name: "Sarah Mitchell",
    rating: 5,
    text: "Absolutely love the navy blue cashmere sweater! True to size and the fabric quality is exceptional. The color is exactly as shown.",
    timestamp: "2024-01-15T10:30:00Z",
    sentiment: "positive",
    mentioned_products: ["Cashmere Sweater"],
    size_fit: "true_to_size",
    colors_mentioned: ["Navy Blue"],
    fabric_quality: "exceptional",
  },
  {
    review_id: 2,
    store_id: 1,
    author_name: "Michael Chen",
    rating: 4,
    text: "Great selection of winter coats. The black wool coat runs a bit large, but the quality makes up for it. Staff was very helpful.",
    timestamp: "2024-01-14T15:45:00Z",
    sentiment: "positive",
    mentioned_products: ["Wool Coat"],
    size_fit: "runs_large",
    colors_mentioned: ["Black"],
    fabric_quality: "high",
  },
  {
    review_id: 3,
    store_id: 1,
    author_name: "Emma Thompson",
    rating: 3,
    text: "The beige trench coat looked beautiful but runs small. Had to exchange for a larger size. Nice material though.",
    timestamp: "2024-01-13T09:20:00Z",
    sentiment: "neutral",
    mentioned_products: ["Trench Coat"],
    size_fit: "runs_small",
    colors_mentioned: ["Beige"],
    fabric_quality: "nice",
  },
  {
    review_id: 4,
    store_id: 1,
    author_name: "David Rodriguez",
    rating: 5,
    text: "Perfect fitting slim jeans in charcoal grey. The denim quality is top-notch. Will definitely buy more colors!",
    timestamp: "2024-01-12T14:00:00Z",
    sentiment: "positive",
    mentioned_products: ["Slim Jeans"],
    size_fit: "true_to_size",
    colors_mentioned: ["Charcoal Grey"],
    fabric_quality: "top-notch",
  },
  {
    review_id: 5,
    store_id: 1,
    author_name: "Lisa Park",
    rating: 2,
    text: "Disappointed with the ivory silk blouse. It runs very small and the fabric feels cheaper than expected. Not worth the price.",
    timestamp: "2024-01-11T11:30:00Z",
    sentiment: "negative",
    mentioned_products: ["Silk Blouse"],
    size_fit: "runs_small",
    colors_mentioned: ["Ivory"],
    fabric_quality: "cheap",
  },
  {
    review_id: 6,
    store_id: 2,
    author_name: "James Wilson",
    rating: 5,
    text: "The olive green cargo pants are amazing! True to size and incredibly comfortable. Love the sustainable cotton fabric.",
    timestamp: "2024-01-15T08:15:00Z",
    sentiment: "positive",
    mentioned_products: ["Cargo Pants"],
    size_fit: "true_to_size",
    colors_mentioned: ["Olive Green"],
    fabric_quality: "sustainable",
  },
  {
    review_id: 7,
    store_id: 2,
    author_name: "Amanda Foster",
    rating: 4,
    text: "Beautiful burgundy maxi dress. Runs slightly large but still looks elegant. The velvet texture is luxurious.",
    timestamp: "2024-01-14T16:30:00Z",
    sentiment: "positive",
    mentioned_products: ["Maxi Dress"],
    size_fit: "runs_large",
    colors_mentioned: ["Burgundy"],
    fabric_quality: "luxurious",
  },
  {
    review_id: 8,
    store_id: 2,
    author_name: "Ryan Martinez",
    rating: 3,
    text: "The cream colored turtleneck is okay. True to size but the wool blend feels a bit scratchy. Decent for the price.",
    timestamp: "2024-01-13T12:45:00Z",
    sentiment: "neutral",
    mentioned_products: ["Turtleneck"],
    size_fit: "true_to_size",
    colors_mentioned: ["Cream"],
    fabric_quality: "scratchy",
  },
  {
    review_id: 9,
    store_id: 3,
    author_name: "Sophia Anderson",
    rating: 5,
    text: "Obsessed with the coral linen dress! Perfect summer piece, true to size. The fabric breathes so well in Miami heat.",
    timestamp: "2024-01-15T13:00:00Z",
    sentiment: "positive",
    mentioned_products: ["Linen Dress"],
    size_fit: "true_to_size",
    colors_mentioned: ["Coral"],
    fabric_quality: "breathable",
  },
  {
    review_id: 10,
    store_id: 3,
    author_name: "Carlos Hernandez",
    rating: 4,
    text: "Great white linen shirt for the beach. Runs a bit small though. Premium quality fabric that doesn't wrinkle easily.",
    timestamp: "2024-01-14T10:00:00Z",
    sentiment: "positive",
    mentioned_products: ["Linen Shirt"],
    size_fit: "runs_small",
    colors_mentioned: ["White"],
    fabric_quality: "premium",
  },
  {
    review_id: 11,
    store_id: 4,
    author_name: "Jennifer Brown",
    rating: 5,
    text: "The forest green puffer jacket is perfect for Chicago winters! True to size with excellent insulation. Love it!",
    timestamp: "2024-01-15T09:30:00Z",
    sentiment: "positive",
    mentioned_products: ["Puffer Jacket"],
    size_fit: "true_to_size",
    colors_mentioned: ["Forest Green"],
    fabric_quality: "excellent",
  },
  {
    review_id: 12,
    store_id: 4,
    author_name: "Robert Taylor",
    rating: 2,
    text: "The camel coat was a letdown. Runs very large and the material feels thin. Expected better for a premium brand.",
    timestamp: "2024-01-14T14:15:00Z",
    sentiment: "negative",
    mentioned_products: ["Camel Coat"],
    size_fit: "runs_large",
    colors_mentioned: ["Camel"],
    fabric_quality: "thin",
  },
];

// Helper function to filter reviews by store
export const getReviewsByStore = (storeId) => {
  if (!storeId || storeId === 'all') {
    return googleReviews;
  }
  return googleReviews.filter(review => review.store_id === parseInt(storeId));
};

// Calculate brand health metrics
export const calculateBrandHealth = (reviews) => {
  if (reviews.length === 0) {
    return {
      avgRating: 0,
      totalReviews: 0,
      sentimentBreakdown: { positive: 0, neutral: 0, negative: 0 },
    };
  }

  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  
  const sentimentBreakdown = reviews.reduce(
    (acc, r) => {
      acc[r.sentiment]++;
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

// Calculate size fit data
export const calculateSizeFit = (reviews) => {
  const sizeFitData = reviews.reduce(
    (acc, r) => {
      if (r.size_fit === 'runs_small') acc.runsSmall++;
      else if (r.size_fit === 'true_to_size') acc.trueToSize++;
      else if (r.size_fit === 'runs_large') acc.runsLarge++;
      return acc;
    },
    { runsSmall: 0, trueToSize: 0, runsLarge: 0 }
  );

  const total = reviews.length || 1;
  
  return [
    { name: 'Runs Small', value: sizeFitData.runsSmall, percentage: Math.round((sizeFitData.runsSmall / total) * 100) },
    { name: 'True to Size', value: sizeFitData.trueToSize, percentage: Math.round((sizeFitData.trueToSize / total) * 100) },
    { name: 'Runs Large', value: sizeFitData.runsLarge, percentage: Math.round((sizeFitData.runsLarge / total) * 100) },
  ];
};

// Extract product mentions with sentiment
export const extractProductFeedback = (reviews) => {
  const productMap = new Map();

  reviews.forEach((review) => {
    review.mentioned_products.forEach((product) => {
      if (!productMap.has(product)) {
        productMap.set(product, { positive: 0, neutral: 0, negative: 0, total: 0 });
      }
      const data = productMap.get(product);
      data[review.sentiment]++;
      data.total++;
    });
  });

  return Array.from(productMap.entries()).map(([name, data]) => ({
    name,
    ...data,
    sentimentScore: Math.round(((data.positive - data.negative) / data.total + 1) * 50),
  }));
};

// Extract color mentions
export const extractColorMentions = (reviews) => {
  const colorMap = new Map();

  reviews.forEach((review) => {
    review.colors_mentioned.forEach((color) => {
      colorMap.set(color, (colorMap.get(color) || 0) + 1);
    });
  });

  return Array.from(colorMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
};

// Extract fabric quality feedback
export const extractFabricFeedback = (reviews) => {
  const fabricMap = new Map();

  reviews.forEach((review) => {
    const quality = review.fabric_quality;
    if (quality) {
      fabricMap.set(quality, (fabricMap.get(quality) || 0) + 1);
    }
  });

  return Array.from(fabricMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
};
