import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerStyles from "./banner.module.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import vegImg from "../../assets/Vegetables.png";
import appleImg from "../../assets/Apple.png";
import fruitImg from "../../assets/Fruits.png";
import beansImg from "../../assets/Beans.png";

const Banner = () => {
  return (
    <Carousel autoPlay={true} infiniteLoop={true} interval={3000} showThumbs={false} showStatus={false}>
      <div>
        <img src={vegImg} alt=""/>
        <div className={bannerStyles.heading}>Get Potatoes free</div>
        <div className={bannerStyles.desc}>
          Buy vegetables and get potatoes free. Condition apply
        </div>
        <div className={bannerStyles.cta}>
          <Link to="/items/vegetables">Shop Now</Link>
        </div>
      </div>
      <div>
        <img src={appleImg} alt=""/>
        <div className={bannerStyles.heading}>An apple a day keeps doctor away</div>
        <div className={bannerStyles.desc}>
          Royal Gala Apples
        </div>
        <div className={bannerStyles.cta}>
          <Link to="/items/fruits">Shop Now</Link>
        </div>
      </div>
      <div>
        <img src={fruitImg} alt=""/>
        <div className={bannerStyles.heading}>Bite Into Everyday Wellness</div>
        <div className={bannerStyles.desc}>
          Start your day with a fruit
        </div>
        <div className={bannerStyles.cta}>
          <Link to="/items/fruits">Shop Now</Link>
        </div>
      </div>
      <div>
        <img src={beansImg} alt=""/>
        <div className={bannerStyles.heading}>Rich in Protein</div>
        <div className={bannerStyles.desc}>
          20% discount on French Beans
        </div>
        <div className={bannerStyles.cta}>
          <Link to="/items/vegetables">Shop Now</Link>
        </div>
      </div>
    </Carousel>
  )
}

export default Banner