import React from 'react'

function Avatar({children,backgroundColor,width,height,borderRadius,color,fontSize,cursor}) {

  const style={
    backgroundColor,
    width,
    height,
    color: color || 'black',
    borderRadius,
    fontSize,
    textAlign: 'center',
    cursor: cursor || null,
    textDecoration:'none'
  }

  return (
    <div style={style}>
      {children}
    </div>
  )
}

export default Avatar