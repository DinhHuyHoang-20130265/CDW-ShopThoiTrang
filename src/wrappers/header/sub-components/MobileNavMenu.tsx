import PropTypes from "prop-types";
import React from "react";
import {Link} from "react-router-dom";

const MobileNavMenu = ({categories}: any) => {
    return (
        <nav className="offcanvas-navigation" id="offcanvas-navigation">
            <ul>
                <li className="menu-item-has-children">
                    <Link to={process.env.PUBLIC_URL + "/"}>{["home"]}</Link>
                    <ul className="sub-menu">
                        <li className="menu-item-has-children">
                            <Link to={process.env.PUBLIC_URL + "/"}>
                                {["home_group_one"]}
                            </Link>
                            <ul className="sub-menu">
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-fashion"}>
                                        {["home_fashion"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-fashion-two"}>
                                        {["home_fashion_two"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-fashion-three"}>
                                        {["home_fashion_three"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-fashion-four"}>
                                        {["home_fashion_four"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-fashion-five"}>
                                        {["home_fashion_five"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-fashion-six"}>
                                        {["home_fashion_six"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-fashion-seven"}>
                                        {["home_fashion_seven"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-fashion-eight"}>
                                        {["home_fashion_eight"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-kids-fashion"}>
                                        {["home_kids_fashion"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-cosmetics"}>
                                        {["home_cosmetics"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-furniture"}>
                                        {["home_furniture"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-furniture-two"}>
                                        {["home_furniture_two"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-furniture-three"}>
                                        {["home_furniture_three"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-furniture-four"}>
                                        {["home_furniture_four"]}
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="menu-item-has-children">
                            <Link to={process.env.PUBLIC_URL + "/"}>
                                {["home_group_two"]}
                            </Link>
                            <ul className="sub-menu">
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-furniture-five"}>
                                        {["home_furniture_five"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-furniture-six"}>
                                        {["home_furniture_six"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-furniture-seven"}>
                                        {["home_furniture_seven"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-electronics"}>
                                        {["home_electronics"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-electronics-two"}>
                                        {["home_electronics_two"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-electronics-three"}>
                                        {["home_electronics_three"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-book-store"}>
                                        {["home_book_store"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-book-store-two"}>
                                        {["home_book_store_two"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-plants"}>
                                        {["home_plants"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-flower-shop"}>
                                        {["home_flower_shop"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-flower-shop-two"}>
                                        {["home_flower_shop_two"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-organic-food"}>
                                        {["home_organic_food"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-organic-food-two"}>
                                        {["home_organic_food_two"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-onepage-scroll"}>
                                        {["home_onepage_scroll"]}
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="menu-item-has-children">
                            <Link to={process.env.PUBLIC_URL + "/"}>
                                {["home_group_three"]}
                            </Link>
                            <ul className="sub-menu">
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-grid-banner"}>
                                        {["home_grid_banner"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-auto-parts"}>
                                        {["home_auto_parts"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-cake-shop"}>
                                        {["home_cake_shop"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-handmade"}>
                                        {["home_handmade"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-pet-food"}>
                                        {["home_pet_food"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-medical-equipment"}>
                                        {["home_medical_equipment"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-christmas"}>
                                        {["home_christmas"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-black-friday"}>
                                        {["home_black_friday"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-black-friday-two"}>
                                        {["home_black_friday_two"]}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + "/home-valentines-day"}>
                                        {["home_valentines_day"]}
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link to={process.env.PUBLIC_URL + "/contact"}>
                        {["contact_us"]}
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

MobileNavMenu.propTypes = {
    categories: PropTypes.object
}

export default MobileNavMenu
