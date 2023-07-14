import moment from 'moment'


const calcularEdad = (fecha) => {
    const currentDate = new Date();
    const currentYear = Number(moment(currentDate).format('Y'))
    const currentMonth = Number(moment(currentDate).format('M'))
    const month = Number( moment(fecha).format('M') )
    const year = Number( moment(fecha).format('Y') )
   
    if (currentMonth < month ) {
        return (currentYear - year) - 1 
    }else if(currentMonth >= month ){
        return (currentYear - year)
    }


}



export default calcularEdad