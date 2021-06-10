import webshift from 'webshift';
import { chunk } from 'webshift'
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import loadable from '@loadable/component';
import {
    space,
    color,
    fontSize,
    layout,
} from 'styled-system';

import Logo from './logo512.png';

//import Aboutus from './Aboutus';
import Error from './Error';
//import HomeTMP from './Home';

const theme = {
    fontSizes: {
        h3: '32px',
        paragraph: '21px',
        button: '18px',
        caption: '16px'
    },
    space: {
        small: '8px',
        normal: '12px',
    },
    colors: {
        text: 'rgba(0, 0, 0, 0.87)',
        white: '#FFFFFF',
        primary: '#1976d2',
        red: '#e10',
    },
}

const Bar = styled('div')`
    display: flex;
    flex-wrap: wrap;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    ${space}
    ${color}
`;

Bar.defaultProps = {
    padding: 'small',
    backgroundColor: 'primary',
    color: 'white',
};

const Header3 = styled('h3')`
    border: 0;
    ${space}
    ${fontSize}
`;
Header3.defaultProps = {
    fontSize: 'h3',
    margin: 'small',
};

const Button = styled('button')`
  outline: none;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  ${space}
  ${color}
  ${fontSize}
  ${layout}
  &:hover {
    color: white;
  }
`;

Button.defaultProps = {
    fontSize: 'button',
    color: 'white',
    padding: 'small',
    margin: 'small',
    backgroundColor: 'primary',
    minWidth: '90px',
};

function App() {
    function handleClick(e) {
        e.preventDefault();
        console.log('The link was clicked.');
    }
    const Home = loadable(() => import('./Home'));
    const Aboutus = loadable(() => import('./Aboutus'));
    const Error = loadable(() => import('./Error'));

    return (
        <ThemeProvider theme={ theme }>
            <Bar className={"header"}>
                <img src={ Logo } width="50" height="50" />
                <Header3>Tech Blog</Header3>
            </Bar>
            <Bar className={"main-menu"} backgroundColor='white'>
                <Link to="/">
                    <Button>Home</Button>
                </Link>
                <Link to="/about">
                    <Button>About Us</Button>
                </Link>
                <Button onClick={handleClick}>Click Test</Button>
            </Bar>
            <Switch>
                <Route path={ '/' } component={ Home } exact/>
                <Route path={ '/about' } component={ Aboutus } />
                <Route component={ Error } />
            </Switch>
        </ThemeProvider>
    );
}

export default webshift(App);
