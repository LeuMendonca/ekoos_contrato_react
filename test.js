const listObj = [{ amount: 10,descProduct: "REBOBINAMENTO MOTOR TRI 0,33 CV 2 P",id: 1,product: 10000,seq_contrato_detalhe : 187 , unit: "Meses" ,unitPrice : 10 },]

// const total = listObj.reduce( ( ant , atu ) => {
//     console.log(ant.amount * ant.unitPrice)
//     console.log(atu.amount * atu.unitPrice)
// })



const totalPriceContract = listObj.reduce((acc, item) => { 
    return acc +(item.unitPrice * item.amount)
}, 0)
console.log(totalPriceContract)