import Web3 from "web3"

export const getAllBlocks = async (web3 :any) =>{

    const latest = await web3.eth.getBlockNumber()
    const blockNumbers = [ ...Array(latest-1).keys() ] ;
    return await Promise.all(blockNumbers.map( (n:number ) => web3.eth.getBlock(n)));

}