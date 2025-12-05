const Shimmer = () => {
  return (
    <div className="shimmer-container">
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <div className="shimmer-card" key={i}>
            <div className="shimmer-img shimmer-animate"></div>

            <div className="shimmer-content">
              <div className="shimmer-line shimmer-title shimmer-animate"></div>
              <div className="shimmer-line shimmer-subtitle shimmer-animate"></div>

              <div className="shimmer-info-row">
                <div className="shimmer-badge shimmer-animate"></div>
                <div className="shimmer-line shimmer-small shimmer-animate"></div>
              </div>

              <div className="shimmer-line shimmer-small shimmer-animate"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Shimmer;
