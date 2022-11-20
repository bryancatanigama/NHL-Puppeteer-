const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
var url = "https://www.nhl.com/stats/teams";
const connectToDataBase = require('./db');
const nhldb = require('./nhldb');

connectToDataBase();

async function montarPropety(dados){
    let [valor]=await page.$x(dados);
    let text = await valor.getProperty('textContent');
    let date = await text.jsonValue();
    v_datas = date.trim();
    return  v_datas;
}

async function montarDados(){
    const browser = await puppeteer.launch({headless:true});
    const page = await browser.newPage();
    await page.goto(url);
    
    //clicar no cookie
    await page.click('#onetrust-pc-btn-handler');
    page.waitForNavigation();
    await page.click('#onetrust-pc-sdk > div.ot-pc-footer > div.ot-btn-container > button');
    await estrairDadosList();
    await page.waitForTimeout(1000);
    await browser.close();
 
  
 async function estrairDadosList(){ 
  for(var i= 1;i<=32;i++){
    let team = await montarPropety('/html/body/div[1]/div[2]/main/div[5]/div[1]/div[2]/div['+i+']/div/div[2]');
    let season = await montarPropety('/html/body/div[1]/div[2]/main/div[5]/div[1]/div[2]/div['+i+']/div/div[3]');
    let gp = await montarPropety('/html/body/div[1]/div[2]/main/div[5]/div[1]/div[2]/div['+i+']/div/div[4]');
    let w = await montarPropety('/html/body/div[1]/div[2]/main/div[5]/div[1]/div[2]/div['+i+']/div/div[5]'); 
    let l = await montarPropety('/html/body/div[1]/div[2]/main/div[5]/div[1]/div[2]/div['+i+']/div/div[6]');
    let t = await montarPropety('/html/body/div[1]/div[2]/main/div[5]/div[1]/div[2]/div['+i+']/div/div[7]');
    let ot = await montarPropety('/html/body/div[1]/div[2]/main/div[5]/div[1]/div[2]/div['+i+']/div/div[8]');
    let p = await montarPropety('/html/body/div[1]/div[2]/main/div[5]/div[1]/div[2]/div['+i+']/div/div[9]');
    let pPorcent = await montarPropety('/html/body/div[1]/div[2]/main/div[5]/div[1]/div[2]/div['+i+']/div/div[10]');
    let rw = await montarPropety('/html/body/div[1]/div[2]/main/div[5]/div[1]/div[2]/div['+i+']/div/div[11]');
    let row = await montarPropety('/html/body/div[1]/div[2]/main/div[5]/div[1]/div[2]/div['+i+']/div/div[12]');
    let soWin = await montarPropety('/html/body/div[1]/div[2]/main/div[5]/div[1]/div[2]/div['+i+']/div/div[13]');
    let gf = await montarPropety('/html/body/div[1]/div[2]/main/div[5]/div[1]/div[2]/div['+i+']/div/div[14]');
    let ga = await montarPropety('/html/body/div[1]/div[2]/main/div[5]/div[1]/div[2]/div['+i+']/div/div[15]');
    let gfIngp = await montarPropety('/html/body/div[1]/div[2]/main/div[5]/div[1]/div[2]/div['+i+']/div/div[16]');
    let gaIngp = await montarPropety('/html/body/div[1]/div[2]/main/div[5]/div[1]/div[2]/div['+i+']/div/div[17]');
    let ppPorcent = await montarPropety('/html/body/div[1]/div[2]/main/div[5]/div[1]/div[2]/div['+i+']/div/div[18]');
    let pkPorcent = await montarPropety('/html/body/div[1]/div[2]/main/div[5]/div[1]/div[2]/div['+i+']/div/div[19]');
    let netPpPorcent = await montarPropety('/html/body/div[1]/div[2]/main/div[5]/div[1]/div[2]/div['+i+']/div/div[20]');
    let netPkPorcent = await montarPropety('/html/body/div[1]/div[2]/main/div[5]/div[1]/div[2]/div['+i+']/div/div[21]');
    let shotsGp = await montarPropety('/html/body/div[1]/div[2]/main/div[5]/div[1]/div[2]/div['+i+']/div/div[22]');
    let saGp = await montarPropety('/html/body/div[1]/div[2]/main/div[5]/div[1]/div[2]/div['+i+']/div/div[23]');
    let fowPorcent = await montarPropety('/html/body/div[1]/div[2]/main/div[5]/div[1]/div[2]/div['+i+']/div/div[24]');  
   
    const nhlSalve = new nhldb({
        team:team,
        season:season,
        gp:gp,
        w:w,
        l:l,
        t:t,
        ot:ot,
        p:p,
        pPorcent:pPorcent,
        rw:rw,
        row:row,
        soWin:soWin,
        gf:gf,
        ga:ga,
        gfInGp:gfIngp,
        gaInGp:gaIngp,
        ppPorcent:ppPorcent,
        pkPorcent:pkPorcent,
        netPkPorcent:netPkPorcent,
        netPpPorcent:netPpPorcent,
        shotsGp:shotsGp,
        saGp:saGp,
        fowPorcent:fowPorcent,
        dataAt:dataAtual(),
    });
    try{
        nhlSalve.save();
        console.log('add itens')
    } catch(erro){
        console.error('Erro ao add itens',erro)
      }
    }
 }
 function dataAtual(){   
 const data = new Date();
 const dia = String(data.getDate()).padStart(2,'0');
 const mes = String(data.getMonth()+1).padStart(2,'0');
 const ano = String(data.getFullYear());
 const dataAtual = `${dia}/${mes}/${ano}`;
    return dataAtual;
  }

//monta os retornos da url
    async function montarPropety(dados){
        let [valor]=await page.$x(dados);
        let text = await valor.getProperty('textContent');
        let date = await text.jsonValue();
        v_datas = date.trim();
        return  v_datas;
    }

}

montarDados();