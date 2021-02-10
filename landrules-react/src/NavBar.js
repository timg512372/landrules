import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { ClockCircleOutlined, MenuOutlined, TransactionOutlined } from '@ant-design/icons';
import { Router, Link } from "@reach/router"
const { SubMenu } = Menu;



function Navbar(props) {
    const [current, setcurrent] = useState('mail');

    function handleclick(e) {
        console.log('click', e);
        setcurrent({ current: e.key });
    }
    {/*NavBar different for diff pages
    props.page = "man" -> return navigation bar for manufacturer page
    if you do not set props.page when you vall NavBar then you will get the default home
    */}

    return (
        <Menu onClick={handleclick} selectedKeys={[current]} mode="horizontal" theme="dark">            
            <Menu.Item key="home" icon={<TransactionOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="login" icon={<TransactionOutlined />}>
              <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="register" icon={<TransactionOutlined />}>
              <Link to="/register">Register</Link>
            </Menu.Item>
        </Menu>
    );
    
}

export default Navbar;