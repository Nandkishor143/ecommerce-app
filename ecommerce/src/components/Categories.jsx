import styled from "styled-components"
import { categories } from "../assets/data"
import { mobile } from "../responsive"
import CategoriesItem from "./CategoryItem"

const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    ${mobile({padding: '0', flexDirection: 'column'})}
`

const Categories = () => {
  return (
    <Container>
    {
        categories.map((item)=>(
            <CategoriesItem item={item} key={item.id} />
        ))
    }
    </Container>
  )
}

export default Categories
