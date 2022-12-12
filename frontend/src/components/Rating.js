import PropTypes from 'prop-types';

const Rating = ({ value, text, color }) => {
  return (
    <span className='rating d-block'>
        <span>
            <i
            style={{ color }}
            className={
                value >= 1
                ? 'fa-solid fa-star'
                : value >= 0.5
                ? 'fa-solid fa-star-half-alt'
                : 'far fa-star'
                }
            />
        </span>
        <span>
            <i
            style={{ color }}
            className={
                value >= 2
                ? 'fa-solid fa-star'
                : value >= 1.5
                ? 'fa-solid fa-star-half-alt'
                : 'far fa-star'
                }
            />
        </span>
        <span>
            <i
            style={{ color }}
            className={
                value >=3
                ? 'fa-solid fa-star'
                : value >= 2.5
                ? 'fa-solid fa-star-half-alt'
                : 'far fa-star'
                }
            />
        </span>
        <span>
            <i
            style={{ color }}
            className={
                value >= 4
                ? 'fa-solid fa-star'
                : value >= 3.5
                ? 'fa-solid fa-star-half-alt'
                : 'far fa-star'
                }
            />
        </span>
        <span>
            <i
            style={{ color }}
            className={
                value >= 5
                ? 'fa-solid fa-star'
                : value >= 4.5
                ? 'fa-solid fa-star-half-alt'
                : 'far fa-star'
                }
            />
        </span>
        <span className='ms-3'>{text && text}</span>
    </span>
  )
}

Rating.defaultProps = {
    color: '#F6BE00',
    value: 0
}

Rating.propTypes = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string,
    color: PropTypes.string
}

export default Rating
