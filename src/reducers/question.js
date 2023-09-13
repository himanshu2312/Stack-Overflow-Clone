const questionReducer=(state={data:null},action)=>{
      switch(action.type){
            case 'ASK_QUESTION':
                  return {...state};
            case 'POST_ANSWER':
                  return {...state};
            case 'Q':
                  return {...state,data:action.payload};
            default:
                  return state;
      }
}

export default questionReducer;