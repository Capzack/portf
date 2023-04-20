import './index.css'
import {Link, useLocation} from 'react-router-dom'
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

const menuOpenDuration = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--menu-open-duration'))

export default function({links}){
    const location = useLocation()
    const menu = useSelector(state => state.menu)

    const [isTextHide, setIsTextHide] = useState()

    useEffect(()=>{
        if(menu.isShow){
            setTimeout(()=>{
                setIsTextHide(false)
            },  menuOpenDuration*0.8)
        }
        else
            setIsTextHide(true)
    }, [menu])

    return(
        <div className={`main-menu main-menu__${menu.isShow ? 'show' : 'hide'}`}>
            {links && links.map(department=>
                <div key={department.name}>
                    <div className={`main-menu__header main-menu__header__${menu.isShow ? 'show' : 'hide'}`}>{department.header}</div>
                    {department.sections.map(link=>
                        <div className='main-menu-section'>
                            <Link {...{
                                to: link.href,
                                className: `main-menu__item ${location.pathname.substring(1) === link.href ? 'main-menu__item__active' : ''}`
                            }}>
                                <img src={link.icon}/>
                                {menu.isShow && !isTextHide && <div>{link.text}</div>}
                            </Link>
                            {!!link?.subsections.length &&
                                <div className={`subsection-container subsection-container__${isSubsectionActive(link) && !isTextHide ? 'show' : 'hide'}`}>
                                    {link.subsections.map(subsection =>
                                        <Link {...{
                                            to:link.href + '/' + subsection.href,
                                            className: `subsection-container__subsection-item ${link.href+ '/' + subsection.href === location.pathname.substring(1)? 'main-menu__item__active' : ''}`
                                        }}>
                                            {subsection.text}
                                        </Link>
                                    )}
                                </div>
                            }
                        </div>
                    )}
                    <hr/>
                </div>
            )}
        </div>
    )
}

function isSubsectionActive(link){
    return(
        (location.pathname.substring(1) === link.href) ||
        (link.subsections.map(subsection => link.href+ '/' + subsection.href).includes(location.pathname.substring(1)))
    )
}