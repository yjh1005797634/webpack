/**
 * Created by apple on 18/10/3.
 */

import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import _ from 'lodash';
import {AppContainer} from 'react-hot-loader';


import './style.css';




function component() {
    var element = document.createElement('div');
    element.innerHTML = _.join(['hello','world'],'');
    element.classList.add('hello');
    document.body.appendChild(element);

    return element;
}
var div = document.createElement('div');
document.body.appendChild(div);
var oDiv = component();


// ReactDOM.hydrate(<App/>,oDiv);

// const root = document.getElementById('root');

//封装一个render方法
const render = Component =>{

    // alert('热跟新');
    //只不过是用热更新出来的一个组件包裹了App
    ReactDOM.render(

        <AppContainer>
            <Component/>
        </AppContainer>,
        oDiv
    )
}
render(App);

// console.log(module.hot.accept);


if(module.hot){


    module.hot.accept('./App.jsx',()=>{
        // alert('hot');
        const NextApp = require('./App.jsx').default;
        // ReactDOM.hydrate(<NextApp/>,oDiv);
        render(NextApp);
    })

}