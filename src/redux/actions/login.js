
import {REMEMBER,FORGET} from '../constant'

export const Remember = data => ({type:REMEMBER,data})
export const Forget = data => ({type:FORGET,data})

export const incrementAsync = (data,time) => {
	return (dispatch)=>{
		setTimeout(()=>{
			dispatch(Remember(data))
		},time)
	}
}