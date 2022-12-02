# Development

### Link to Deployed Website
If you used the stencil code, this is `https://existentialelephant000.github.io/development`


### Goal and Value of the Application
Goal: For computer science students at Brown who want to take the "best" courses according to Critical
Review statistics. By having all the csci courses on one page and being able to sort and filter, students
might have a better sense of what they want to take by using this page.

### Usability Principles Considered

Learnability - I tried to make the website as learnable as possible, so that new users would not have any
trouble using the website. I think the website is pretty inuitive, labels and components are big, and there are not so many buttons

Visual Heirarchy - Most important elements, the cart and filter box are at the top, and then the user will 
look down to see the courses.

Limiting the Gulf of Interaction - Users know when they have added or removed from the cart because the change shows instantly

### Organization of Components

There is the main App.js, which contains all the components and logic for the page. I have only 1 component
which is the Course component. This card style component contains all the info about a course as well as an
"Add to Cart" and "Remove from Cart" buttons. I simply map them in App.js and then display them in a div.
The data itself comes from the course-data.json file.

The Cart and Filterbox are both within App.js, not other components. This is because they are text based and do not change based on the data/json files, thus there wasn't a good reason to put them into other components.

### How Data is Passed Down Through Components
When I map out the course-data in App.js, I pass all the data as props into a "Course" component from Course.jsx, which then takes those props and displays them. In in addition to data from the .json file, I pass in
"addToCart" and "removeFromCart" functions, which update the states of the cart and hours aggregator in the cart.

### How the User Triggers State Changes
For this implementation, the user triggers a state change any time they click a button. For example, if they click a filter button, the state for that button fill chnage from "false" to "true", then, using useEffect, I change the state of the "data" state using setData to change which courses are being displayed. A similar mechanism is used for the checkboxes and add to cart and remove from cart features - the user clicks a button which changes the state, which then has an effect on which/how the data is displayed.

