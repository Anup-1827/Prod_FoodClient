// Packkages
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate'
import '../../Style/Pages/CommonItems.scss'// CSS File
import { useParams } from 'react-router-dom'
// Icon;
//Material UI
import Spinner from 'react-spinner-material';
// Components
import DisplayFilterItems from './Filter/DisplayFilterItems'
import CheckBox from './Filter/CheckBox'
import { cusiuneArr } from './Filter/CheckBox'
import Dropdown from './Filter/Dropdown'
// import Data from '../../restauranList.json'
import NoData from './Filter/NoData';
import Menu from '../../svg/Menu';
// import Data from '../../Services/RestaurantList';




export default  function FilterMealType() {
    const [filterTab, setFilterTab] = useState(true);
    let [ItemList, setItemList] = useState([]);
    let [mealTypeData, setMealTypeData] = useState([])
    const checkedArr = new Array(cusiuneArr.length).fill(false);
    const [checekedCheckbox, setCheckedCheckbox] = useState(checkedArr);
    const [selectLocation, setSelectLocation] = useState('all'); //Dropdown
    const [radioChecked, setRadioChecked] = useState(new Array(cusiuneArr.length).fill(false)); //Radio
    const [selectedCuisine, setSelectedCuisine] = useState(['all'])
    const [selectedPrices, setSelectedPrices] = useState([]);
    const [sortPrices, setSortPrices] = useState("")
    const { mealType } = useParams();
    const [checkData, setCheckData]= useState(null)
    let filterContent = '';
    let displayItems = '';
    { filterTab ? filterContent = 'FilterContent hide' : filterContent = 'FilterContent' }

    const filter = {
        location: selectLocation,
        cuisine:selectedCuisine,
        prices:selectedPrices,
        sorting:sortPrices
    }


    useEffect(()=>{
        try{
        let renderingData = [];

        // Start of filtering data based on mealType
        renderingData = mealTypeData.filter(item=> item.mealType.toLowerCase() === mealType.toLowerCase());
        // End of filtering data based on mealType

        //Start of Handling Location
        if(filter.location !=='all'){
            let filteredLocation = [];
            filteredLocation = renderingData.filter(item=> item.location.toLowerCase() === filter.location.toLowerCase())
            renderingData = filteredLocation;
        }
        //End of Handling Location

        // Start of Handling Cuisines
        if(filter.cuisine.length !==1){
            let filteredCuisine = [];
            filteredCuisine = renderingData.filter((item)=>{
                if(selectedCuisine.includes(item.cuisine)){
                    return item;
                }
                if(selectedCuisine.length===1 && selectedCuisine[0] === 'all'){
                    return item;
                }
            })
            renderingData = filteredCuisine;
        }
        // End of Handling Cuisines

        // Start of Handling Prices
        if(filter.prices.length !== 0){
            let filteredPriced = [];
            const priceArr = filter.prices; 
            if(priceArr.length === 2){
                filteredPriced = renderingData.filter(item=>{
                    return Number(item.costforTwo) >= Number(priceArr[0]) && Number(item.costforTwo) < Number(priceArr[1])
                })
                renderingData = filteredPriced;
            }else if (priceArr.length === 1){
                filteredPriced = renderingData.filter(item=>{
                    return Number(priceArr[0]) === 500? Number(item.costforTwo) <500 : Number(item.costforTwo) >=2000
                })
                renderingData = filteredPriced;
            }
        }
        // End of Handling Prices

        // Start of Sorting Prices
        if(filter.sorting != ""){
            if(filter.sorting.toLowerCase() === 'pricelowtohigh'){
                renderingData.sort((a,b)=> {
                    return Number(a.costforTwo) - Number(b.costforTwo)
                })
            }else{
                renderingData.sort((a,b)=> {
                    return Number(b.costforTwo) - Number(a.costforTwo)
                })
            }
        }
        // End of Sorting Prices
        if(renderingData.length === 0){
            setCheckData(<NoData/>)
        }
        setItemList(renderingData);
        SetPageNumber(0);
        handelPageEvent({selected: 0})
    }
    catch(err){
        console.log(err);
    }
    }, [selectLocation,selectedCuisine,selectedPrices, sortPrices])



    useEffect(()=>{
        setCheckData(<Spinner radius={120} color={"#ce0505"} stroke={2} visible={true} />)
        const ResListFun = async ()=>{
            try{
                const ResList = await axios.get('https://foodbackend.onrender.com/v1/restaurantList').then(
                    (result)=>{
                        setItemList(result.data.list);
                        setMealTypeData(result.data.list)
                    })
            }
            catch(err){
                alert(err)
            }
        }
        ResListFun()
    },[])


    // Start of Handling Cuisine
    const handleCheckbox = (position, filterType) => {
        const trueBox = checekedCheckbox.map((item, index) => {
            return position === index ? !item : item;
        })
        setCheckedCheckbox(trueBox);
        
        const cuisineFilter = trueBox.reduce((acc,item, index)=>{
            if(item){
                acc.push(cusiuneArr[index])
            }else{
                if(acc.includes(cusiuneArr[index])){
                    const cuisineIndex = acc.indexOf(cusiuneArr[index]);
                    acc.splice(cuisineIndex, 1);
                }
            }
            return acc
        },['all'])
        setSelectedCuisine(cuisineFilter); 
    }
    // End of Handling Cuisine
    
    // Start of Handling Prices
    const handlePrices = (position, priceRange)=>{
        const trueRadio = radioChecked.map((item,index)=>{
            return position===index? !item: false;
        })
        setRadioChecked(trueRadio);
        const priceArr = priceRange.toLowerCase().split('to')
        setSelectedPrices(priceArr);
    }
    // End of  Handling Prices


    // Pagination
    const [pageNumber, SetPageNumber] = useState(0);
    const noOfItems = 2;
    const itemvisited = pageNumber * noOfItems;

    ItemList = ItemList.filter((item)=>item.mealType.toLowerCase() === mealType.toLowerCase())
     if(ItemList.length != 0) {
            displayItems = ItemList.slice(itemvisited, itemvisited + noOfItems)
        .map((item, index) => {
            return (
                <DisplayFilterItems key={item} item={item} index={index} />
            )
        })
    }else{
        displayItems=  checkData;

    }
    const pageCount = Math.ceil(ItemList.length / noOfItems) //Number of Pages
    const handelPageEvent = (data) => {
        console.log(data)
        SetPageNumber(data.selected)
    }
    //End of Pagination

    return (
        <div className='Meal'>
            {console.log("rendered")}
            <h1 className='heading'>{mealType.charAt(0).toUpperCase() + mealType.slice(1)} Places</h1>
            <div className='Content'>

                <div className='Filter'>
                    <div className='FilterBar'>
                        <h2>Filter</h2>
                        <Menu onClick={() => { setFilterTab(!filterTab) }} />
                    </div>
                    <div className={filterContent}>
                        <div className='DivSelectLocation'>
                            <label className='LblLocation'>Select Location</label>
                            <Dropdown setSelectLocation={setSelectLocation}/>
                        </div>
                        <div className='DivCuisine DivCuisineAndCost'>
                            <label className='LblCuisnie LblCuisnieAndCost'>Cuisine</label>
                            <div className='RadCuisine RadCuisineAndCost'>
                                <CheckBox checekedCheckbox={checekedCheckbox} handleCheckbox={handleCheckbox}/>
                            </div >
                        </div>
                        {/* Cost For two */}
                        <div className='DivCostForTwo DivCuisineAndCost'>
                            <label className='LblCostForTwo LblCuisnieAndCost'>Cost For Two</label>
                            <div className='RadCostForTwo RadCuisineAndCost'>
                                <div><input type='radio' name='CostForTwo' id='Lessthan₹500' value='500' checked={radioChecked[0]} onChange={(e)=> handlePrices(0, e.target.value)}/><label htmlFor='Lessthan₹500'>Less than ₹500</label></div>
                                <div><input type='radio' name='CostForTwo' id='₹500to₹1000' value='500to1000' checked={radioChecked[1]} onChange={(e)=> handlePrices(1, e.target.value)}/><label htmlFor='₹500to₹1000'>₹500 to ₹1000</label></div>
                                <div><input type='radio' name='CostForTwo' id='₹1000to₹1500' value='1000to1500' checked={radioChecked[2]} onChange={(e)=> handlePrices(2, e.target.value)}/><label htmlFor='₹1000to₹1500'>₹1000 to ₹1500</label></div>
                                <div><input type='radio' name='CostForTwo' id='₹1500to₹2000' value='1500to2000' checked={radioChecked[3]} onChange={(e)=> handlePrices(3, e.target.value)}/><label htmlFor='₹1500to₹2000'>₹1500 to ₹2000</label></div>
                                <div><input type='radio' name='CostForTwo' id='₹2000+' value='2000' checked={radioChecked[4]} onChange={(e)=> handlePrices(4, e.target.value)}/><label htmlFor='₹2000+'>₹2000+</label></div>
                            </div >
                        </div>
                        {/* Cost For two */}

                        {/* Sort */}
                        <div className='DivSort DivCuisineAndCost'>
                            <label className='LblSort LblCuisnieAndCost'>Sort</label>
                            <div className='RadSort RadCuisineAndCost'>
                                <div><input type='radio' name='Sort' id='Pricelowtohigh' value='Pricelowtohigh' onChange={(e)=> setSortPrices(e.target.value)}/><label htmlFor='Pricelowtohigh'>Price low to high</label></div>
                                <div><input type='radio' name='Sort' id='Pricehightolow' value='Pricehightolow' onChange={(e)=> setSortPrices(e.target.value)}/><label htmlFor='Pricehightolow'>Price high to low</label></div>
                            </div >
                        </div>
                        {/* End of Sort */}
                    </div>
                </div>
                <div className='MenuItems'>
                    {displayItems}
                </div>
                {
                ItemList.length!==0?
                    <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    containerClassName='Pagination'
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={1}
                    onPageChange={handelPageEvent}
                />
                : ""
                
                }


            </div>
        </div>

    )
}

