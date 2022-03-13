import Web3 from "web3"

export const getAllBlocks = async (web3 :any) =>{

    const latest = await web3.eth.getBlockNumber()
    const blockNumbers = [ ...Array(latest-1).keys() ] ;
    return await Promise.all(blockNumbers.map( (n:number ) => web3.eth.getBlock(n)));

}

export const getlatestBlock = async (web3 :any) =>{

    const latest = await web3.eth.getBlockNumber()
   
    return await  web3.eth.getBlock(latest);

}

export const createContract = async (web3 : any , Todo :any, netID :number)  => {
      return  await new web3.eth.Contract(
                     Todo.abi,
                     1337 );

}

export const showError = ( error : any) => {
    alert(JSON.stringify(error)) ;
}
