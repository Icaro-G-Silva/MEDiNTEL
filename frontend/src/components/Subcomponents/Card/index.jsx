import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

import './style.css'

export default props => {

    const [reqNumber, setReqNumber] = useState('')

    useEffect(()=>{
        if(props.reqNumber !== undefined) setReqNumber(props.reqNumber)
    }, [])

    const deleteRegister = () => {
        props.deleteTrigger(reqNumber)
    }

    return(
        <div className="card">
            <div className="header">
                <h1 className="title">{props.title}</h1>
                <Link className="link" to="#" onClick={deleteRegister}>
                    <div className="deleteButton"><img className="trashCan" src="./Assets/trashcan.png" alt="TrashCan"/></div>
                </Link>
            </div>
            <div className="content">
                {props.children}
            </div>
        </div>
    )
}
