import { addToCart, emptyCart, removeToCart } from '../redux/action';
import { useDispatch } from 'react-redux'
import { productList } from '../redux/productAction';
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import Description from './Description';

function Main()
{
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState( '' );
  const [filteredData, setFilteredData] = useState( [] );

  let data = useSelector( ( state ) => state.productData );
  console.warn( "data in main component", data );

  useEffect( () =>
  {
    dispatch( productList() )
  }, [dispatch] )

  useEffect( () =>
  {
    
  const filteredProducts =  data.filter((item)=>{
              return( 
                item.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
    })
    setFilteredData(filteredProducts);
  }, [data, searchTerm] );
             
  return (

    <div className='row m-2'>

      <div>

        <div className='search-box'>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={( e ) => setSearchTerm( e.target.value )}
          />
        </div>
        <button className='btn btn-success col-md-3 m-3'
        onClick={() => dispatch( emptyCart() )}>Empty Cart
        </button>
      </div>

     {filteredData.map((item) => (
          <div className="col-4" key={item.id}>
            <Card>
              <img src={item.image} alt="" style={{ width: '100px', height: '100px' }} />

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  {item.title}
                  <Button sx={{ color: 'primary.main' }} className="me-auto">
                    {item.price}
                  </Button>
                  <h5 className="text-primary"> Category : {item.category} </h5>
                </Typography>
                <Description infoValue={item.description} />
              </CardContent>

              <CardActions style={{ display: 'flex' }}>
                <Button
                  variant="contained"
                  color="primary"
                  className="w-30 m-2"
                  onClick={() => dispatch(addToCart(item))}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  className="w-30"
                  onClick={() => dispatch(removeToCart(item.id))}
                >
                  Remove to Cart
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
    </div>


  );
}

export default Main;
