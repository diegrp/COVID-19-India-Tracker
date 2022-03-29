import React, { useState, useEffect } from "react";
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
    <main>

    </main>
  )
}

export default App;