# Frontend:

### how to make slider:
- first repeat `<Slide>` block three times
- then make wrapper as display flex { as this mke all three Slide horizontal.}
- then make container as overflow hidden {as this make overflow hidden horizotally.}
- then we can pass a probs in Slide to change background.
- Now to slide image on click to arrow button we have to define onClick event inside that we define a function named handleClick
- Also we take a parameter inside handleClick function for that we need to used arrow function inside it
__Note__: whenever we take parameter inside a function we need to use arrow funciton.
ex- 
```js
    <Arrow onClick = { ()=> handleClick("left") }>
```
- before defining handleClick let's see what we are going to do.
    - Go to Wrapper > set tranfrom: tranlateX({0, -100vw, -200vw}) but when it -200 and if right arrow is clicked then it should be 0 again not 300vw because at 300vw we don't have anything.
    - then we use `useState` hook and just see handleClick function you know what it does.

#### how to pass props in styled component:

for ex - you can define a component and pass props like this
```js
    <TopButton type="filled">CHECKOUT NOW</TopButton>
```
then based on props if you want to style,
```js
    const TopButton = styled.button`
    
    border: ${props => props.type === 'filled' && "none"}; //see here how we style based on props.
    background: ${props => props.type === 'filled' ? 'black' : 'transparent'};
    color: ${props => props.type === 'filled' && '#fff'};
    `
```

#### how to add media queries to make responsive:
- we can define media-queries inside our defining TopButton component, but if we do so then we need to write each time, everywhere where we want to make responsive.
- There fore we create a responsive.js file in src directory and define media queries there and where ever we need to use them we can import them and ready to use.

```js
    // in responsive.js
    import { css } from "styled-components"

    export const mobile = (props) =>{
        return css`
            @media only screen and (max-width: 380px) {
                ${props}
            }
        `
    }


    // inside any component 
    import { mobile } from '../responsive.js'

    const Cart = styled.div`
        ${mobile({backgroundColor: 'red'})}
        `
```

# Backend: 

