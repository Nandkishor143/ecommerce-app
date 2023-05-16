import { style } from "@mui/system";
import styled from "styled-components"
import { mobile } from "../responsive";
import {Link} from "react-router-dom"
const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  ${mobile({height: '40vh'})}
  object-fit: cover;
`

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;



`
const Title = styled.h1`
  color: #fff;
  margin-bottom: 20px;


`
const Button = styled.button`
  border: none ;
  padding: 10px;
  background-color: #fff;
  color: gray;
  cursor: pointer;
  font-weight: 600;

` 

const CategoriesItem = ({item}) => {
  return (
    <Container>
      <Image src= {item.img} />
      <Link to={`/products/${item.cat}`}>

      <Info>
        <Title>{item.title}</Title>
        <Button>SHOP NOW</Button>
      </Info>
      </Link>

    </Container>
  )
}

export default CategoriesItem;
