// Abaixo uma função para gerar nota de remesas e serviço caso precise


    // async function generatedInvoice( seq_contrato:number ){
    //     try{
    //         const responseInvoice = await api.post('generate-invoice/' + seq_contrato)

    //         if( responseInvoice.status === 200) {
    //             getContracts()

    //             toast.success(`${ responseInvoice.data.message }`,{
    //                 autoClose: 2000
    //             })
    //         }
    //     }catch(error){
    //         if (axios.isAxiosError(error)) {
    //             const axiosError = error as AxiosError;
                
    //             const mensageError = axiosError.response?.data.message 

    //             toast.error(`${mensageError}`, {
    //                 autoClose: 2000
    //             });
    //         } else {
    //             // É outro tipo de erro
    //             console.error('Erro:', error.message);
    //         }
    //     }
    // }

    // async function generatedServiceInvoice(seq_contrato:number){
    //     try{
    //         const responseServiceInvoice = await api.post('generated-service-invoice/' + seq_contrato)

    //         if( responseServiceInvoice.status === 200){
    //             toast.success(`${responseServiceInvoice.data.message}`,{
    //                 autoClose: 2000
    //             })
    //         }
    //     }catch(error){
    //         if (axios.isAxiosError(error)) {
    //             const axiosError = error as AxiosError;
                
    //             const mensageError = axiosError.response?.data.message 

    //             toast.error(`${mensageError}`, {
    //                 autoClose: 2000
    //             });
    //         } else {
    //             // É outro tipo de erro
    //             console.error('Erro:', error.message);
    //         }
    //     }
    // }