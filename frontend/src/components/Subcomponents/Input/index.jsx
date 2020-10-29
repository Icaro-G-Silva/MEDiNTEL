import React from 'react'

export default (props) => {
    return (
        <React.Fragment>
            <div className="input">
                <label htmlFor={props.name}>{props.title}</label> <br/>
                <input className={props.classInjection || ""} type={props.type || "text"} name={props.name} id={props.name} value={props.value || ""} required onChange={(e)=>{props.setValue(e.target.value)}}/>
            </div>
        </React.Fragment>
    )
}