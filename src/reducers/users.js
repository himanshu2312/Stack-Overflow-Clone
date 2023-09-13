const usersReducer=(states=[],action)=>{
      switch (action.type) {
            case 'FETCH_USERS':
                  return action.payload;
            case 'UPDATE_USER':
                  return states.map((s)=> s._id===action.payload._id ? action.payload:s)
            default:
                  return states;
      }
}

export default usersReducer;