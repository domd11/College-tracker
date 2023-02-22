import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../Firebase'

// major = current major
// majors = school majors
// info = user
//majors.includes(x)

const Minor = ({ minor, minors,  id, school }) => {
    const [checked, setChecked] = useState(true) 

    useEffect(() => {
        if(minors.includes(minor) === false) {
            setChecked(false)
        }  


        console.log(id)
    }, [])

    const change = async () => {
        setChecked(!checked)

        if (checked) {
           await updateDoc(doc(db, `users/${user.uid}/schools/${id}`), {
            minors: arrayUnion(minor), 
           })
        } 

        if (!checked) {
            await updateDoc(doc(db, `users/${user.uid}/schools/${school.id}`), {
                minors: arrayRemove(minor), 
               })
        }
        
    }
  return (
    <div>
        <input type={"checkbox"} checked={checked} name={minor}  />
        <label for={minor}>{minor}</label>
    </div>

  )
}

export default Minor