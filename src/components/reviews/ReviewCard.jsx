import { formatDistanceToNow } from 'date-fns';
import { FiThumbsUp } from 'react-icons/fi';
import Avatar from '../common/Avatar';
import Rating from '../common/Rating';

// Reviews read as a column in a printed back matter: a rule above, no boxes.
const ReviewCard = ({ review }) => (
  <article className="border-t border-rule pt-6">
    <div className="flex items-start gap-4">
      <Avatar src={review.user.avatar} alt={review.user.name} size="md" />

      <div className="flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <div>
            <h4 className="font-display text-[15px] font-medium text-ink">{review.user.name}</h4>
            <p className="label mt-0.5">@{review.user.username}</p>
          </div>
          <Rating rating={review.rating} size="sm" showNumber={false} />
        </div>

        <p className="mt-3 max-w-[68ch] text-[14.5px] leading-relaxed text-ink-2">{review.review}</p>

        <div className="mt-3 flex items-center gap-5">
          <p className="label">{formatDistanceToNow(new Date(review.date), { addSuffix: true })}</p>
          <button className="label inline-flex items-center gap-1.5 transition-colors hover:text-accent">
            <FiThumbsUp size={12} />
            <span className="tnum">{review.likes}</span>
            <span className="sr-only">found this helpful</span>
          </button>
        </div>
      </div>
    </div>
  </article>
);

export default ReviewCard;
