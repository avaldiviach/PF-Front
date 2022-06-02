
import React,{useState} from "react";
import ImagenPrincipal from "../ImagenPrincipal";
import { Carousel } from "react-bootstrap";
import s from './carousel.module.css'
import { useSelector } from "react-redux";
import BannerDeal from "./bannerDeal";

export default function CarouselDeals() {
    const [index, setIndex] = useState(0);
    const dealsAll = useSelector(state => state.getDiscounts)
    const deals = dealsAll.filter(d => d.deleted === false)
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);

    };

    return (
        <Carousel className={s.ca} activeIndex={index} variant="dark" onSelect={handleSelect}>
            <Carousel.Item>
                <ImagenPrincipal />
            </Carousel.Item>
            {
                deals.map(d => (
                    <Carousel.Item key={d.id} style={{width: '100%'}}>
                        <BannerDeal model={d.sneakerModel} percentage={d.percentage} expiration={d.expiration} image={d.image} />
                    </Carousel.Item>
                ))
            }
            
        </Carousel>
    );
}
