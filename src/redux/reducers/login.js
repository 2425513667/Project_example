
import {REMEMBER,FORGET} from '../constant'
const initState = {data:{account_number:'',password:''}} //初始化状态
export default function countReducer(preState=initState,action){
	
	const {type,data} = action
	
	switch (type) {
		case REMEMBER: //如果是记住
			return {data}
		case FORGET: //忘记
			return {data}
		default:
			return preState
	}
}