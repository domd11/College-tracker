import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { useEffect, useRef, useState } from 'react'
import { arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../Firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from 'next/router'
import AddSchool from './AddSchool'
import { async } from '@firebase/util'
const inter = Inter({ subsets: ['latin'] })
import { AiFillDelete } from "react-icons/ai"
import { TiDelete } from "react-icons/ti"
export default function Home() {
  const input = useRef(null); 
  const option = useRef(null);
  const router = useRouter();
  const [data, setData] = useState([]);
  const [user, loading] = useAuthState(auth);
  const [addSchool, toggleAddSchool] = useState(false);
  const [schools, setSchools] = useState([]);
  const addMajorOrMinor = async () => {
    if (option.current.value === "minor") {
      updateDoc(doc(db, "users", user.uid), {
        minors: arrayUnion(input.current.value), 
      })
      getData();
    }

    if (option.current.value === "major") {
      updateDoc(doc(db, "users", user.uid), {
        majors: arrayUnion(input.current.value),
      })

      getData();
    }
  }

  const getData = async () => {
    const docSnap = await getDoc(doc(db, "users", user.uid))
    if (docSnap.exists()) {
      setData(docSnap.data())
      console.log(data)
    } else {
      alert("unable to get data") 
    }
  }
  const x = async () => {
   if (user && !loading) {
    const docSnap = await getDoc(doc(db, "users", user.uid));
  
    if (docSnap.exists()) {
      console.log("exists")
    } else {
      setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        majors: [""],
        minors: [""],
      })
    }
   } else {
    alert('Not working')
   }
  } 


  const getSchools = async () => {
      const ref = collection(db, `users/${user.uid}/schools`); 
      await getDocs(ref).then((response) => {
          setSchools(response.docs.map((data) => {
            return {...data.data(), id: data.id}
          })); 
        });
  

  }

  const login = () => {
    const provider = new GoogleAuthProvider(); 

    signInWithPopup(auth, provider).then((user) => {
      
       location.reload(false);
    })
  }

  useEffect(() => {
    if (user) {
      x();
      getData();
      getSchools();
    }
  }, [!loading])

  const removeMajor = async (x) => {
    console.log(x)
    await updateDoc(doc(db, "users", user.uid), {
      majors: arrayRemove(x),
    })
    getData();
  }

  const removeMinor = async (x) => {
    console.log(`${x}`)
    await updateDoc(doc(db, "users", user.uid), {
      minors: arrayRemove(`${x}`),
    })
    getData();
    console.log(data.minors)
  }
  
  const removeSchool = async (x) => {
    await deleteDoc(doc(db, `users/${user.uid}/schools`, x))
    getSchools();
  }

  return (
    <>
      <Head>
        <title>College Tracker</title>
        <meta name="description" content="An app made to help students with college" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link  rel='icon' href=
        "https://img.icons8.com/external-soft-fill-juicy-fish/100/null/external-university-location-pins-soft-fill-soft-fill-juicy-fish.png"/>
      </Head>
      <main className={styles.main}>
          <h1>College Tracker</h1>
          <br />
          {user && !loading && data !== [] ? (
            <div>
            <button onClick={() => auth.signOut()}>Logout</button>
          <h2>Majors and Minors:</h2>
          <select ref={option}>
            <option value={"minor"}>Minor</option>
            <option value={"major"}>Major</option>
          </select>
          <input ref={input} placeholder='Enter major or minor...'/>
          <button onClick={addMajorOrMinor}>Add</button>
          <br />
          <h2>Your Majors and Minors: </h2>
          <h3>Majors: </h3>
          {data !== [] && !loading && data.majors ? (
            <div>

            {data.majors.map(z => {
              return <div key={Math.random()* 100}>
                <span>{z} </span>
                <AiFillDelete className='trash' onClick={() => removeMajor(z)} />
              </div>
            })}            </div>
          ) : "No Majors"}

          <br />
          <h3>Minors: </h3>
          {data !== [] && !loading && data.minors  ? (
            <div>
              {data.minors.map(x => {
                return <div key={Math.random()*100}>
                  <span>{x} </span>
                  <AiFillDelete className='trash' onClick={() => removeMinor(x)} />
                </div>
              })}
            </div>
          ) : "No Minors"}
          <br />
          <h2>Schools:</h2>
          {addSchool === false ?           <button onClick={() => toggleAddSchool(true)}>Add school</button>
: ""        }
          <br />
          {addSchool === true ? <AddSchool toggleAddSchool={toggleAddSchool} getSchools={getSchools} data={data} user={user} /> : ""}
          <br />
          {schools.map((x) => {
            return (
              <div className='school' key={Math.random()*100}>
                <h3>{x.school}</h3>
                {x.majors.length > 0 ? (
                  <div>
                  <h4>Majors: </h4>
                  {x.majors.map((x) => {
                    return <p>{x}</p>
                  })}
                  </div>
                ) : ""}
                {x.minors.length > 0 ? (
                  <div>
                    <h4>Minors: </h4>
                    {x.minors.map((x) => {
                      return <p>{x}</p> 
                    })}
                  </div>
                ) : ""}
                    <TiDelete className='delete-icon' onClick={() => removeSchool(x.id)} />
              </div>  
            )
          })}
          </div>
          ) : <button onClick={login}>Login</button>}
      </main>
    </>
  )
}
