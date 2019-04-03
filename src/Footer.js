import React from 'react'
import './App.css'
import { Link } from 'react-router-dom';


class Footer extends React.Component {


  state = {
  }


  render() {
    return (
        <Link to="/create">
         <div className="open-search">
              <button>
              </button>
            </div>
        </Link>
           
    )
  }
}

export default Footer
