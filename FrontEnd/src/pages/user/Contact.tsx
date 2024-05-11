import React, {Fragment} from "react";
import LocationMap from "../../components/map/LocationMap";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const Contact = () => {

    return (
        <Fragment>
            <Breadcrumb/>
            <div className="contact-area pt-100 pb-100">
                <div className="container">
                    <div className="contact-map mb-10">
                        <LocationMap latitude="10.867464707529257" longitude="106.78793636514895"/>
                    </div>
                    <div className="custom-row-2">
                        <div className="col-lg-4 col-md-5">
                            <div className="contact-info-wrap">
                                <div className="single-contact-info">
                                    <div className="contact-icon">
                                        <i className="fa fa-phone"/>
                                    </div>
                                    <div className="contact-info-dec">
                                        <p>+012 345 678 102</p>
                                        <p>+012 345 678 102</p>
                                    </div>
                                </div>
                                <div className="single-contact-info">
                                    <div className="contact-icon">
                                        <i className="fa fa-globe"/>
                                    </div>
                                    <div className="contact-info-dec">
                                        <p>
                                            <a href="mailto:urname@email.com">ptshop@email.com</a>
                                        </p>
                                        {/*<p>*/}
                                        {/*    <a href="//urwebsitenaem.com">urwebsitenaem.com</a>*/}
                                        {/*</p>*/}
                                    </div>
                                </div>
                                <div className="single-contact-info">
                                    <div className="contact-icon">
                                        <i className="fa fa-map-marker"/>
                                    </div>
                                    <div className="contact-info-dec">
                                        <p>Address goes here, </p>
                                        <p>street, Crossroad 123.</p>
                                    </div>
                                </div>
                                <div className="contact-social text-center">
                                    <h3>Follow Us</h3>
                                    <ul>
                                        <li>
                                            <a href="//facebook.com">
                                                <i className="fa fa-facebook"/>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="//pinterest.com">
                                                <i className="fa fa-pinterest-p"/>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="//thumblr.com">
                                                <i className="fa fa-tumblr"/>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="//vimeo.com">
                                                <i className="fa fa-vimeo"/>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="//twitter.com">
                                                <i className="fa fa-twitter"/>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-7">
                            <div className="contact-form">
                                <div className="contact-title mb-30">
                                    <h2>Liên lạc</h2>
                                </div>
                                <form className="contact-form-style">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <input name="name" placeholder="Họ tên*" type="text"/>
                                        </div>
                                        <div className="col-lg-6">
                                            <input name="email" placeholder="Email*" type="email"/>
                                        </div>
                                        <div className="col-lg-12">
                                            <input
                                                name="subject"
                                                placeholder="Chủ đề*"
                                                type="text"
                                            />
                                        </div>
                                        <div className="col-lg-12">
                        <textarea
                            name="message"
                            placeholder="Nội dung*"
                            defaultValue={""}
                        />
                                            <button className="submit" type="submit">
                                                Gửi
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <p className="form-messege"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};


export default Contact;
