import React, { useState } from "react";
import { Table, Space, Input, Pagination, Button, Tooltip, Row, Alert } from "antd";
import { SearchOutlined, ClearOutlined, ReloadOutlined, WarningOutlined } from "@ant-design/icons";
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
    <section>
      <Row justify="center" className="search-state">
        <Space>
          <Input
            placeholder="Pesquise seu estado"
            onChange={handleSearch}
            type="text"
            onPressEnter={(e) => {
              if(e.key === 'Enter' && searchText !== ''){
                stateSearch(searchText);
                setEmpty(false);
              }else{
                setEmpty(true);
              }
            }}
            size="large"
            prefix={totalStateWiseCount.length === 0 && loading === false ? <WarningOutlined />:''}
            status={totalStateWiseCount.length === 0 && loading === false && searchText !== '' ? 'error':''}
            allowClear
            value={searchText}
          />
        <Tooltip title="Procurar">
          <Button 
            style={{ backgroundColor: '#52b85f', borderColor: '#52b85f' }} 
            type="primary" 
            shape="circle" 
            icon={<SearchOutlined />} 
            onClick={() => {
            if(searchText !== ''){
              stateSearch(searchText);
              setEmpty(false);
            }else{
              setEmpty(true);
            }}}
          />
          </Tooltip>
          <Tooltip title="Limpar">
            <Button 
              type="primary" 
              shape="circle" 
              icon={<ClearOutlined />} 
              onClick={clearAll}
            />
          </Tooltip>
          <Tooltip title="Atualizar">
            <Button 
              style={{ backgroundColor: '#ff4000', borderColor: '#ff4000' }} 
              type="primary" 
              shape="circle" 
              icon={<ReloadOutlined />} 
              loading={loading} 
              onClick={refresh}
            />
          </Tooltip>
        </Space>
      </Row>
      <Row justify="center">
        <Space style={{ marginBottom:"40px" }}>
          {empty && (
            <Alert
              message="Campo Vazio"
              description="Preencha o campo para encontrar informações de infeccção em seu estado."
              type="warning"
              showIcon
            />
          )}
        </Space>
      </Row>
      <Row justify="center">
        <Table
          columns={columns}
          dataSource={
            filteredData && filteredData.length ? filteredData : currentStateCovidCount.length !== 0
            ? currentStateCovidCount
            : totalStateWiseCount
          }
          rowKey="statecode"
          pagination={false}
          loading={loading}
          bordered
          onChange={handleChange}
        />
      </Row>
      <Row justify="center">
        <Space style={{ margin: "40px 0" }}>
          <Pagination
            onChange={(value) => setPage(value)}
            pageSize={postPerPage}
            total={totalStateArrayLength}
            current={page}
            showSizeChanger
            showQuickJumper
            onShowSizeChange={onShowSizeChange}
            itemRender={itemRender}
          />
        </Space>
      </Row>
    </section>
  )
}