import { Package, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';

const getSentimentColor = (score) => {
  if (score >= 70) return 'text-positive bg-positive/10';
  if (score >= 40) return 'text-amber-600 bg-amber-100';
  return 'text-destructive bg-destructive/10';
};

const ProductCard = ({ product }) => {
  const sentimentColorClass = getSentimentColor(product.sentimentScore);

  return (
    <div className="dashboard-card p-5 hover:shadow-elegant-lg transition-all animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-foreground" />
          </div>
          <div>
            <h4 className="font-medium text-foreground">{product.name}</h4>
            <p className="text-sm text-muted-foreground">{product.total} mentions</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${sentimentColorClass}`}>
          {product.sentimentScore}%
        </div>
      </div>

      {/* Sentiment Breakdown */}
      <div className="flex items-center gap-4 pt-4 border-t border-border">
        <div className="flex items-center gap-1.5">
          <ThumbsUp className="w-4 h-4 text-positive" />
          <span className="text-sm font-medium">{product.positive}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Minus className="w-4 h-4 text-amber-500" />
          <span className="text-sm font-medium">{product.neutral}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ThumbsDown className="w-4 h-4 text-destructive" />
          <span className="text-sm font-medium">{product.negative}</span>
        </div>
      </div>
    </div>
  );
};

const ProductFeedback = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-1">Product Feedback</h2>
          <p className="text-muted-foreground">Products mentioned in reviews with their sentiment</p>
        </div>
        <div className="dashboard-card p-12 text-center">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No product mentions found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-1">Product Feedback</h2>
          <p className="text-muted-foreground">Products mentioned in reviews with their sentiment</p>
        </div>
        <div className="text-sm text-muted-foreground">
          {products.length} products tracked
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductFeedback;
