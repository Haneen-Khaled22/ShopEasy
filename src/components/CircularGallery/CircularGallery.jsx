import { motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";


const radius = 260;

const CircularGallery = ({ items }) => {
  const angle = useMotionValue(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const unsubscribe = angle.on("change", (v) => setRotation(v));
    return () => unsubscribe();
  }, [angle]);

  const onWheel = (e) => {
    angle.set(angle.get() + e.deltaY * 0.08);
  };

  return (
    <div className="gallery-wrapper" onWheel={onWheel}>
      <div
        className="circle"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {items.map((item, i) => {
          const itemAngle = (360 / items.length) * i;
          return (
            <div
              key={i}
              className="item"
              style={{
                transform: `
                  rotate(${itemAngle}deg)
                  translateY(-${radius}px)
                  rotate(-${itemAngle}deg)
                `,
              }}
            >
              <img src={item.image} alt={item.text} />
              <span>{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CircularGallery;
