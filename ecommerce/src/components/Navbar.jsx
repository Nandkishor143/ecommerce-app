import React from 'react'
import styled from 'styled-components';
import { Search } from '@mui/icons-material';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { mobile } from '../responsive';

const Container  = styled.div`
    height: 60px; 
    display: flex;
    align-items: center;
    ${mobile(
        {height: '50px'}
    )
    }
    /* border: 2px solid yellow; */

`
const Wrapper = styled.div`
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 100%;
    ${mobile(
        {padding: '0 0'}
    )
    }
    /* border: 2px solid red; */
`
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    /* border: 2px solid green; */
`
const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile(
        {display: 'none'}
    )
    }
`

const SearchContainer = styled.div`
    border: 1px solid lightgrey;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
    ${mobile(
        {marginLeft: '5px'}
    )
    }
`
const Input = styled.input`
    border: none;
    ${mobile(
        {width: '42px'}
    )
    }
`

const Center = styled.div`
    flex: 1;
    text-align: center;
`
const Logo = styled.h1`
    font-weight: bold;
    ${mobile(
        {fontSize: '24px', margin: '0 5px'}
    )
    }
`
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
   
    ${mobile({flex: '1.5', paddingRight: '10px'})}
    /* border: 2px solid green; */
`
const MenuItem = styled.div`
    /* border: 2px solid gray; */
    cursor: pointer;
    font-size: 14px;
    text-transform: uppercase;
    margin-left: 25px;
   
    
    ${mobile(
        {fontSize: '12px', marginLeft: '5px'}
    )
    }
`


const Navbar = () => {
  return (
    <Container>
        <Wrapper>
        <Left>
            <Language>
                EN
            </Language>
            <SearchContainer>
                <Input placeholder='Search'/>
                <Search  style={{color: 'gray', fontSize: 16}}/>
                
            </SearchContainer>
        </Left>
        <Center>
            <Logo>
                Ecommerce
            </Logo>
        </Center>
        <Right>
            <MenuItem>Register</MenuItem>
            <MenuItem>Log In</MenuItem>
            <MenuItem>
            <Badge badgeContent={4} color="primary">
                <ShoppingCartOutlinedIcon />
            </Badge>
            </MenuItem>
        </Right>
            
        </Wrapper>
    </Container>
  )
}

export default Navbar
