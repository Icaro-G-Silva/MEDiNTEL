import React, {useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'

import {Context} from '../../../utils/Context'

import './style.css'

export default props => {

    const context = useContext(Context)
    const history = useHistory()

    const logoff = () => {
        context.handleLogoff()
        history.push('/login')
    }

    return(
        <div className="headerContainer">
            {(props.comeBack) ? <div className="logoff" onClick={()=>{history.goBack()}} title="Go Back"><img className="headerLogoutIcon" src="./Assets/logout.svg" alt="Go Back Icon"/></div>
            : <div className="logoff" onClick={logoff} title="Logout"><img className="headerLogoutIcon" src="./Assets/logout.svg" alt="Logout Icon"/></div>}
            <div className="headerContent">
                <h1>Olá, <span><Link to="/update/user">{props.name}</Link></span></h1>
                <p>{props.description}</p>
            </div>
            <Link to={props.redirect} className="withoutStyleLink">
                <div className="headerInteractions">
                    {props.linkName}
                </div>
            </Link>
        </div>
    )
}
