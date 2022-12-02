import "./Course.css";
const Card = (props) => {

    const name = props.name;
    const number = props.number;
    const prof = props.prof;
    const course_rating = props.courseRating;
    const prof_rating = props.profRating;
    const avg_hours = props.avgHours;
    const level = props.level;
    const addToCart = props.addToCart;
    const removeFromCart = props.removeFromCart;

    return (
        <div id="card">
            <h4>{name}, CSCI {number}</h4>
            <div>Professor: {prof}</div>
            <div>Course Rating: {course_rating}</div>
            <div>Professor Rating: {prof_rating}</div>
            <div>Average Hours: {avg_hours}</div>
            <div>Level: {level}</div>
            <button onClick={ (e) => {addToCart(name, avg_hours);} }>Add to Cart</button>
            <button onClick={ () => {removeFromCart(name, avg_hours);} }>Remove from Cart</button>
        </div>
    )
}

export default Card;