import React from 'react'
import './pagination.scss'

const Pagination = ( {currentPage, setCurrentPage, itemsPerPage, itemsTotal}) => {


    let numberOfPage = Math.ceil ( itemsTotal / itemsPerPage ) 

  return (
    <div className='pagination'>
        <button 
        disabled={ currentPage <= 0 } 
        className='btn btn-success' 
        onClick={ () => setCurrentPage(currentPage - 1)}>&lt;&lt; Prev</button>

        {/* Pageination page-buttons */}
        {
            [...Array(numberOfPage)].map( (x, i)=> 
            
            <button id="pagesBtn" onClick= { () => setCurrentPage( i ) } className={i === currentPage ? "activated" : null}>
                {i + 1}
                </button>

            )

        }

        <button 
        disabled={ currentPage >= numberOfPage -1} 
        className='btn btn-success' 
        onClick={ () => setCurrentPage(currentPage + 1)}>&gt;&gt; Next
        </button>

    </div>
  )
}

export default Pagination