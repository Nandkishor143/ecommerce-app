import styled from '@emotion/styled'
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import Products from '../components/Products';
import { mobile } from '../responsive';
import { useLocation} from "react-router-dom"
import { useState } from 'react';


const Container = styled.div`
    

`
const Title = styled.h1`
    margin: 20px;

`

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;

`

const Filter = styled.div`
    margin: 20px;
    ${mobile({margin: '0 20px', display: 'flex', flexDirection: 'column'})}

`

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${mobile({marginRight: '0'})}
`

const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile({margin: '10px 0'})}
`

const Option = styled.option`
    
`


const ProductList = () => {
    const location = useLocation()
    const cat = location.pathname.split("/")[2];
    const [filter, setFilter] = useState({});
    const [sort, setSort] = useState("newest");
    const handleFilter = (e) =>{
        const target = e.target;
        setFilter({
            ...filter, 
            [target.name]: target.value
        });
    }
    
  return (
    <Container>
        <Navbar />
        <Announcement />
        <Title>{cat}</Title>
        <FilterContainer>
            <Filter>
                <FilterText>Filter Products</FilterText>
                <Select defaultValue='Color' name='color' onChange={handleFilter}>
                    <Option >Color</Option>
                    <Option>white</Option>
                    <Option>black</Option>
                    <Option>red</Option>
                    <Option>blue</Option>
                    <Option>yellow</Option>
                    <Option>green</Option>
                </Select>
                <Select defaultValue='Size' name='size' onChange={handleFilter}>
                    <Option>Size</Option>
                    <Option>XS</Option>
                    <Option>S</Option>
                    <Option>M</Option>
                    <Option>L</Option>
                    <Option>XL</Option>
                </Select>
            </Filter>
            <Filter>
                <FilterText>Sort Products</FilterText>
                <Select defaultValue='Newest' onChange={e => setSort(e.target.value)}>
                    <Option value="newest" >Newest</Option>
                    <Option value="asc">Price (asc)</Option>
                    <Option value="des">Price (desc)</Option>
                </Select>
            </Filter>
        </FilterContainer>
        <Products cat= {cat} filter= {filter} sort= {sort} />
        <Newsletter />
        <Footer />
    </Container>
  )
}

export default ProductList;
