Feature('IntegrationTest');

const expect = require('chai').expect;
const {I} = inject();
const assert = require('assert');
const { setMaxIdleHTTPParsers } = require('http');

Scenario('Checking if Backend is already up', async () =>{
    I.amOnPage('https://backend-production-1abf.up.railway.app/');
})

Scenario('Checking Contador Render',async () => {
    I.amOnPage('https://frontend-production-0c0f.up.railway.app/');
    I.see('Contador', {css: '#contador'});
})

Scenario('Checking Buttons Render', async () => {
    I.amOnPage('https://frontend-production-0c0f.up.railway.app/');

    I.see('Incrementar', {css: '#btn-sum'});
    I.see('Decrementar', {css: '#btn-sub'});
    I.see('Reiniciar', {css: '#btn-restart'});
})

Scenario('Checking Buttons Behaviour and Backend response', async () => {
    I.amOnPage('https://frontend-production-0c0f.up.railway.app/');

    I.click({css: '#btn-restart'});
    await new Promise(r => setTimeout(r, 3000));
    let contador = await I.grabTextFrom('#contador');
    assert.equal(' Contador: 0 ',contador);

    I.click({css: '#btn-sum'});
    await new Promise(r => setTimeout(r, 3000));
    contador = await I.grabTextFrom('#contador');
    assert.equal(' Contador: 1 ',contador);    

    I.click({css: '#btn-restart'});
    await new Promise(r => setTimeout(r, 3000));
    contador = await I.grabTextFrom('#contador');
    assert.equal(' Contador: 0 ',contador);

    I.click({css: '#btn-sub'});
    await new Promise(r => setTimeout(r, 3000));
    contador = await I.grabTextFrom('#contador');
    assert.equal(' Contador: -1 ',contador);
})

