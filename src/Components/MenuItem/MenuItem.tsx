function MenuItem({item}){
    
    return(
         <div>   
                    <p>{item.name} <span> ₹{item.price}</span> <button>Add</button></p>
                    
                    </div>)
    
}

export default MenuItem;