import React from "react";
import { Card, Col, Row } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import CountUp from "react-countup";

// Card Imagens

import confirmed from "../../images/confirmed.png";
import active from "../../images/active.png";
import recovered from "../../images/recovered.png";
import death from "../../images/death.png";

import './CardItem.css';

// Totalidade dos casos

/* Componente que relata a totalidade de todos os casos */

export const CardItem = ( { totalIndiaCase } ) => {
  return(
    <section>
      {totalIndiaCase.map((item, index) => (
        <div key={index} className="row">
          <Row gutter={14} justify="center">
            <Col span={5} xs={6}>
              <Card
                bordered={false}
                className="card-confirmed"
                align="center"
              >
                <h2>Confirmados</h2>
                  <img 
                    src={confirmed}
                    alt="confirmed" 
                  />
                  <br/>
                <div className="wrapper-confirmed">
                  <ArrowUpOutlined style={{ color:'#ff4000' }} />
                  <CountUp
                    className="count"
                    start={0}
                    end={item.deltaconfirmed}
                    duration={2.75}
                    separator=","
                  />
                </div>
                <h1 className="text-warning">{item.confirmed}</h1>
              </Card>
            </Col>
            <Col span={5}>
              <Card
                bordered={false}
                className="card-active"
                align="center"
              >
                <h2>Ativos</h2>
                  <img 
                    src={active}
                    alt="active" 
                  />
                <h1 className="text-info">{item.active}</h1>
              </Card>
            </Col>
            <Col span={5} xs={6}>
              <Card
                bordered={false}
                className="card-recovered"
                align="center"
              >
                <h2>Recuperados</h2>
                  <img 
                    src={recovered}
                    alt="recovered" 
                  />
                <br/>
                <div className="wrapper-recovered">
                  <ArrowUpOutlined style={{ color:'#52b85f'}} />
                    <CountUp
                      className="count"
                      start={0}
                      end={item.deltarecovered}
                      duration={2.75}
                      separator=","
                    />
                </div>
                <h1 className="text-sucess">{item.recovered}</h1>
              </Card>
            </Col>
            <Col span={5}>
              <Card
                bordered={false}
                className="card-death"
                align="center"
              >
                <h2>Mortes</h2>
                  <img 
                    src={death}
                    alt="death" 
                    className="img-death"
                  />
                <br/>
                <div className="wrapper-death">
                  <ArrowUpOutlined style={{ color:"#2c2c2c" }} />
                    <CountUp
                      className="count"
                      start={0}
                      end={item.deltadeaths}
                      duration={2.75}
                      separator=","
                    />
                </div>
                <h1 className="text-dark">{item.deaths}</h1>
              </Card>
            </Col>
          </Row>
        </div>
      ))}
    </section>
  )
}