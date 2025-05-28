import React from 'react'
import Layout from '../../Layouts/AdminLayout'
import { Link } from 'react-router-dom'

const Index = () => {
    console.log("index of admin loaded")
    return (
        <>
            <Layout>
                <div className="favourite-tools-area rts-section-gapBottom">
                    <div className="container">
                        <div className="row mt--10 g-5">
                            <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                <div className="single-case-area-wrapper">
                                    <div className="icon">
                                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="50" height="50" rx="4" fill="#E6E5FF" />
                                            <path d="M35 15C33 13 30 12 27 12C20.925 12 16 16.925 16 23C16 29.075 20.925 34 27 34C30 34 33 33 35 31L32 27C30.8 28 29 28.5 27 28.5C23.5 28.5 21 26 21 23C21 20 23.5 17.5 27 17.5C29 17.5 30.8 18 32 19L35 15Z" fill="#3F3EED" />
                                        </svg>


                                    </div>
                                    <a href="#">
                                        <h5 className="title">Customers</h5>
                                    </a>
                                    <p className="disc">
                                        <strong>Total Customers : </strong> 20
                                    </p>
                                    <Link to="/admin/customers">More Details <i className="fa-solid fa-arrow-right"></i></Link>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                <div className="single-case-area-wrapper">
                                    <div className="icon">

                                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="50" height="50" rx="4" fill="#FDEDE1"></rect>
                                            <path d="M13.8125 11.625H22.543C23.5391 11.625 24.4766 12.0352 25.1797 12.7383L35.4922 23.0508C36.957 24.5156 36.957 26.918 35.4922 28.3828L27.6992 36.1758C26.2344 37.6406 23.832 37.6406 22.3672 36.1758L12.0547 25.8633C11.3516 25.1602 11 24.2227 11 23.2266V14.4375C11 12.9141 12.2305 11.625 13.8125 11.625ZM17.5625 20.0625C18.5586 20.0625 19.4375 19.2422 19.4375 18.1875C19.4375 17.1914 18.5586 16.3125 17.5625 16.3125C16.5078 16.3125 15.6875 17.1914 15.6875 18.1875C15.6875 19.2422 16.5078 20.0625 17.5625 20.0625Z" fill="#EBA43B"></path>
                                        </svg>

                                    </div>
                                    <a href="#">
                                        <h5 className="title">Coupons Used</h5>
                                    </a>
                                    <p className="disc">
                                        <strong>Total Coupons Used : </strong> 20
                                    </p>
                                    <Link to="/admin/all-coupons">More Details<i className="fa-solid fa-arrow-right"></i></Link>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                <div className="single-case-area-wrapper">
                                    <div className="icon">

                                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="50" height="50" rx="4" fill="#FFE6FE"></rect>
                                            <path d="M10 15.375C10 13.3242 11.6406 11.625 13.75 11.625H36.25C38.3008 11.625 40 13.3242 40 15.375V34.125C40 36.2344 38.3008 37.875 36.25 37.875H13.75C11.6406 37.875 10 36.2344 10 34.125V15.375ZM15.625 19.125C16.6211 19.125 17.5 18.3047 17.5 17.25C17.5 16.2539 16.6211 15.375 15.625 15.375C14.5703 15.375 13.75 16.2539 13.75 17.25C13.75 18.3047 14.5703 19.125 15.625 19.125ZM36.25 17.25C36.25 16.4883 35.6055 15.8438 34.8438 15.8438H20.7812C19.9609 15.8438 19.375 16.4883 19.375 17.25C19.375 18.0703 19.9609 18.6562 20.7812 18.6562H34.8438C35.6055 18.6562 36.25 18.0703 36.25 17.25Z" fill="#E331D2"></path>
                                        </svg>

                                    </div>
                                    <a href="#">
                                        <h5 className="title">Revenue</h5>
                                    </a>
                                    <p className="disc">
                                        <strong>Total Revenue : </strong> $2000
                                    </p>
                                    <Link to="/admin/all-plans">More Details <i className="fa-solid fa-arrow-right"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Index