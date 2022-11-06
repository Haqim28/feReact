import '../App.css';
import Header from '../components/header'; // header
import PopularRestaurant from '../components/popularRestaurant';
import NearRestaurant from '../components/nearRestaurant';


function Home() {
  
    return ( 
        <div className="App-back">
            <div className='bg-warning'>
                <Header  />
            </div>
            <PopularRestaurant  />
            <NearRestaurant  />
        </div>
               
    );
}
export default Home;
