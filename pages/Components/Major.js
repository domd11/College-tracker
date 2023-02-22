import React, { useEffect, useState } from 'react'

// major = current major
// majors = school majors
// info = user
//majors.includes(x)

const Major = ({ major, majors,  info }) => {
    const [checked, setChecked] = useState(true) 

    useEffect(() => {
        if(majors.includes(major) === false) {
            setChecked(false)
        } 


        console.log(checked)
       
    }, [])
  return (
    <div>
        <input type={"checkbox"} checked={checked} name={major} />
        <label for={major}>{major}</label>
    </div>

  )
}

export default Major