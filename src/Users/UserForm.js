import React, {useEffect, useRef, useState} from 'react';
import {Combobox} from "react-widgets/cjs";
import "react-widgets/styles.css";

function UserForm(props) {
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
            age: ageValue
        }

        console.table(data)
        Cancel()
    }

    useEffect(() => {
        refInput.current.focus();
        setAgeList(Array.from({length: 63}, (_, i) => i + 18))
    }, [])

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
                            <div className="form-group">
                                <button type="button"
                                        className="btn btn-success"
                                        onClick={Save}

                                >
                                    Kaydet
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