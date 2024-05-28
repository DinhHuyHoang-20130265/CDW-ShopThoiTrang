import React, {Fragment, useEffect, useRef, useState} from "react";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import {useToasts} from "react-toast-notifications";
import axios from "axios";
// @ts-ignore
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Contact = () => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API;
    const mapContainer = useRef(null);
    const map: any = useRef(null);
    const [lng, setLng] = useState(106.79173930272047);
    const [lat, setLat] = useState(10.871361497916812);
    const [zoom, setZoom] = useState(18);
    const {addToast} = useToasts();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const {name, email, message} = formData;

    const onChange: any = (e: any) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const onSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                params: {
                    name: formData.name,
                    email: formData.email,
                    message: formData.message
                }
            };
            console.log(config);
            await axios.post(`${process.env.REACT_APP_API_ENDPOINT}contact`, {}, config).then(res => {
                addToast("Gửi liên hệ thành công", {appearance: 'success'});

                // Đặt lại form
                setFormData({
                    name: '',
                    email: '',
                    message: ''
                });
            }).catch(err => {
                console.error(err.response.data);
            });
        } catch (err: any) {
            console.error(err.response.data);
        }
    };
    useEffect(() => {
        if (map.current) {
            const marker = new mapboxgl.Marker()
                .setLngLat([lng, lat])
                .addTo(map);
            return;
        } // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom,
        })
        // Add marker
        new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .addTo(map.current);

        return () => map.current.remove(); // Clean up on unmount
    });

    return (
        <Fragment>
            <Breadcrumb/>
            <div className="contact-area pt-100 pb-100">
                <div className="container">
                    <div className="contact-map mb-10">
                        <div style={{width: "100%", height: "90%"}} ref={mapContainer} className="map-container"/>
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
                                    </div>
                                </div>
                                <div className="single-contact-info">
                                    <div className="contact-icon">
                                        <i className="fa fa-map-marker"/>
                                    </div>
                                    <div className="contact-info-dec">
                                        <p>Kp6, phường Linh Trung, TP Thủ Đức, TPHCM.</p>
                                    </div>
                                </div>
                                <div className="contact-social text-center">
                                    <h3>Theo dõi chúng tôi qua</h3>
                                    <ul>
                                        <li>
                                            <a href="//facebook.com">
                                                <i className="fa fa-facebook"/>
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
                                <form className="contact-form-style" onSubmit={e => onSubmit(e)}>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <input type="text"
                                                   placeholder="Họ tên*"
                                                   name="name"
                                                   value={name}
                                                   onChange={e => onChange(e)}
                                                   required/>
                                        </div>
                                        <div className="col-lg-12">
                                            <input type="email"
                                                   placeholder="Email*"
                                                   name="email"
                                                   value={email}
                                                   onChange={e => onChange(e)}
                                                   required/>
                                        </div>
                                        <div className="col-lg-12">
                                            <textarea
                                                placeholder="Nội dung*"
                                                name="message"
                                                value={message}
                                                onChange={e => onChange(e)}
                                                required
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
