import Event from '../images/event.jpg'

export default function Card({props}){    
   return(
       <div className='card-container'>
             {props.map((event) =>{
                const date = new Date(event.date);
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear(); 
                const newDate = day + "-" + month +"-"+ year;
        return ( 
            <div className="card-outer" key={event.id}>
                    <div className="card-img" >
                        <img src ={Event}></img>
                    </div>
                    <div className='box-container'>
                    <div className='box'>
                        <div className='box-content'>
                           <center>{event.capacity} coming</center>
                        </div>
                    </div>
                    </div>
            <div className='event-detail'>
                {/* <h1 key={index}>{event.title}</h1> */}
                <h5>{newDate}</h5>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
            </div> 
        </div>
)})}
        </div>
)}