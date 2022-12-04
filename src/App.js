import "./App.css";
import { useEffect, useState } from "react";
import courseData from "./assets/course-data.json";
import Course from "./components/Course";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

function App() {

  // useStates
  const [level1, setLevel1] = useState(false);
  const [level2, setLevel2] = useState(false);
  const [level3, setLevel3] = useState(false);
  const [sortType, setSortType] = useState("None");
  const [cart, setCart] = useState([]);
  const [totalHours, setTotalHours] = useState(0);

  // handleSort method for sorting by different values of the data
  const handleSort = {
    None: { method: (a,b) => null },
    Hours: { method: (a,b) => (a?.props?.avgHours > b?.props?.avgHours ? -1 : 1) },
    CourseRating: { method: (a,b) => (a?.props?.courseRating > b?.props?.courseRating ? -1 : 1) },
    ProfessorRating: { method: (a,b) => (a?.props?.profRating > b?.props?.profRating ? -1 : 1) },
  };

  // updates the state of the cart upon a button click
  const addToCart = (name, hours) => {
      if (!cart.includes(name)){
        setCart(cart => [...cart, name]);
        const t = (parseFloat(+totalHours) + parseFloat(+hours)).toFixed(2);
        setTotalHours(t);
    }
  };

  // updates the state of the cart upon a button click
  const removeFromCart = (name, hours) => {
    if (cart.includes(name)){
      setCart(cart => cart.filter(item => item != name));
      const t = (parseFloat(+totalHours) - parseFloat(+hours)).toFixed(2);
      setTotalHours(t);
    }
  };

  // cart data mapped
  const cartElement = cart.map((item) => {
    return (
        <li>{item}</li>
    )
  });

  // course data mapped
  const rawData = courseData.map((item) => (
      <Course name={item.name} number={item.number} prof={item.prof}
      courseRating={item.courseRating} profRating={item.profRating} 
      avgHours={item.avgHours} level={item.level} addToCart={addToCart}
      removeFromCart={removeFromCart}/>
  ));
  const [data, setData] = useState(rawData);
  
  
  // useEffect used to filter data upon filter button clicks
  useEffect(() => {

    const filteredData = [];
    if (level1) {
      filteredData.push(...rawData.filter((d) => d.props.level == "Upper"));
    }
    if (level2) {
      filteredData.push(...rawData.filter((d) => d.props.level == "Intermediate"));
    }
    if (level3) {
      filteredData.push(...rawData.filter((d) => d.props.level == "Intro"));
    }
    if (!level1 && !level2 && !level3){
      filteredData.push(...rawData);
    }

    filteredData.sort(handleSort[sortType].method);
    setData(filteredData);

  }, [level1, level2, level3, sortType, cart, totalHours]);

  return (
    <div className="App">
      <div class="Header">
        <h1>CSCI Courses</h1>
      </div>
      <div class="MainGrid">
        <div class="SideBar">
          <div class="Cart">
            <h3>Cart</h3>
            {cartElement}
            <h4>Total Hours: {totalHours}</h4>
          </div>
          <div class="Options">
            <h3>Filter by Course Level</h3>
            <input type="checkbox" id="Upper" onChange={ (e) => setLevel1(e.target.checked) } />
            <label for="Upper"> Upper </label>
            <input type="checkbox" id="Intermediate" onChange={ (e) => setLevel2(e.target.checked) } />
            <label for="Intermediate"> Intermediate </label>
            <input type="checkbox" id="Intro" onChange={ (e) => setLevel3(e.target.checked) } />
            <label for="Intro"> Intro </label>
            <br/><br/>
            <h3>Sort Courses by Hours, Professor, and Class Rating</h3>
            <RadioGroup class="radio" name="sort" row onChange={(e) => setSortType(e.target.value)}>
              <FormControlLabel value="None" control={<Radio />} label="None" />
              <FormControlLabel value="Hours" control={<Radio />} label="Hours" />
              <FormControlLabel value="CourseRating" control={<Radio />} label="Course Rating" />
              <FormControlLabel value="ProfessorRating" control={<Radio />} label="Professor Rating" />
            </RadioGroup>
          </div>
        </div>
        <div class="ItemGrid">
          {data}
        </div>
      </div>
    </div>
  );
}

export default App;
