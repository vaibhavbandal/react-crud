import React, { useState } from 'react';
import DummyData from './DummuData';



let CrudReact=()=>{

    let [Data,setData]=useState(DummyData);
    let [temp,setTemp]=useState(
    {
            first_name:"",
            last_name:"",
            email:"",
            mobile:"",
            id:""
    }
    );

    // let [updateSubmit,setUpdateSubmit]=useState(false);


    let handleInput=(event)=>{

        setTemp((pre)=>{
             return {...pre,[event.target.name]:event.target.value } 
         }) 

    }
    
    // form validation
    let validation=()=>{

        if(temp.first_name===""||temp.last_name===""||temp.email===""||temp.mobile===""){
            return false;
        }
        if(temp.first_name.startsWith(" ")||temp.last_name.startsWith(" ")||temp.email.startsWith(" ")){
            return false;
        }
        if(isNaN(temp.mobile)||temp.mobile.length!==10){
            return false;
        }

        return true;
    }


    let submitForm=()=>{

        if(!validation()){
                alert("Enter Proper Fields"); return; 
        }else{

            
            
            setData((pre)=>{
                return [...Data,temp];
            })
            
            setTemp((pre)=>{
                return {
                    first_name:"",
                    last_name:"",
                    email:"",
                    mobile:""
                }
            }); 
      
     

            
        }  
    }

    let TableList=(props)=>{

        // Update 
        let updateList=(id)=>{
            
            let temp2=Data.filter((value,index)=>{
                return index===id;  //  if cond true then append a specified users in temp variable
            })


            
            setTemp((pre)=>{
                return {
                    first_name:temp2[0].first_name,
                    last_name:temp2[0].last_name,
                    email:temp2[0].email,
                    mobile:temp2[0].mobile,
                }
            });  
            
            deleteList(id); 
                  

    

        } 
        
        // Delete users
        let deleteList=(id)=>{
         let  temp=Data.filter((value,index)=>{
                return index!==id;
         })

            setData(()=>{
                return [...temp]; 
            })

        }


        let RowList=({id,first_name,last_name,email,mobile})=>{
            return <tr>
                       <td>{id+1}</td>
                       <td>{first_name}</td>
                       <td>{last_name}</td>
                       <td>{email}</td>
                       <td>{mobile}</td>
                       <td><button onClick={()=>{updateList(id)}}>Update</button></td>
                       <td><button onClick={()=>{deleteList(id)}}>Delete</button></td>
                   </tr>
        }


        return(<>
                <div>
                    <table border="1" cellPadding="5" cellSpacing="4">
                        <thead>
                                <th>No</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Update</th>
                                <th>Delete</th>
                        </thead>
                        <tbody>
                                {Data.map((value,index)=>{
                                      return  <RowList id={index} key={index} first_name={value.first_name} last_name={value.last_name} email={value.email} mobile={value.mobile}/>
                                })}
                        </tbody>
                    </table>
                </div>
        </>)
    }




    return(
        <>      
                  <div>
                    <input type="text" value={temp.first_name} name="first_name" onChange={handleInput}  placeholder="First Name"/>
                    <input type="text" value={temp.last_name} name="last_name" onChange={handleInput}  placeholder="Last Name"/>
                    <input type="text" value={temp.email} name="email" onChange={handleInput}  placeholder="Email"/>
                    <input type="text" value={temp.mobile} name="mobile" onChange={handleInput}  placeholder="Mobile"/>
                    <input type="button" onClick={submitForm} value="Submit" />
                    {/* <input type="button" onClick={updateForm} value="Update" />  */}
                </div>
                <TableList />

        </>
    )

}

export default CrudReact;