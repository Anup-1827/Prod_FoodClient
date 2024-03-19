//Packages
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
//Component
import Home from './Component/Pages/Home'
import FilterMealType from './Component/Pages/FilterMealType';
import Header from './Component/HeaderAndFooter/Header';
import Footer from './Component/HeaderAndFooter/Footer';
import RestaurantPage from './Component/Pages/RestaurantPage';
import Thankyou from './Component/Pages/Thankyou';


function App() {

  const btnClick = ()=>
  {axios.get('/v1/login/test1').then((res)=>{
    console.log(res.data.data);
  })
}

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:mealType' element={<FilterMeal/>} />
          <Route path='/:mealType/Restaurant/:id' element={<Restaurant/>} />
          <Route path= '/thankyou' element= {<ThankyouPage/>} />
        </Routes>

      </Router> 

     
          {/* <button type="submit" onClick={RestaurantList()}>Connected?</button>  */}

          {/* <RestaurantList/>     */}
    
    </div>
  );
}

function FilterMeal (){
  return (
    <>
      {window.scrollTo(0,0)}
      {window.location.pathname !== "/"?<Header/>:""}
      <FilterMealType />
      <Footer />
    </>
  )
};


function Restaurant (){
  return (
    <>
      {window.scrollTo(0,0)}
      {window.location.pathname !== "/"?<Header/>:""}
      <RestaurantPage />
      <Footer />
    </>
  )
};


function ThankyouPage (){
  return (
    <>
      {window.scrollTo(0,0)}
      {window.location.pathname !== "/"?<Header/>:""}
      <Thankyou/>
      <Footer />
    </>
  )
};
export default App;
