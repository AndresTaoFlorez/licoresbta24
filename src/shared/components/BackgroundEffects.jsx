import "../styles/components/_background-effects.scss";

const BackgroundEffects = () => {
  return (
    <div className="background-effects">
      {/* Mesh gradient background */}
      <div className="background-effects__gradient" />

      {/* Animated floating spheres */}
      <div className="background-effects__spheres">
        <div className="sphere sphere--1"></div>
        <div className="sphere sphere--2"></div>
        <div className="sphere sphere--3"></div>
        <div className="sphere sphere--4"></div>
        <div className="sphere sphere--5"></div>
        <div className="sphere sphere--6"></div>
        <div className="sphere sphere--7"></div>
      </div>
    </div>
  );
};

export default BackgroundEffects;