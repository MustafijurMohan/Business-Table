import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ProductListRequest } from '../API/APIRequest'
import ReactPaginate from 'react-paginate'


const ProductList = () => {

    let AllProduct = useSelector((state) => state.products.AllProduct)
    let Total = useSelector((state) => state.products.Total)

    let [searchKey, setSearchKey] = useState('0')
    let [perPageKey, setPerPageKey] = useState(5)


    useEffect(() => {
        ProductListRequest(1, perPageKey, searchKey)
    }, [])
    


    const handlePageClick = (event) => {
        const pageNo = event.selected
        ProductListRequest(pageNo + 1, perPageKey, searchKey)
    }

    const PageKeyOnChange = (e) => {
        setPerPageKey(parseInt(e.target.value))
        ProductListRequest(1, e.target.value, searchKey)
    }

    const searchOnChange = (e) => {
        setSearchKey(e.target.value)
        if ((e.target.value).length === 0) {
            setSearchKey('0')
            ProductListRequest(1, perPageKey, '0')
        }
    }

    const searchData = () => {
        ProductListRequest( 1, perPageKey, searchKey)
    }



  return (
    <div>
        <div className="container my-5">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-6 animated fadeInUp">
                                        <h5>My Product List</h5>
                                    </div>
                                    <div className="col-2">
                                        <select onChange={PageKeyOnChange} className='form-control mx-2 form-select-sm form-select form-control-sm animated fadeInUp'>
                                            <option value="5">5 Per Page</option>
                                            <option value="10">10 Per Page</option>
                                            <option value="20">20 Per Page</option>
                                            <option value="30">30 Per Page</option>
                                            <option value="50">50 Per Page</option>
                                            <option value="100">100 Per Page</option>
                                            <option value="200">200 Per Page</option>
                                        </select>
                                    </div>
                                    <div className="col-4">
                                        <div className="input-group animated fadeInUp">
                                            <input onChange={searchOnChange} type="text" className='form-control form-control-sm' placeholder='Search..' />
                                            <button onClick={searchData} className='btn btn-outline-primary btn-sm mb-0' >Search</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="table-responsive data-table">
                                            <table className="table">
                                                <thead className='sticky-top bg-white animated fadeInUp' >
                                                    <tr>
                                                        <th className='text-uppercase text-secondary text-xxs font-weight-bolder opcity-7' >Product</th>
                                                        <th className='text-uppercase text-secondary text-xxs font-weight-bolder opcity-7 ps-2' >Price</th>
                                                        <th className='text-center text-uppercase text-secondary text-xxs font-weight-bolder opcity-7' >Stock</th>
                                                        <th className='text-center text-uppercase text-secondary text-xxs font-weight-bolder opcity-7' >Code</th>
                                                    </tr>
                                                </thead>

                                                <tbody >
                                                    {
                                                        AllProduct.map((item, i) => 
                                                            <tr key={i.toString()}>
                                                                <td>
                                                                    <div className="d-flex px-2 py-1">
                                                                        <div>
                                                                            <img src={item.image} width='80px' height='50px' className='avatar me-3 animated fadeInUp' alt='' />
                                                                        </div>
                                                                        <div className="d-flex flex-colum justify-content-center animated fadeInUp">
                                                                            <h6 className='mb-0 text-xxs ' >{item.title}</h6>
                                                                            <p className='mb-0 text-xxs text-secondary' >{item.category}</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <p className='text-xs font-weight-bold mb-0 animated fadeInUp' >{item.brand}</p>
                                                                    <p className='text-xs mb-0 text-secondary animated fadeInUp' >{item.price} Taka</p>
                                                                </td>
                                                                <td>
                                                                    <p className='badge bg-gradient-success animated fadeInUp' >{item.stock}</p>
                                                                </td>
                                                                <td>
                                                                    <span className='text-secondary text-xs font-weight-bold animated fadeInUp' >{item.product_code}</span>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>

                                            </table>
                                        </div>
                                    </div>
                                    <div className="col-12 mt-5">
                                        <nav aria-label='Page navigation example' >
                                                <ReactPaginate
                                                    previousLabel= '<'
                                                    nextLabel='>'
                                                    pageClassName='page-item'
                                                    pageLinkClassName='page-link'
                                                    previousClassName='page-item'
                                                    previousLinkClassName='page-link'
                                                    nextClassName='page-item'
                                                    nextLinkClassName='page-link'
                                                    breakLabel='...'
                                                    breakClassName='page-item'
                                                    breakLinkClassName='page-link'
                                                    pageCount={Total/perPageKey}
                                                    marginPagesDisplayed={2}
                                                    pageRangeDisplayed={5}
                                                    onPageChange= {handlePageClick}
                                                    containerClassName='pagination'
                                                    activeClassName='active'
                                                />
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductList