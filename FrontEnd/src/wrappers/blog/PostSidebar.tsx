import React from "react";
import {Link} from "react-router-dom";

const PostSidebar = ({setSearch}: any) => {
    return (
        <div className="sidebar-style">
            <div className="sidebar-widget">
                <h4 className="pro-sidebar-title">Tìm kiếm </h4>
                <div className="pro-sidebar-search mb-55 mt-25">
                    <form className="pro-sidebar-search-form" action="#">
                        <input type="text" placeholder="Tìm ở đây..."
                               onChange={(e: any) => setSearch(e.target.value)}/>
                        <button>
                            <i className="pe-7s-search"/>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostSidebar;
