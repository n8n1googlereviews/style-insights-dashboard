import { Star, User, Calendar, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? 'fill-amber-400 text-amber-400'
              : 'text-gray-200'
          }`}
        />
      ))}
    </div>
  );
};

const getSentimentBadge = (sentiment) => {
  const classes = {
    positive: 'bg-positive/10 text-positive',
    neutral: 'bg-amber-100 text-amber-700',
    negative: 'bg-destructive/10 text-destructive',
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${classes[sentiment]}`}>
      {sentiment}
    </span>
  );
};

const CustomerList = ({ reviews }) => {
  const sortedReviews = [...reviews].sort((a, b) => {
    const dateA = new Date(b.timestamp || b.created_at || 0);
    const dateB = new Date(a.timestamp || a.created_at || 0);
    return dateA - dateB;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-1">Customer Reviews</h2>
          <p className="text-muted-foreground">Latest reviews from your customers</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MessageCircle className="w-4 h-4" />
          <span>{reviews.length} reviews</span>
        </div>
      </div>

      <div className="dashboard-card overflow-hidden animate-fade-in">
        {reviews.length === 0 ? (
          <div className="p-12 text-center">
            <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No reviews found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Review
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Sentiment
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {sortedReviews.map((review, index) => (
                  <tr key={review.review_id || review.id || index} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-secondary rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <span className="font-medium text-foreground">{review.author_name || 'Anonymous'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StarRating rating={review.rating || 0} />
                    </td>
                    <td className="px-6 py-4 max-w-md">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {review.review_text || review.text || 'No review text'}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      {getSentimentBadge(review.sentiment || 'neutral')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {review.timestamp || review.created_at 
                            ? format(new Date(review.timestamp || review.created_at), 'MMM d, yyyy')
                            : 'N/A'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerList;
