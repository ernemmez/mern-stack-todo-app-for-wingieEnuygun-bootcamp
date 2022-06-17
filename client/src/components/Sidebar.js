import React, { memo } from 'react'



 function Sidebar({state,updateCompleted,updateOnlyMe}) {
    
   
    

  return (
    <>
      <h3>Filtreler</h3>
        <button className={`item btn ${state.completed === 'completed' ? 'checked': ''}`} onClick={() => updateCompleted(state.completed === 'completed' ? false : 'completed')}>
            Sadece Tamamlanmışlar
        </button>
        <button className={`item btn ${state.completed === 'uncompleted' ? 'checked': ''}`} onClick={() => updateCompleted(state.completed === 'uncompleted' ? false : 'uncompleted')}>
            Sadece Tamamlanmamışlar
        </button>
        <button className={`item btn ${state.onlyMe === true ? 'checked' : ''}`} onClick={updateOnlyMe}>
            Sadece Benim
        </button>


    </>
  )
}
export default memo(Sidebar);