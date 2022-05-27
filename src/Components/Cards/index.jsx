import Card from '../Card';
import CardAdmin from '../CardAdmin';

import style from './Cards.module.css'



function Cards({ renderSneakers, admin }) {
  return (
    <div className={style.cards} > 
      {

        renderSneakers.length > 0 
        ? admin === true ? renderSneakers?.map((sneaker, i) => <CardAdmin key={i} sneaker={sneaker} />)
        :renderSneakers?.map((sneaker, i) => sneaker.deleted || <Card key={i} sneaker={sneaker} />) 
        :<h1>No cards</h1>
      }
      
    </div>
  )
}

export default Cards;