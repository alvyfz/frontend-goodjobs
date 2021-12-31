import React, { useState } from "react";
import "./ImagesDetail.css";

const ImagesDetail = (images) => {
  const [main, setMain] = useState(images[0]);
  return (
    <>
      <div className="img-detail">
        <img src={main} alt="main-img" className="main-img" />
        <div className="gallery">
          {images?.map((image, index) => {
            return (
              <img
                src={image}
                alt={index}
                key={index}
                onClick={() => setMain(images[index])}
                className={image === main ? "active" : null}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ImagesDetail;
