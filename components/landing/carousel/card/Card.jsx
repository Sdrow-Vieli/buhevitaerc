"use client";

import { useState, useEffect } from "react";
import "./Card.css";

const Card = ({ project, showDetails, isActive }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.src = project.image;
    img.onload = () => setImgLoaded(true);
  }, [project.image]);

  const resolvedIcons = (project.icons || []).filter(Boolean);

  return (
    <>
      <div className="card-front">
        <div
          className={`card-image-wrapper ${!imgLoaded ? "loading" : ""}`}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
            alignItems: "center",
            width: "100%",
            height: showDetails ? "65%" : "65%",
            borderRadius: "8px 8px 0 0",
            background: `url(${project.image}) no-repeat center center`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: "5px solid white",
            pointerEvents: isActive ? "auto" : "none",
            color: "white",
          }}
        >
          <div
            className="lm-project-title"
            style={{
              fontSize: "1.1rem",
              color: "black",
              border: "1px solid red",
              backgroundColor: "white",
              display: "inline-block",
              padding: "0.1rem 1rem",
              borderRadius: "999px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
              margin: "5px",
            }}
          >
            {project["card-title"]}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            padding: "1px",
            marginTop: "auto",
            textAlign: "center",
            fontWeight: 500,
            color: "black",
          }}
        >
          {project.description}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "8px",
            alignSelf: "center",
            marginTop: "auto",
            pointerEvents: isActive ? "auto" : "none",
            padding: "20px",
          }}
        >
          {resolvedIcons.map((iconSrc, idx) => (
            <img
              key={idx}
              src={iconSrc}
              alt={`icon-${idx}`}
              style={{
                width: `${project.iconSizes?.[idx] || 24}px`,
                height: `${project.iconSizes?.[idx] || 24}px`,
                margin: "0 4px",
              }}
            />
          ))}
        </div>
      </div>

      <div className="card-back"></div>
    </>
  );
};

export default Card;
