import React, { useState, useEffect } from "react";
import { CardItem } from "./components/CardItem";
import { TableItem } from "./components/TableItem";
import Applogo from "./images/logo/logo.png";
import { formateDate, myDate } from "./dateFilter";
import axios from "axios";
import './App.css';

const App = () => {

  const [ totalIndiaCase, setTotalIndiaCase ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ totalStateWiseCount, setTotalStateWiseCount ] = useState([]);
  const [ totalStateArrayLength, setTotalStateArrayLength ] = useState('');
  let [ filteredData ] = useState();

  useEffect(() => {
    loadData();
  },[]);

  // Carrega os dados da API

  /* acessa a api e pega os dados manipulados e sua respectiva quantidade */

  const loadData = async () => {
    setLoading(true);
    const resp = await axios.get("https://data.covid19india.org/data.json");
    setTotalIndiaCase(resp.data.statewise.slice(0, 1));
    const totalStateCount = resp.data.statewise.slice(1);
    setTotalStateWiseCount(totalStateCount);
    setTotalStateArrayLength(totalStateCount.length);
    setLoading(false);
  };

  // Procura o estado

  /* tenta procurar estados que corresponde com o que esteja procurando */

  const stateSearch = (searchText) => {
    filteredData = totalStateWiseCount.filter((value) => {
      return value.state.toLowerCase().includes(searchText.toLowerCase());
    });
    setTotalStateWiseCount(filteredData);
  };

  return(
    <main className="app-container">
      <div className="wrapper-app-logo">
        <img src={Applogo} style={{height:"100px"}} alt="COVID19-Tracker"/>
          <div className="title">
            <h1>COVID-19 - INDIA TRACKER</h1>
              <p>Rastreamente em tempo real, a partir de <strong>{formateDate(myDate())}</strong></p>
          </div>
      </div>
        {/* Visão geral da quatidade de casos */}
        <CardItem totalIndiaCase={totalIndiaCase}/>
        {/* Tabela com os dados de infecção de cada estado */}
        <TableItem 
          totalStateWiseCount={totalStateWiseCount}
          totalStateArrayLength={totalStateArrayLength}
          loading={loading}
          loadData={loadData}
          fileteredData={filteredData}
          stateSearch={stateSearch}
        />
    </main>
  )
}

export default App;