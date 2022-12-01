import { promises } from "fs"

export const run01 = async () => {
  const file = await promises.readFile( './src/inputs/01.txt', 'utf-8' )
  
  const crew = new ElfCrew( inputToOmnomnoms( file ) )
  console.log( crew.biggestomnomnom )
}

type Omnomnoms = Omnomnom[]
type Omnomnom = number[]

class Elf{
  omnomnoms:Omnomnom = [] 
  constructor( ...omnomnoms:number[] ){
    this.omnomnoms = omnomnoms
  }

  get totalomnomnom():number{
    return this.omnomnoms.reduce( (t,omnom) => t+omnom , 0)
  }
}

class ElfCrew{
  elves:Elf[] = []
  constructor( input:Omnomnoms){
    this.elves = input.map( omnomnoms => new Elf( ...omnomnoms ))
  }

  get biggestomnomnom():number{
    const sortedElves = this.elves.map( elf => elf.totalomnomnom ).sort(
      (a,b) => a - b
    ).reverse()


    return sortedElves[0]
  }
}


 const inputToOmnomnoms = ( input:string ) => 
  input.split(/\r?\n/).reduce( (group:Omnomnoms,str) => {

  if( str.length == 0 ){
    return [...group,[]]
  }
  const last = group.pop()
  if( !last ) return [...group]
  return [...group,[...last,parseInt( str )]]
}, [[]] )