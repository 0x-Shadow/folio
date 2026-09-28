import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { FiStar } from 'react-icons/fi';

const SIZES = {
  xs: 'text-[11px]',
  sm: 'text-[13px]',
  md: 'text-base',
  lg: 'text-xl',
};

const GAP = {
  xs: 'gap-px',
  sm: 'gap-0.5',
  md: 'gap-0.5',
  lg: 'gap-1',
};

const Rating = ({
  rating,
  maxRating = 5,
  showNumber = true,
  size = 'sm',
  interactive = false,
  onRate,
}) => {
  const stars = [];
  for (let i = 1; i <= maxRating; i += 1) {
    const onClick = () => interactive && onRate && onRate(i);
    const motion = interactive ? 'cursor-pointer transition-transform hover:scale-125' : '';

    if (i <= Math.floor(rating)) {
      stars.push(
        <FaStar key={i} className={`${SIZES[size]} ${GAP[size]} text-accent ${motion}`} onClick={onClick} />
      );
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars.push(
        <FaStarHalfAlt
          key={i}
          className={`${SIZES[size]} ${GAP[size]} text-accent ${motion}`}
          onClick={onClick}
        />
      );
    } else {
      stars.push(
        <FiStar key={i} className={`${SIZES[size]} ${GAP[size]} text-ink-3/45 ${motion}`} onClick={onClick} />
      );
    }
  }

  return (
    <div className={`inline-flex items-center ${GAP[size]}`} title={`${rating.toFixed(1)} out of 5`}>
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
