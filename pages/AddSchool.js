import { async } from '@firebase/util';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import React, { useRef, useState } from 'react'
import { db } from '../Firebase';

const AddSchool = ({ toggleAddSchool, getSchools, data, user }) => {
    const [majors, setMajors] = useState([]); 
    const [minors, setMinors] = useState([]);
    const school = useRef(null); 
    

    const handleChangeMinor = (e) => {
        setMinors([...minors, e.target.value])
        console.log(minors)
    }

    const handleChangeMajor = (e) => {
        setMajors([...majors, e.target.value])
        console.log(majors)
    }

    const submit = async () => {
        console.log(majors)
        
        await addDoc(collection(db, `users/${user.uid}/schools`), {
            school: school.current.value, 
            majors: majors, 
            minors: minors, 
        })

        toggleAddSchool(false)

        getSchools();
    }
  return (
    <div>
        <h3>Add School</h3>
        <input ref={school} placeholder='School name...'/>

        <p>Majors:</p>
        {data.majors.map((x) => {
            return (
                <div>
                <input name='input' type={"checkbox"} value={x} onChange={handleChangeMajor}/>
                <label for={x}>{x}</label>
                </div>
            )
        })}

        <p>Minors: </p>
        {data.minors.map((x) => {
            return (
                <div>
                    <input name='input' id={x+"Mi"} type={"checkbox"} value={x} onChange={handleChangeMinor} />
                    <label for={x+"Mi"}>{x}</label>
                </div>
            )
        })}
        <button onClick={submit}>Add School</button><button onClick={() => toggleAddSchool(false)}>Cancel</button>
    </div>
  )
}

export default AddSchool