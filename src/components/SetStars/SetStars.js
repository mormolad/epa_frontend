export default function SetStars({ rating, starOut, starIn }) {
  let widthStar = Number(rating) + 1;

  function paintStar(width) {
    if (width >= 1) {
      return 100;
    } if (width < 1 && width > 0) {
      return (Math.asin(2 * width - 1) / Math.PI + 0.5) * 100;
    } if (width === 0 || width < 0) {
      return 0;
    }
  }

  return (
    [1, 2, 3, 4, 5].map((i) => {
      widthStar -= 1;
      return (
        <div className={starOut} key={i}>
          <div
            className={starIn}
            style={{ width: `${paintStar(widthStar)}%` }}
          />
        </div>
      );
    })
  );
}
