import React, {useEffect, useRef, useState} from 'react';
import {Combobox} from "react-widgets/cjs";
import "react-widgets/styles.css";
import {HttpGet, HttpGet2, HttpInsert2, HttpUpdate2} from "../service/coreService";

function UserForm(props) {
    const id=props.id
    const onIdChange=props.onIdChange
    const dispatch=props.dispatch
    const [error, setError] = useState(false)
    const [nameValue, setName] = useState('')
    const [surnameValue, setSurname] = useState('')
    const refInput = useRef();
    const [ageValue, setAgeValue] = useState(20)
    const [ageList, setAgeList] = useState([])

    const validateForm = () => {
        return !(nameValue === '' || surnameValue === '' || ageValue < 10);
    }
    const Cancel = () => {
        setName('')
        setSurname('')
        setAgeValue(20)
        onIdChange(null)
    }
    const Save = () => {
        if (!validateForm()){
            setError(true)
            return
        } else {
            setError(false);
        }

        let data = {
            name:nameValue,
            surname:surnameValue,
            age: ageValue,
            products:userProduct.current,
            id:id,
        }

       // console.table(data)

        if(id != null){
            HttpUpdate2(`person/${id}`,data).then(result=>{
                dispatch({
                    type:"UPDATE_USER",
                    payload:data
                })
            }).catch(err=>{
                console.log("Update user error:"+err)
            })
        } else {
            HttpInsert2(`person`,data).then(response=>{
                if(response.status == 201){
                    dispatch({
                        type:"ADD_USER",
                        payload:response.data
                    })
                }
            }).catch(err=>{
                console.log("Insert user error:"+err)
            })
        }

        Cancel()
    }

    useEffect(() => {
        refInput.current.focus();
        setAgeList(Array.from({length: 63}, (_, i) => i + 18))
    }, [])

    const userProduct = useRef([])

    useEffect(()=>{
        refInput.current.focus()
        if(id!= null){
            let response = HttpGet2(`person/${id}`).then(resonse =>{
                const {name, surname, age} = resonse.data
                setName(name)
                setAgeValue(age)
                setSurname(surname)
                userProduct.current = resonse.data.products
            })
        }
    },[id])

    return (
        <div className="col-mid-8 mb-4">
            {/*<h4>Name:{nameValue}</h4>*/}
            <div className="card">
                <div className="card-header">
                    <h4>User Form</h4>
                    <div className="card-body">
                        {
                            error ?
                                <div className="alert alert-danger">
                                    Lutfen verilerinizi kontrol ediniz!
                                </div>
                                : null
                        }
                        <form>
                            <div className="form-group">
                                <div>
                                    <label htmlFor="name">Ad</label>
                                </div>
                                <input type="text"
                                       name="name"
                                       ref={refInput}
                                       placeholder="isim giriniz"
                                       id="name"
                                       className="form-control"
                                       required
                                       value={nameValue}
                                       onChange={e => setName(e.target.value)}
                                />

                            </div>
                            <div className="form-group">
                                <div>
                                    <label htmlFor="surname">Soyad</label>
                                </div>
                                <input type="text"
                                       name="surname"
                                       placeholder="isim giriniz"
                                       id="surname"
                                       className="form-control"
                                       required
                                       value={surnameValue}
                                       onChange={e => setSurname(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <div>
                                    <label htmlFor="age">Yas</label>
                                </div>
                                <Combobox placeholder="Yasinizi seciniz"
                                          name="age"
                                          id="age"
                                          defaultValue="20"
                                          data={ageList}
                                          value={ageValue}
                                          onChange={value=>setAgeValue(value)}
                                >

                                </Combobox>

                            </div>
                            <div className="form-group mt-3">
                                <button type="button"
                                        className="btn btn-success"
                                        onClick={Save}
                                >
                                    { id == null ? 'Kaydet' : 'Guncelle'}
                                </button>
                                <button type="button"
                                        className="btn btn-danger"
                                        onClick={Cancel}
                                >
                                    Iptal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserForm;