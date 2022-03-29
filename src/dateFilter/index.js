// Data

export const myDate = () => {
  let now = new Date();
  return `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
}

// Correção do mês da data atual

export const formateDate = ( date ) => {
  let nowDate = date.split("/");
  let [ dia, mes, ano ] = nowDate;
  return `${dia}/${formateMonth(mes)}/${ano}`;
}

const formateMonth = ( mes ) => parseInt(mes) < 10 ? `0${mes}`:`${mes}`