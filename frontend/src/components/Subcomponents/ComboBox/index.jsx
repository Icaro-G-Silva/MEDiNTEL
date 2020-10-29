import React from 'react'

export default (props) => {
    return (
        <React.Fragment>
            <div className="input">
                <label htmlFor={props.name}>{props.title}</label> <br/>
                <select className={props.classInjection || ""} name={props.name} id={props.name} value={props.value || ""} onChange={(e)=>{props.setValue(e.target.value)}}>
                    <option value="">- {props.selectText} -</option>
                    {props.list.map(element => (
                        <option key={element} value={element}>{element}</option>
                    ))}
                </select>
            </div>
        </React.Fragment>
    )
}