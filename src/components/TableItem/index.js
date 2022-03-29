import './TableItem.css';

// Tabela de casos de infecção

/* Detalhe de todos casos de infecção em todos os estados da Índia */

export const TableItem = ({ 
  totalStateWiseCount, 
  loading, 
  loadData, 
  totalStateArrayLength,
  filteredData,
  stateSearch
}) => {

  const [ sortedInfo, setSortedInfo ] = useState({});
  const [ page, setPage ] = useState(1);
  const [ postPerPage, setPostPerPage ] = useState(10);
  const [ searchText, setSearchText ] = useState("");
  const [ empty, setEmpty ] = useState(false);

  const handleChange = ( _, filters, sorter ) => {
    const { order, field } = sorter;
    setSortedInfo( { columnKey: field, order } );
  }

  const indexOfLastPage = page + postPerPage;
  const indexOfFirstPage = indexOfLastPage - postPerPage;
  const currentStateCovidCount = totalStateWiseCount.slice(
    indexOfFirstPage,
    indexOfLastPage
  );

  const onShowSizeChange = ( current, pageSize ) => {
    setPostPerPage(pageSize);
  };

  const itemRender = ( current, type, originalElement ) => {
    if(type === "prev"){
      return <Button type="link">Voltar</Button>;
    }
    if(type === "next"){
      return <Button type="link">Próximo</Button>;
    }
    return originalElement;
  }

  const columns = [
    {
      title: "UF/Estado",
      dataIndex: "state",
      sorter: (a, b) => a.state.length - b.state.length,
      sortOrder: sortedInfo.columnKey === "state" && sortedInfo.order,
      width: 120,
      align: "center",
    },
    {
      title: "Confirmados",
      dataIndex: "confirmed",
      sorter: (a, b) => a.confirmed.length - b.confirmed.length,
      sortOrder: sortedInfo.columnKey === "confirmed" && sortedInfo.order,
      width: 120,
      align: "center",
    },
    {
      title: "Ativos",
      dataIndex: "active",
      sorter: (a, b) => a.active.length - b.active.length,
      sortOrder: sortedInfo.columnKey === "active" && sortedInfo.order,
      width: 120,
      align: "center",
    },
    {
      title: "Recuperados",
      dataIndex: "recovered",
      sorter: (a, b) => a.recovered.length - b.recovered.length,
      sortOrder: sortedInfo.columnKey === "recovered" && sortedInfo.order,
      width: 120,
      align: "center",
    },
    {
      title: "Mortes",
      dataIndex: "deaths",
      sorter: (a, b) => a.deaths.length - b.deaths.length,
      sortOrder: sortedInfo.columnKey === "deaths" && sortedInfo.order,
      width: 120,
      align: "center",
      responsive: ['sm'],
    },
    {
      title: "Confirmados no Dia",
      dataIndex: "deltaconfirmed",
      sorter: (a, b) => a.deltaconfirmed.length - b.deltaconfirmed.length,
      sortOrder: sortedInfo.columnKey === "deltaconfirmed" && sortedInfo.order,
      width: 120,
      align: "center",
      responsive: ['md'],
    },
    {
      title: "Recuperados no Dia",
      dataIndex: "deltarecovered",
      sorter: (a, b) => a.deltarecovered.length - b.deltarecovered.length,
      sortOrder: sortedInfo.columnKey === "deltarecovered" && sortedInfo.order,
      width: 120,
      align: "center",
      responsive: ['lg'],
    },
    {
      title: "Mortes no Dia",
      dataIndex:"deltadeaths",
      sorter: (a, b) => a.deltadeaths.length - b.deltadeaths.length,
      sortOrder: sortedInfo.columnKey === "deltadeaths" && sortedInfo.order,
      width: 120,
      align: "center",
      responsive: ['lg'],
    }
  ];

  const handleSearch = ({ target }) => {
    setSearchText(target.value);
    if(target.value === ''){
      loadData();
    }
  }

  const clearAll = () => {
    setSortedInfo({});
    setSearchText("");
    loadData();
  };

  const refresh = () => {
    window.location.reload();
  }

  return(
    <div>
      ...
    </div>
  )
}