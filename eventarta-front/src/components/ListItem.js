import Bookmark from '../images/bookmark.png'


export default function ListItem({ props, setActiveCard }) {
  return (
    <div className="list-container">
      {props.map((event) => {
        const date = new Date(event.date);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const newDate = day + "-" + month + "-" + year;
        return (
          <a onClick={() => setActiveCard(event)}>
            <div className="list-item">
              <div className="item-inlist">
                <img className="imges-inlist" src={event.images[0]}></img>
                <div>
                  <h2>{event.title}</h2>
                  <h3>{newDate}</h3>
                </div>
                <div>
                  <h3>
                    {event.country + " - " + event.city + " - " + event.street}
                  </h3>
                  <h4>{event.description}</h4>
                </div>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
}
