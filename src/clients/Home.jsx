import {useState} from 'react'
import ClientNavbar from '../components/ClientNavbar'
import img from '../assets/images/img.jpg' 
import  './scss/hero.scss'
import Cards from '../components/Cards'
import { useClientContext } from '../assets/js/ClientContext'
import { useStateContext } from '../assets/js/Context'
import ClientSearch from '../components/ClientSearch'
import LoadingIndicator from '../components/LoadingIndicator'

function Home() {
  const {name, allHouses, serchResult,dataLength, toggleFilter, filter} = useClientContext()
  const {bottomPaginater, pageData} = useStateContext()

  const [showSearchBar,setShowSearchBar] = useState(false)
  const [page, setPage] = useState(1)

  const itemPerPage =20
  
  const pages = bottomPaginater(serchResult.length, itemPerPage)
  const __allHouses = pageData(serchResult, page, itemPerPage)

  const toggleSerach = ()=>{
    setShowSearchBar(!showSearchBar)
  }

  
  return (
    <div>
      {!serchResult && <LoadingIndicator/>}
      <ClientSearch showSearchBar={showSearchBar}/>
      <ClientNavbar toggleSerach={toggleSerach}/>
      <div className="">
        <div className='hero_container'>
          <div className='inner_container sm:block'>
            <div>
              <h1  className='font-bold hero_heading uppercase text-3xl max-w-2xl flex-wrap break-words'>
                explore and find lodges in your area {name}</h1>        
              <p className='text-white mt-8 text-lg'>Lfficia laboriosam excepturi i pariatur, quisquam eum beatae reprehenderit Voluptates?</p>
              <button className='w-40 mt-6 capitalize'>get started</button>
            </div>
            <div className='image_container'>
            <img className='img' src={img} alt=""/>

            </div>

          </div>
        </div>
      
      </div>
      <h2 className='ml-5 mr-5 ml-30 sm:p-10 lg:ml-20 mt-20 font-bold text-gray-600'>Latest</h2>
    <Cards allHouses={allHouses.slice(0,3)}/>
    <h1 className='ml-5 mr-5 lg:ml-20 mt-20 font-bold text-orange-600'>{allHouses.length<9?'0'+dataLength.toString():allHouses.length} Availables Results</h1>
    <div className='flex justify-start  ml-5 mr-5 lg:ml-20 mt-20 font-bold' style={{width:300}}>
      {['all', 'lodge', 'rental'].map(item=>(
        <button key={item} onClick={ ()=>toggleFilter(item) } className={`bg-gray-300 ${item===filter?'bg-orange-600 font-bold':''} capitalize h-8 text-sm`}>{item}</button>

      ))}
    </div>
    <Cards allHouses={__allHouses}/>
    <div className="table_pagination ml-5 mr-5 lg:ml-20">
        <div className="page_container flex">
          {pages.map((pages) => (
            <div
              onClick={() => setPage(pages)}
              className={`${
                pages === page
                  ? "bg-gray-800 text-white font-bold"
                  : "bg-gray-400"
              } `}
              key={pages}
            >
              {pages}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home