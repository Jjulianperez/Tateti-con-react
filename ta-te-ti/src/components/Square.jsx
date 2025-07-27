export const Square =({children, isSelected, updateBoard, index}) =>{
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const cuandoHagaclick = () =>{
    updateBoard(index)
  }
 
  return(
    <div onClick={cuandoHagaclick} className={className}>
      {children}
    </div>
  )
} 