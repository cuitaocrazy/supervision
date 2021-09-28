import {FC, MouseEventHandler} from 'react'
import styles from './Button.module.css'

type ButtonProps = {
  text: string
  onClick?: MouseEventHandler<Element>
  className?: string
}

const Button: FC<ButtonProps> = (props) => {
  return <button className={props.className || styles.btn} onClick={props.onClick}>{props.text}</button>
}

export default Button