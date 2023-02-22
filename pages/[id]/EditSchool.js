import { Dosis } from '@next/font/google';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../Firebase';
import Major from '../Components/Major';
import Minor from '../Components/Minor';

const EditSchool = () => {
  const [majors, setMajors] = useState([]);
  const [minors, setMinors] = useState([])
  const [info, setInfo] = useState([]); 
  const router = useRouter();
  const [user, loading] = useAuthState(auth)
  const { id } = router.query; 
  const [school, setSchool] = useState([])

  const getData = async () => {
      const docSnap = await getDoc(doc(db, "users", user.uid))
      if (docSnap.exists()) {
        setInfo(docSnap.data())
      } else {
        alert("unable to get data") 
      }

      const schoolSnap = await getDoc(doc(db, `users/${user.uid}/schools`, id))

      if (schoolSnap.exists()) {
        setMajors(schoolSnap.data().majors)
        setMinors(schoolSnap.data().minors)
        setSchool(schoolSnap.data())

        console.log(school.id)
      } else {
        alert("cannot get school")
      }
  }

  const removeMajor = (x) => {
    console.log(x)
    const major = document.getElementById(x);
    major.checked = false;
  }

  const addMajor = (e) => {
    console.log(e.target.value)
  } 

  useEffect(() => {
    if (user) {
      getData()
    }
  }, [!loading])
  return (
    <div>
        <h1>Edit School: {school.school}</h1>
        <input placeholder='Change Name...'/>
        {info.majors ? (
          <div>
          <h3>Majors: </h3>
            {info.majors.map((x) => {
              return <Major major={x} majors={majors} />
            })}
          </div>
        ) : ""}

        {info.majors ? (
          <div>

          <h3>Minors: </h3>
            {info.minors.map((x) => {
              return <Minor minor={x} minors={minors} user={user} id={id} />
            })}
          </div>
        ) : ""}
    </div>
  )
}

export default EditSchool