import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ImageSlider({ images }) {
  const imageArray = Array.isArray(images) ? images : [];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    pauseOnHover: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          arrows: false,
          touchMove: true,
        },
      },
    ],
  };

  return (
    <div className="w-full h-[30vh] md:h-[70vh] rounded-md">
      <Slider {...settings}>
        {imageArray.map((image, index) => (
          <div key={index} className="w-full h-[30vh] md:h-[70vh] rounded-md">
            <img
              src={image}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover rounded-md shadow-lg shadow-slate-200"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        background: "rgba(0, 0, 0, 0.7)",
        right: "10px",
        zIndex: 10,
        width: "50px",
        height: "50px",
        padding: "10px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        background: "rgba(0, 0, 0, 0.7)",
        left: "10px",
        zIndex: 10,
        width: "50px",
        height: "50px",
        padding: "10px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClick}
    />
  );
}
