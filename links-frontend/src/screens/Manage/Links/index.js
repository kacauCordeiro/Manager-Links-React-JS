import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { linkList, setItemToRemove, linkRemove} from '../../../actions/LinkActions';
import Layout from '../../Layouts/Manage';

const Links = ({links, linkRemove, linkList, linkToRemove, setItemToRemove}) => {

    useEffect(() => {
        linkList();
    },[linkList])

    const cancelDelete = (e) => setItemToRemove(null);
    const confirmDelete = (e) => linkToRemove ? linkRemove(linkToRemove) : null;


    return (
        <Layout>
        <div className="row">
            <div className="col">
                <h1>Links </h1>
            </div>
            <div className="col text-rigth align-self-bottom pt-2">
                <Link to="/manage/links/create" className="btn btn-primary">Add</Link>
            </div>
        </div>

        {links && links.length 
        ? links.map((link) => {
            const deleteClick = (e) => setItemToRemove(link);

            const border = 
            linkToRemove && linkToRemove.id === link.id
            ? 'border border-danger rounded' 
            : 'border border-transparent';

            return (
            <div key={link.id} className={`pb-2 pt-2 p1-3 pr-3 d-flex flex-row justify-content-between ${border}`}>
                <div className="pr-3">
                    <img src="https://via.placeholder.com/100" alt="Link icon"/>
                </div>
            <div className="align-self-center">
                <span className="text-primary clearfix">{link.label}</span>
                <span className="text-primary clearfix">{link.url}</span>
            </div>
            <div className="ml-auto p-2 clear-fix">
                <Link to={`/manage/links/edit/${link.id}`}>
                    <span>Edit</span>
                </Link>
                <Link to="/manage/links/edit">   <span></span>
                </Link>
                <button className="btn btn-clear" onClick={deleteClick}>Delete</button>

            </div>
        </div>);
            }): 
            null}
        {linkToRemove ? (
            <div className="alert alert-danger rounded float-center shadow-bold">
            <h4 className="alert-heading">Delete Confirmation!</h4>
            <p>Are you sure you wants to delete, this action cannot be undone</p>
            <hr/>
            <div className="d-flex justify-content-between">
                <button className="btn btn-outile-light" onClick={cancelDelete}>cancel</button>
                <button className="btn btn-danger" onClick={confirmDelete}>delete</button>
            </div>
        </div>

        ): null}
        
        </Layout>
    );
    
};
const mapStateToProps = (state) => {
    return {
        links: state.link.links,
        linkToRemove: state.link.linkToRemove
    };
};

export default connect(mapStateToProps, {linkList, setItemToRemove, linkRemove})(Links);

