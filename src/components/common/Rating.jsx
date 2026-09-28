import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { FiStar } from 'react-icons/fi';

const STARS = 5;

const SIZES = {
  xs: 'text-[11px]',
  sm: 'text-[13px]',
  md: 'text-base',
  lg: 'text-xl',
};

// The gap between stars grows with the size, so a row of large stars does not
// look cramped.
const GAPS = {
  xs: 'gap-px',
  sm: 'gap-0.5',
  md: 'gap-0.5',
  lg: 'gap-1',
};

const Rating = ({
  rating,
  showNumber = true,
  size = 'sm',
  interactive = false,
  onRate,
}) => {
  const stars = [];

  for (let i = 1; i <= STARS; i += 1) {
    const onClick = () => interactive && onRate && onRate(i);
    const motion = interactive ? 'cursor-pointer transition-transform hover:scale-125' : '';
    const filled = SIZES[size];
    const empty = `${SIZES[size]} text-ink-3/45 ${motion}`;

    if (i <= Math.floor(rating)) {
      stars.push(<FaStar key={i} className={`${filled} text-accent ${motion}`} onClick={onClick} />);
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      // A half star, e.g. 4.2 shows four full stars and a half fifth.
      stars.push(<FaStarHalfAlt key={i} className={`${filled} text-accent ${motion}`} onClick={onClick} />);
    } else {
      stars.push(<FiStar key={i} className={empty} onClick={onClick} />);
    }
  }

  return (
    <div
      className={`inline-flex items-center ${GAPS[size]}`}
      title={`${rating.toFixed(1)} out of ${STARS}`}
    >
      {stars}
      {showNumber && (
        <span className={`tnum ml-1.5 font-medium text-ink-2 ${SIZES[size]}`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default Rating;
