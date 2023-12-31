'use client'
import './globals.css';
import { Dosis } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.css'
import styles from './layout.module.css'
import { Chart } from "react-google-charts"
import { useEffect, useState } from 'react';


const inter = Dosis({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [jsonData, setJsonData] = useState([])

  const getData = () => {
    fetch('./data.json',{
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    )
      .then(function(response){
        console.log(response)
        return response.json()
      })
      .then(function(myJson){
        console.log(myJson)
        setJsonData(myJson)
      })
  }

  useEffect(()=>{
    getData()
  },[])
  


  return (
    <html lang="pt-br">
      <body className={inter.className}>
      <div className={`container  ${styles.Container}`}>
        <div className={`row ${styles.Row}`}>
          <div className={`col-2 ${styles.minhaColuna1}`}>
            <img src='edp-logo.png' width='50%' style={{margin : '10px'}}/>
            <ul>
              <li> <a href='#'> Dashboard </a> </li>
              <li> <a href='#'> Usuários </a> </li>
              <li> <a href='#'> Mapas </a> </li>
              <li> <a href='#'> Logout </a> </li>
            </ul>
          </div>
          <div className={`col ${styles.minhaColuna2}`}>
            <h1>GESTÃO CME - TELEMEDIÇÃO</h1>
            <p>Visão das instalações etc</p>
            <div className="card" style={{width: "50%"}}>
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <Chart
                  chartType="ColumnChart"
                  data={jsonData}
                  width="100%"
                  height="200px"
                  legendToggle
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      </body>
    </html>
  );
}


