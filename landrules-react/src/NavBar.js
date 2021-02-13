import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { ClockCircleOutlined, MenuOutlined, TransactionOutlined } from '@ant-design/icons';
import { Router, Link } from "@reach/router"
const { SubMenu } = Menu;

function Navbar(props) {
    const [current, setcurrent] = useState('mail');
    const [hovering, setHovering] = useState(false);

    function handleclick(e) {
        console.log('click', e);
        setcurrent(e.key);
    }
    {/*NavBar different for diff pages
    props.page = "man" -> return navigation bar for manufacturer page
    if you do not set props.page when you vall NavBar then you will get the default home
    */}

    return (
        <Menu onClick={handleclick} selectedKeys={[current]} mode="horizontal" theme="dark">
            <Menu.Item>
              <svg width="23" height="17" viewBox="0 0 92 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="66.4409" height="61.2131" rx="17" stroke="white" stroke-width="6"/>
                <rect x="22.5591" y="17.7869" width="66.4409" height="61.2131" rx="17" stroke="white" stroke-width="6"/>
                <path d="M38.9475 43.5239H44.9275V46.4099H35.3075V28.2619H38.9475V43.5239Z" fill="white"/>
                <path d="M56.0699 55.8197L52.0659 48.7477H50.3499V55.8197H46.7099V37.6717H53.5219C54.9259 37.6717 56.1219 37.923 57.1099 38.4257C58.0979 38.911 58.8346 39.5783 59.3199 40.4277C59.8226 41.2597 60.0739 42.1957 60.0739 43.2357C60.0739 44.4317 59.7273 45.515 59.0339 46.4857C58.3406 47.439 57.3093 48.0977 55.9399 48.4617L60.2819 55.8197H56.0699ZM50.3499 46.0177H53.3919C54.3799 46.0177 55.1166 45.7837 55.6019 45.3157C56.0873 44.8303 56.3299 44.163 56.3299 43.3137C56.3299 42.4817 56.0873 41.8403 55.6019 41.3897C55.1166 40.9217 54.3799 40.6877 53.3919 40.6877H50.3499V46.0177Z" fill="white"/>
              </svg>
              <span>landRules</span>
            </Menu.Item>
            <Menu.Item key="form" icon={<TransactionOutlined />} style={{float: "right"}}>
              <Link to="/form">Form</Link>
            </Menu.Item>
            <Menu.Item key="register" icon={<TransactionOutlined />} style={{float: "right"}}>
              <Link to="/register">Register</Link>
            </Menu.Item>
            <Menu.Item key="login" icon={<TransactionOutlined />} style={{float: "right"}}>
              <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="home" icon={<TransactionOutlined />} style={{float: "right"}}>
              <Link to="/">Home</Link>
            </Menu.Item>
        </Menu>
    );
    
}

export default Navbar;